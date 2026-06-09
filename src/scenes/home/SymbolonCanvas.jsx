import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// 流体光晕着色器(simplex 噪声 + fbm),源自 Head01.html
const fragmentShader = /* glsl */ `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;

  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,
                        0.366025403784439,
                       -0.577350269189626,
                        0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < 5; ++i) {
      v += a * snoise(x);
      x = rot * x * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = (vUv - 0.5) * 2.0;
    uv.x *= u_resolution.x / u_resolution.y;

    vec2 mouseOffset = (u_mouse - 0.5) * 0.5;

    float dist = length(vec2(uv.x - mouseOffset.x * 0.2, (uv.y - mouseOffset.y * 0.2) * 0.6));

    vec2 q = vec2(0.);
    q.x = fbm( uv + 0.00 * u_time);
    q.y = fbm( uv + vec2(1.0));

    vec2 r = vec2(0.);
    r.x = fbm( uv + 1.0*q + vec2(1.7,9.2)+ 0.15*u_time );
    r.y = fbm( uv + 1.0*q + vec2(8.3,2.8)+ 0.126*u_time);

    float f = fbm(uv + r);

    float core = smoothstep(0.8, 0.0, dist + f * 0.3);

    vec3 voidBlack = vec3(0.01, 0.01, 0.01);
    vec3 haloOrange = vec3(0.85, 0.42, 0.15);
    vec3 coreWhite = vec3(1.0, 0.97, 0.88);

    vec3 color = mix(voidBlack, haloOrange, smoothstep(0.1, 0.6, core));
    color = mix(color, coreWhite, smoothstep(0.5, 0.9, core));

    color += haloOrange * f * 0.1 * smoothstep(1.0, 0.2, dist);

    gl_FragColor = vec4(color, 1.0);
  }
`

/**
 * SYMBOLON 流体光晕 WebGL 背景(Three.js)。
 * 尺寸/坐标按容器(而非整窗)计算,以适配主区布局。
 * @param coordsRef 指向坐标显示元素的 ref,鼠标移动时直接更新其文本(避免 React 重渲)
 */
export default function SymbolonCanvas({ coordsRef }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false })

    const getSize = () => {
      const rect = container.getBoundingClientRect()
      return { w: Math.max(1, rect.width), h: Math.max(1, rect.height) }
    }

    let { w, h } = getSize()
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const geometry = new THREE.PlaneGeometry(2, 2)
    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(w, h) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    }
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const mouseTarget = new THREE.Vector2(0.5, 0.5)

    const onResize = () => {
      const s = getSize()
      w = s.w
      h = s.h
      renderer.setSize(w, h)
      uniforms.u_resolution.value.set(w, h)
      renderer.render(scene, camera)
    }
    window.addEventListener('resize', onResize)

    const onMouse = (e) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = 1 - (e.clientY - rect.top) / rect.height
      mouseTarget.set(x, y)
      if (coordsRef?.current) {
        coordsRef.current.textContent = `TRGT: ${x.toFixed(3)}, ${y.toFixed(3)}`
      }
    }
    window.addEventListener('mousemove', onMouse)

    let raf
    const start = performance.now()

    if (prefersReducedMotion) {
      renderer.render(scene, camera) // 静态一帧,不进动画循环
    } else {
      const animate = () => {
        raf = requestAnimationFrame(animate)
        uniforms.u_time.value = (performance.now() - start) / 1000
        uniforms.u_mouse.value.lerp(mouseTarget, 0.05)
        renderer.render(scene, camera)
      }
      animate()
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouse)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [coordsRef])

  return <div className="symbolon__canvas" ref={mountRef} aria-hidden="true" />
}
