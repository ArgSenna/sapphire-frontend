import { FileText, Download, Share2 } from 'lucide-react'

const reports = [
    {
        id: 1,
        title: 'AI驱动的投研体系设计与优化白皮书',
        date: '2024-02-10',
        type: 'PDF',
        size: '4.2 MB'
    },
    {
        id: 2,
        title: '2024年Q1半导体行业深度分析',
        date: '2024-02-08',
        type: 'DOCX',
        size: '2.8 MB'
    },
    {
        id: 3,
        title: '新能源汽车产业链图谱',
        date: '2024-02-05',
        type: 'PDF',
        size: '15.6 MB'
    }
]

export default function ResearchReportsPage() {
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-4 py-3">
                <h2 className="font-bold text-lg text-slate-900">投研报告</h2>
            </div>

            <div className="p-4 space-y-3">
                {reports.map(report => (
                    <div key={report.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="flex-none h-10 w-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
                                <FileText className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-medium text-slate-900 truncate pr-2">{report.title}</h3>
                                <p className="text-xs text-slate-400 mt-0.5">{report.date} · {report.type} · {report.size}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button className="p-2 text-slate-400 hover:text-slate-600">
                                <Share2 className="h-5 w-5" />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-slate-600">
                                <Download className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
