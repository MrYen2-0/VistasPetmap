import React from "react";
import "../assets/styles/Mascotas.css";

export const Mascotas = () => {
  return (
    <div className="temp-screen">
      <div className="div">
        <div className="overlap">
          <div className="rectangle" />
          <div className="text-wrapper">PetMaps</div>
          <img className="vector" alt="Vector" src="vector.png" />
          <img className="img" alt="Vector" src="vector.png" />
        </div>
        <img className="group" alt="Group" src="Group 6.png" />
        <div className="frame">
          <div className="text-wrapper-2">1 año</div>
          <div className="text-wrapper-3">Kirby</div>
        </div>
        <div className="frame-2">
          <div className="text-wrapper-2">3 año</div>
          <div className="text-wrapper-3">Kisha</div>
        </div>
        <img className="vector-2" alt="Vector" src="Vector.png" />
        <div className="frame-3">
          <div className="text-wrapper-2">2 año</div>
          <div className="text-wrapper-3">Kirara</div>
        </div>
        <div className="text-wrapper-4">Todas mis mascotas</div>
        <div className="arrows">
          <div className="overlap-group">
            <img className="line" alt="Line" src="line 1.png" />
            <img className="line-2" alt="Line" src="line 2.png" />
            <img className="line-3" alt="Line" src="line 1.png" />
            <img className="line-4" alt="Line" src="line 2.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mascotas;
