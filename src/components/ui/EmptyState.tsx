export default function EmptyState({ message = '暂无数据', icon = '📭' }: { message?: string; icon?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-400">
      <span className="text-4xl grayscale opacity-80">{icon}</span>
      <p className="mt-3 text-sm font-medium">{message}</p>
    </div>
  )
}
