import { cn } from '@/utils'

import type { Rating } from '@/api/types'

const ratingConfig: Record<Rating, { label: string; color: string }> = {
  strongBuy: { label: '强烈推荐', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  buy: { label: '推荐', color: 'bg-orange-400/20 text-orange-400 border-orange-400/30' },
  neutral: { label: '中性', color: 'bg-slate-400/20 text-slate-400 border-slate-400/30' },
  reduce: { label: '减持', color: 'bg-teal-400/20 text-teal-400 border-teal-400/30' },
  sell: { label: '卖出', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
}

export default function RatingBadge({ rating, size = 'sm' }: { rating: Rating; size?: 'sm' | 'lg' }) {
  const config = ratingConfig[rating]
  return (
    <span className={cn(
      'inline-flex items-center rounded-full border font-medium',
      config.color,
      size === 'lg' ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-xs',
    )}>
      {config.label}
    </span>
  )
}
