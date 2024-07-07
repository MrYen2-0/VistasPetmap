import React from 'react';
import { Link } from 'react-router-dom';
import "../assets/styles/InicioSesion.css";

const Home = () => {
  return (
    <div className="lights-screen">
      <div className="overlap">
      <div className="text-wrapper">Inicio de sesión</div>
        <div className="rectangle" />
      </div>
      <div className="frame">
        <div className="text-wrapper-2">BIENVENIDO A PETMAP</div>
      </div>
      <div className="content">
        <div className="form">
          <div className="text-wrapper-3">Gmail</div>
          <input type="text" className="rectangle-2" />
          <div className="text-wrapper-4">Contraseña</div>
          <input type="password" className="rectangle-3" />
          <div className="text-wrapper-5">
          Olvidaste tu contraseñá? <Link to="/restaurar" className="register-link">Aqui</Link>
          </div>
          <div className="text-wrapper-5">
            No tienes cuenta? <Link to="/register" className="register-link">Regístrate</Link>
          </div>
          <button className="button">Entrar</button>
        </div>
        <img className="img" alt="Img" src="IconoP.png" />
      </div>
    </div>
  );
};

export default Home;
