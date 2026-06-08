import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer__line hazard" aria-hidden="true" />
      <div className="footer__row">
        <span className="mono">© {year} TOOLNET</span>
        <span className="mono footer__mid">// 个人工具导航 · 持续收录中</span>
        <a className="mono footer__gh" href="https://github.com/Exusiai9/ToolNet" target="_blank" rel="noreferrer">
          GITHUB ↗
        </a>
      </div>
    </footer>
  )
}
