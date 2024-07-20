import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Register from './views/Registro';
import Restaurar from './views/Restaurar';
import Inicio from './views/Inicio';
import Mascotas from './views/Mascotas';

import './assets/styles/App.css';

function App() {

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('token');
    }

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  },[]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restaurar" element={<Restaurar />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/mascotas" element={<Mascotas />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
