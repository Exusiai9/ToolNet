import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import './ScenePlaceholder.css'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * 占位场景 —— 阶段一用来撑起尚未实现的扇区,保证导航完整可跑通。
 * 后续每个扇区会用各自的真实内容替换掉它。
 * @param code   扇区技术缩写(如 HUB / LNK)
 * @param name   大标题(中文)
 * @param title  副标题(英文/说明)
 * @param desc   补充描述
 * @param status 状态行文案
 */
export default function ScenePlaceholder({
  code,
  name,
  title,
  desc,
  status = 'DATA INCOMING // 建设中',
}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion) return
      gsap.from('.scene-ph__frame > *', {
        opacity: 0,
        y: 18,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power3.out',
      })
    },
    { scope: ref },
  )

  return (
    <section className="scene-ph" ref={ref}>
      <div className="scene-ph__frame cut-corner">
        <span className="scene-ph__code mono">// {code}_SECTOR</span>
        <h1 className="scene-ph__title">{name}</h1>
        {title && <p className="scene-ph__subtitle mono">{title}</p>}
        <div className="scene-ph__bar hazard" />
        <p className="scene-ph__status mono">
          <span className="dot dot--live" /> {status}
        </p>
        {desc && <p className="scene-ph__desc">{desc}</p>}
      </div>
    </section>
  )
}
