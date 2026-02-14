import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { AppLayout } from '@/components/layout'
import HomePage from '@/pages/Home'
import ChatPage from '@/pages/Chat'

import DailyAnalysisPage from '@/pages/Features/DailyAnalysis'
import ResearchReportsPage from '@/pages/Features/ResearchReports'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/features/daily-analysis" element={<DailyAnalysisPage />} />
          <Route path="/features/knowledge" element={<ResearchReportsPage />} /> {/* Mapping knowledge to reports for now, or create separate if strict */}
          {/* Other feature routes... */}
        </Route>

        {/* Chat Routes (Full Screen, outside AppLayout) */}
        <Route path="/chat/new" element={<ChatPage />} />
        <Route path="/chat/:id" element={<ChatPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
