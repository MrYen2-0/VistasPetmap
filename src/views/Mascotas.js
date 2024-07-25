import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Mascotas.css";
import { Link } from "react-router-dom";

export const Mascotas = () => {

  const navigate = useNavigate();

  const goBack = () => {
    navigate('/inicio');
  };

  return (
    <div className="temp-screen">
      <div className="div">
        <div className="overlap">
          <div className="rectangle" />
          <div className="text-wrapper">PetMaps</div>
          <img className="vector" alt="Vector" src="vector.png" />
        </div>
        <Link to="/agregarmas">
          <img className="group" alt="Group" src="Group 6.png" />
        </Link>        <div className="frame">
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
        <img className="vector-3" alt="Vector" src="Vector.png" />
        <div className="text-wrapper-4">Todas mis mascotas</div>
        <div className="arrows" onClick={goBack}>
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
