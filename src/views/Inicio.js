import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Inicio.css";
import { MascotaContainer } from "../components/MascotaContainer";

export const Inicio = () => {

  const navigate = useNavigate();
  const [mascotas, setMascotas] = useState([]);
  const [selectedMascota, setSelectedMascota] = useState({ edad: -1, nombre: '' });

  useEffect(() => {
    if(!sessionStorage.getItem('token')){
      navigate('/');
    }
    setMascotas((prev) => [...prev, ...[
      { edad: 3, nombre: "Kisha" },
      { edad: 5, nombre: "pablo" }
    ]]);
  }, []);
  
  useEffect(() => {
    setSelectedMascota(mascotas[0] ?? { edad: -1, nombre: '' });
  },[mascotas]);

  return (
    <div className="macbook-pro">
          <div className="overlap">
            <div className="rectangle" />
            <div className="text-wrapper">PetMaps</div>
          </div>
          <div className="div">PetsGPS</div>
          <img className="thread" alt="Thread" src="mapa.png" />
          <div className="text-wrapper-2">Todas mis mascotas</div>
          <Link to="/mascotas">
            <img className="arrow" alt="Arrow" src="Arrow 2.png" />
          </Link>          <div className="parent-container">
          <div className="frame">
            <div className="frame-wrapper">
              <MascotaContainer edad={selectedMascota.edad} nombre={selectedMascota.nombre} />
            </div>
            <div className="text-wrapper-5">Mis mascotas</div>
            <div className="div-wrapper">
            {mascotas.map((mascota, index) => (
                <MascotaContainer edad={mascota.edad} nombre={mascota.nombre} />
              ))}
            </div>
            <div className="livescreen-overflow">
              <img className="vector" alt="Vector" src="temp.png" />
              <div className="ellipse" />
              <div className="text-wrapper-6">23</div>
              <div className="text-wrapper-7">°C</div>
            <div className="text-wrapper-8">Temperatura de *nombre*</div>
          </div>
          </div>
          </div>
      </div>
  );
};

export default Inicio;
