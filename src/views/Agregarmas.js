import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/AgregarM.css";
import Blurrer from "../utils/blurrer";
import Swal from "sweetalert2";
import axios from "axios";

export const Agregarmas = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [peso, setPeso] = useState('');
  const [tamaño, setTamaño] = useState('');

  const goBack = () => {
    navigate('/mascotas');
  };

  useEffect(() => {
    const authToken = sessionStorage.getItem('token');
    if (!authToken) {
      navigate('/');
    }
  }, []);
  

  const checkExistingFields = (fields) => {
    for (let field of fields) {
      if (!field || field.length === 0) {
        return false;
      }
    }
    return true;
  }

  const handleSaveDog = async() => {
    if (!checkExistingFields([nombre, fechaNacimiento, peso, tamaño])) {
      Blurrer.blur(mainNode);
      Swal.fire({
        title: 'Error',
        icon: 'warning',
        text: 'favor de llenar todos los campos correctamente'
      }).then(() => Blurrer.unBlur(mainNode));
      return;
    }
    const authToken = sessionStorage.getItem('token');
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/perros`, {
      nombre, fechaNacimiento, peso, tamaño
    }, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': authToken
      }
    }).catch((error) => {
      Blurrer.blur(mainNode);
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: error.message
      }).then(() => Blurrer.unBlur(mainNode));
      return error.response || {};
    });

    if (response.status === 401) {
      sessionStorage.removeItem('token');
      navigate('/');
    }

    if ((!response || !response.data) || !response.data.success) {
      Blurrer.blur(mainNode);
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'el servidor no ha podido guardar el nuevo perro'
      }).then(() => Blurrer.unBlur(mainNode));
      return;
    }
    Blurrer.blur(mainNode);
    Swal.fire({
      title: 'Todo listo',
      icon: 'success',
      text: response.data.message
    }).then(() => Blurrer.unBlur(mainNode));
  }

  const setCleanNombre = (value) => {
    if (!value) {
      setNombre('');
      return;
    }
    value = value.replace(/[^a-zA-Z\s]/g, '');
    setNombre(value);
  }

  const mainNode = useRef(null);

  return (
    <div className="agregar-m" ref={mainNode}>
      <div className="div">
        <div className="overlap">
          <div className="rectangle" />
          <div className="text-wrapper">PetMaps</div>
        </div>
        <div className="arrows" onClick={goBack}>
          <div className="overlap-group">
            <img className="lines" alt="Lines" src="line 1.png" />
            <img className="lines-2" alt="Lines" src="line 2.png" />
            <img className="lines-3" alt="Lines" src="line 1.png" />
            <img className="lines-4" alt="Lines" src="line 2.png" />
          </div>
        </div>
        <div className="agregar">
          <div className="text-wrapper-2">Agregar mascota</div>
          <div className="overlap-2">
            <div className="text-wrapper-3">Nombre:</div>
            <input className="rectangle-2 input-text" type="text" placeholder="Nombre"
            onChange={(e) => setCleanNombre(e.target.value)} value={nombre}/>
          </div>
        </div>
        <div className="especificaciones">
          <div className="group">
            <div className="overlap-group-2">
              <div className="text-wrapper-4">Fecha de nacimiento:</div>
              <input className="rectangle-3 input-text" type="text" placeholder="Fecha de nacimiento"
              onChange={(e) => setFechaNacimiento(e.target.value)} />
            </div>
          </div>
          <div className="div-wrapper">
            <button className="button" onClick={handleSaveDog}>Agregar</button>
          </div>
          <div className="overlap-wrapper">
            <div className="overlap-group-2">
              <div className="text-wrapper-6">Peso:</div>
              <input className="rectangle-3 input-text" type="number" placeholder="Peso:"
              onChange={(e) => setPeso(e.target.value)} /><p>kg</p>
            </div>
          </div>
          <div className="overlap-group-wrapper">
            <div className="overlap-group-2">
              <div className="text-wrapper-7">Tamaño:</div>
              <input className="rectangle-3 input-text" type="number" placeholder="Tamaño:"
              onChange={(e) => setTamaño(e.target.value)} /><p>m</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agregarmas;
