import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../assets/styles/Registro.css";
import Blurrer from '../utils/blurrer';
import { Checker } from '../utils/stuff';
import Swal from 'sweetalert2';
import axios from 'axios';

const Register = () => {

  const navigate = useNavigate();

  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!Checker.checkStrings([gmail, password, confirmPassword])) {
      Blurrer.blur(mainNode);
      Swal.fire({
        title: 'ERROR',
        text: 'favor de rellenar todos los campos antes de continuar',
        icon: 'warning'
      }).then(() => Blurrer.unBlur(mainNode));
      return;
    }

    let errorMessage = '';

    if (!Checker.checkGmail(gmail)) {
      errorMessage += 'El gmail tiene un formato invalido, favor de revisarlo.'
    }
    if (password !== confirmPassword) {
      errorMessage += errorMessage.length === 0 ? 'Las contraseñas no coinciden.' : ' Las contraseñas no coinciden';
    }

    if (errorMessage.length > 0) {
      Blurrer.blur(mainNode);
      Swal.fire({
        title: 'ERROR',
        text: errorMessage,
        icon: 'warning'
      }).then(() => Blurrer.unBlur(mainNode));
      return;
    } else {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/usuarios/register`, { gmail, password }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      if (!response || !response.data.success) {
        Blurrer.blur(mainNode);
        Swal.fire({
          title: 'ERROR',
          text: 'no se ha encontrado al usuario especificado.',
          icon: 'info'
        }).then(() => Blurrer.unBlur(mainNode));
        return;
        }
        Blurrer.blur(mainNode);
        Swal.fire({
          title: 'Registrado',
          icon: 'success'
        }).then(() => {
          Blurrer.unBlur(mainNode);
          navigate('/');
        });
        
      } catch (error) {
        Blurrer.blur(mainNode);
        Swal.fire({
          title: 'ERROR',
          text: 'ha ocurrido un error inesperado en el servidor.',
          icon: 'error'
        }).then(() => Blurrer.unBlur(mainNode));
        if (error.response) {
          // El servidor respondió con un código de estado diferente de 2xx
          console.log('Datos del error:', error.response.data);
          console.log('Estado del error:', error.response.status);
          console.log('Cabeceras del error:', error.response.headers);
        } else if (error.request) {
          // La solicitud fue hecha pero no se recibió respuesta
          console.log('Solicitud del error:', error.request);
        } else {
          // Algo pasó al configurar la solicitud que desencadenó un error
          console.log('Mensaje del error:', error.message);
        }
        console.log('Configuración del error:', error.config);
      }
    }
  }

  const mainNode = useRef(null);

  return (
    <div className="lights-screen" ref={mainNode}>
    <div className="text-wrapper">Registro</div>
      <div className="overlap">
        <div className="rectangle" />
      </div>
      <div className="frame">   
        <div className="text-wrapper-2">BIENVENIDO A PETMAP</div>
      </div>
      <div className="content">
        <div className="form">
          <div className="text-wrapper-3">Registre su Gmail</div>
          <input type="text" className="rectangle-2" onChange={(e) => setGmail(e.target.value)}/>
          <div className="text-wrapper-4">Contraseña</div>
          <input type="password" className="rectangle-3" onChange={(e) => setPassword(e.target.value)}/>
          <div className="text-wrapper-6">Repite la contraseñá</div>
          <input type="password" className="rectangle-4" onChange={(e) => setConfirmPassword(e.target.value)}/>
          <div className="text-wrapper-5">
            Ya tienes cuenta? <Link to="/" className="register-link">Inicia Sesion</Link>
          </div>
          <button className="button" onClick={handleRegister}>Entrar</button>
        </div>
        <img className="img" alt="Img" src="IconoP.png" />
      </div>
    </div>
  );
};

export default Register;
