import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/Login'
import RegistrationPage from './pages/Registration'
import FeedPage from './pages/Feed'
export const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/feed" element={<FeedPage />} />
      {/* Catch all route - redirect to feed or login */}
      <Route path="*" element={<Navigate to="/feed" replace />} />
    </Routes>
  )
}

export default App
