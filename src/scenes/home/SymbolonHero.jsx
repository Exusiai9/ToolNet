import { lazy, Suspense, useRef } from 'react'
import './symbolon.css'

// three.js 较重且仅主页用到 → 拆成独立 chunk,首屏 UI 先渲染,着色器异步载入
const SymbolonCanvas = lazy(() => import('./SymbolonCanvas'))

/**
 * 主页第 0 屏 —— SYMBOLON 展示首屏(源自 Head01.html)。
 * 字体已统一为站点字体(衬线→var(--font-display)、等宽→var(--font-mono)),
 * 颜色保留 SYMBOLON 暖金/黑;去掉原 spine(由站点 SceneRail 充当左栏)。
 * 文案沿用原稿,后续可改。
 * @param onScrollDown 点击底部 SCROLL 时回调(滚动到下一屏)
 */
export default function SymbolonHero({ onScrollDown }) {
  const coordsRef = useRef(null)

  return (
    <div className="symbolon">
      <Suspense fallback={null}>
        <SymbolonCanvas coordsRef={coordsRef} />
      </Suspense>

      <div className="symbolon__ui">
        {/* 中央舞台 */}
        <main className="symbolon__stage">
          <div className="symbolon__topmeta" data-anim>
            <nav className="symbolon__nav">
              <span className="symbolon__navlink">Idx. Archive</span>
              <span className="symbolon__navlink">Methodology</span>
              <span className="symbolon__navlink">Transmit</span>
            </nav>
            <div className="symbolon__coords mono" ref={coordsRef}>
              TRGT: 0.000, 0.000
            </div>
          </div>

          <div className="symbolon__titlegroup">
            <h1 className="symbolon__title" data-anim>
              Symbolon
            </h1>
            <div className="symbolon__subtitle" data-anim>
              The Advantage of Mystery in Semiotic Design
            </div>
          </div>

          <button className="symbolon__scroll" onClick={onScrollDown} aria-label="向下滚动">
            <span className="mono">SCROLL</span>
            <span className="symbolon__chev" />
          </button>
        </main>

        {/* 右侧数据面板 */}
        <aside className="symbolon__data" data-anim>
          <div>
            <div className="symbolon__block">
              <div className="symbolon__label">System Status</div>
              <div className="symbolon__value">
                OBSCURATION: ACTIVE
                <br />
                REVELATION: PENDING INTERACTION
                <br />
                FRAMEWORK: PEIRCEAN TRIAD
              </div>
            </div>

            <div className="symbolon__block">
              <div className="symbolon__label">Methodology</div>
              <div className="symbolon__value" style={{ marginBottom: '16px' }}>
                A brand is not a logo; it is a sign functioning within an interpretive structure.
                We architect meaning by controlling the threshold between the known and the
                obscured.
              </div>

              <div className="symbolon__semiotic">
                <div className="symbolon__item">
                  <div className="symbolon__item-title">Icon</div>
                  <div className="symbolon__item-desc">
                    The signifier that physically resembles the signified. Form, topology, visual
                    mimicry.
                  </div>
                </div>
                <div className="symbolon__item">
                  <div className="symbolon__item-title">Index</div>
                  <div className="symbolon__item-desc">
                    The signifier inherently connected to the signified. Evidence, trace,
                    implication of action.
                  </div>
                </div>
                <div className="symbolon__item">
                  <div className="symbolon__item-title">Symbol</div>
                  <div className="symbolon__item-desc">
                    The signifier related to the signified by convention alone. Cultivated meaning,
                    learned association.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="symbolon__block symbolon__block--last">
            <div className="symbolon__label">Operative</div>
            <div className="symbolon__value symbolon__value--bright">Awaiting Input Sequence</div>
          </div>
        </aside>
      </div>
    </div>
  )
}
