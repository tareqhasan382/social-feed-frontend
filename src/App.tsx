import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/Login'
import RegistrationPage from './pages/Registration'
import FeedPage from './pages/Feed'
import ProtectedRoute from './components/Auth/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/feed" element={
        <ProtectedRoute>
          <FeedPage />
        </ProtectedRoute>
      } />
      {/* Catch all route - redirect to feed or login */}
      <Route path="*" element={<Navigate to="/feed" replace />} />
    </Routes>
  )
}

export default App
