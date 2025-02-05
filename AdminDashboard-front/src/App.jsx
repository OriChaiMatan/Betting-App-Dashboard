import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import {LoginPage} from './pages/LoginPage.jsx'
import { DashboardInsex } from './pages/DashboardInsex.jsx'

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardInsex />} />
      </Routes>
    </Router>
  );
}
