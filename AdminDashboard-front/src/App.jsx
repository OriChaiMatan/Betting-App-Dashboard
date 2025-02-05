import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import {LoginPage} from './pages/LoginPage.jsx';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
