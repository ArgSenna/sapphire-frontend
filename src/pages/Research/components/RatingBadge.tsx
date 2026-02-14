import { cn } from '@/utils'

import type { Rating } from '@/api/types'

const ratingConfig: Record<Rating, { label: string; color: string }> = {
  strongBuy: { label: '强烈推荐', color: 'bg-red-50 white text-red-600 border border-red-100' },
  buy: { label: '推荐', color: 'bg-orange-50 text-orange-600 border border-orange-100' },
  neutral: { label: '中性', color: 'bg-slate-100 text-slate-600 border border-slate-200' },
  reduce: { label: '减持', color: 'bg-teal-50 text-teal-600 border border-teal-100' },
  sell: { label: '卖出', color: 'bg-green-50 text-green-600 border border-green-100' },
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
