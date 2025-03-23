import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Goals from './components/Goals';  // Componente de visualização de goals

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Página de login */}
        <Route path="/goals" element={<Goals />} /> {/* Página de Goals */}
      </Routes>
    </Router>
  );
};

export default App;
