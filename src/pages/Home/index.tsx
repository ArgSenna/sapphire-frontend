import { useNavigate } from 'react-router-dom'

const quickLinks = [
  {
    to: '/portfolio',
    label: '投资组合',
    desc: '管理和监控你的投资组合',
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  },
  {
    to: '/research',
    label: '标的研究',
    desc: '深度研究投资标的',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center px-2 pt-8 sm:pt-16">
      {/* Logo & 欢迎语 */}
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/20 sm:h-16 sm:w-16">
        <svg className="h-8 w-8 text-amber-400 sm:h-9 sm:w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h1 className="mt-5 text-xl font-semibold text-slate-100 sm:text-2xl">欢迎使用 Sapphire</h1>
      <p className="mt-2 text-center text-sm text-slate-400">AI 赋能投资决策，让每一笔投资更有洞察</p>

      {/* 快捷入口 */}
      <div className="mt-8 grid w-full max-w-md gap-3 sm:mt-10 sm:gap-4">
        {quickLinks.map(link => (
          <button
            key={link.to}
            onClick={() => navigate(link.to)}
            className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-left transition-colors hover:border-slate-700 active:bg-slate-900/80"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-800">
              <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-100">{link.label}</div>
              <div className="mt-0.5 text-xs text-slate-500">{link.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
