import { cn } from '@/utils'

import type { SignalColor } from '@/api/types'

const colorMap: Record<SignalColor, { bg: string; ring: string; pulse: string }> = {
  green: { bg: 'bg-green-500', ring: 'ring-green-500/30', pulse: 'bg-green-400' },
  red: { bg: 'bg-red-500', ring: 'ring-red-500/30', pulse: 'bg-red-400' },
  yellow: { bg: 'bg-yellow-500', ring: 'ring-yellow-500/30', pulse: 'bg-yellow-400' },
}

export default function SignalLight({ color, size = 'md' }: { color: SignalColor; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'h-2.5 w-2.5', md: 'h-3.5 w-3.5', lg: 'h-5 w-5' }
  const c = colorMap[color]

  return (
    <span className={cn('relative inline-flex', sizes[size])}>
      <span className={cn('absolute inline-flex h-full w-full animate-ping rounded-full opacity-40', c.pulse)} />
      <span className={cn('relative inline-flex h-full w-full rounded-full ring-2', c.bg, c.ring)} />
    </span>
  )
}
