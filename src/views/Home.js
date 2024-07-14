import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../assets/styles/InicioSesion.css";
import Swal from 'sweetalert2';
import Blurrer from "../utils/blurrer";
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async() => {
    if ((!gmail || gmail === null) || !(password || password === null)) {
      Blurrer.blur(mainNode);
      Swal.fire({
        title: 'Error',
        allowEscapeKey: true,
        allowOutsideClick: true,
        text: 'favor de rellenar todos los campos antes de continuar',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      }).then(() => Blurrer.unBlur(mainNode));
      return;
    }
    const response = await axios({
      url: `${process.env.REACT_APP_API_URL}/usuarios/login`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: { gmail, password }
    });
    if (response && response.data.success) {
      navigate('/inicio');
    } else {
      Swal.fire({
        title: 'USUARIO NO ENCONTRADO',
        icon: 'info'
      });
    }
  };

  const mainNode = useRef(null);

  return (
    <div className="lights-screen" ref={mainNode}>
      <div className="overlap">
        <div className="rectangle" />
        <div className="text-wrapper">Inicio de sesión</div>
      </div>
      <div className="frame">
        <div className="text-wrapper-2">BIENVENIDO A PETMAP</div>
      </div>
      <div className="content">
        <div className="form">
          <div className="text-wrapper-3">Gmail</div>
          <input type="text" className="rectangle-2" onChange={(e) => setGmail(e.target.value)} />
          <div className="text-wrapper-4">Contraseña</div>
          <input type="password" className="rectangle-3" onChange={(e) => setPassword(e.target.value)} />
          <div className="text-wrapper-5">Olvidaste tu contraseñá?</div>
          <button className="button" onClick={handleLogin}>Entrar</button>
          <div className="text-wrapper-5">
            No tienes cuenta? <Link to="/register" className="register-link">Regístrate</Link>
          </div>
        </div>
        <img className="img" alt="Img" src="IconoP.png" />
      </div>
    </div>
  );
};

export default Home;
