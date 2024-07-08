import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Register from './views/Registro';
import Restaurar from './views/Restaurar';
import Inicio from './views/Inicio';


import './assets/styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restaurar" element={<Restaurar />} />
          <Route path="/inicio" element={<Inicio />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
