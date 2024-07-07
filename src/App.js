import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Register from './views/Registro';
import Restaurar from './views/Restaurar';


import './assets/styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restaurar" element={<Restaurar />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
