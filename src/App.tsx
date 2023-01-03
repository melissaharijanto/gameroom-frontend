import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LandingPage />}/>
        <Route path="login" element={<LoginPage />}/>
        <Route path="signup" element={<SignUpPage />}/>
        <Route path="dashboard" element={<DashboardPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
