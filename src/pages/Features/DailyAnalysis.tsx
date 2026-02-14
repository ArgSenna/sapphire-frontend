import { FileText, Clock, ExternalLink } from 'lucide-react'

const analysisTasks = [
    {
        id: 1,
        title: '贵州茅台(600519)每日分析报告',
        time: '10:21',
        status: 'completed',
        summary: '最新价格: 1504.33 元/股 | 涨跌幅: +0.00% | 成交额: 4654.73亿元',
        detail: '当日股价平盘，成交量309.28万手，换手率较低，市场交投相对平淡。从技术面看，股价在1496.00-1514.00元区间震荡。'
    },
    {
        id: 2,
        title: '宏观市场早报',
        time: '08:30',
        status: 'completed',
        summary: '上证指数微跌，科技股回调',
        detail: '受隔夜美股影响，今日A股开盘低开...'
    }
]

export default function DailyAnalysisPage() {
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
                <h2 className="font-bold text-lg text-slate-900">每日分析</h2>
                <button className="text-sm text-amber-600 font-medium">管理任务</button>
            </div>

            {/* List */}
            <div className="p-4 space-y-4">
                {analysisTasks.map(task => (
                    <div key={task.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 leading-snug">{task.title}</h3>
                                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                                        <Clock className="h-3 w-3" />
                                        <span>今天 {task.time}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-600 leading-relaxed mb-3">
                            <p className="font-medium text-slate-900 mb-1">{task.summary}</p>
                            <p className="line-clamp-2">{task.detail}</p>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                            <div className="flex gap-2">
                                <span className="px-2 py-0.5 rounded text-[10px] bg-green-50 text-green-600 border border-green-100">已生成</span>
                                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-500 border border-slate-200">Markdown</span>
                            </div>
                            <button className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-900">
                                查看详情 <ExternalLink className="h-3 w-3" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
