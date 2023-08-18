import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import LoginCard from './components/LoginCard';
import AIChatInterface from './components/AIChatInterface';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/chat" element={<AIChatInterface />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
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
