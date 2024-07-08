import React from "react";
import "../assets/styles/Inicio.css";

export const Inicio = () => {
  return (
    <div className="macbook-pro">
          <div className="overlap">
            <div className="rectangle" />
            <div className="text-wrapper">PetMaps</div>
          </div>
          <div className="div">PetsGPS</div>
          <img className="thread" alt="Thread" src="mapa.png" />
          <div className="text-wrapper-2">Todas mis mascotas</div>
          <img className="arrow" alt="Arrow" src="Arrow 2.png" />
          <div className="parent-container">
          <div className="frame">
            <div className="frame-wrapper">
              <div className="frame-2">
                <div className="text-wrapper-3">3 años</div>
                <div className="text-wrapper-4">Kisha</div>
              </div>
            </div>
            <div className="text-wrapper-5">Mis mascotas</div>
            <div className="div-wrapper">
              <div className="frame-2">
                <div className="text-wrapper-3">3 años</div>
                <div className="text-wrapper-4">Kirby</div>
              </div>
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
