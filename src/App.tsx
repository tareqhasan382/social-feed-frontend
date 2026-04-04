import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Feed from './pages/Feed';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/" element={<Navigate to="/feed" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
