import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (Math.abs(num) >= 1e8) return (num / 1e8).toFixed(2) + '亿'
  if (Math.abs(num) >= 1e4) return (num / 1e4).toFixed(2) + '万'
  return num.toLocaleString('zh-CN')
}

export function formatPercent(value: number): string {
  const sign = value > 0 ? '+' : ''
  return sign + value.toFixed(2) + '%'
}

export function formatPrice(price: number): string {
  return price.toFixed(2)
}

export function getChangeColor(value: number): string {
  if (value > 0) return 'text-red-400'
  if (value < 0) return 'text-green-400'
  return 'text-slate-400'
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function randomId(): string {
  return Math.random().toString(36).slice(2, 10)
}
