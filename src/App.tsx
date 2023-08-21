import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import LoginCard from './components/LoginCard';
import AIChatInterface from './components/AIChatInterface';
import { ThemeProvider } from './components/ThemeContext';
import './App.css'
const App: React.FC = () => {
  return (
    <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/chat" element={<AIChatInterface />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/chat');
  };

  return <LoginCard onSignIn={handleSignIn} />;
}

export default App;
