import React from "react";
import "../assets/styles/AgregarM.css";

export const Agregarmas = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="agregar-m">
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
            <input className="rectangle-2 input-text" type="text" placeholder="Nombre" />
          </div>
        </div>
        <div className="especificaciones">
          <div className="group">
            <div className="overlap-group-2">
              <div className="text-wrapper-4">Fecha de nacimiento:</div>
              <input className="rectangle-3 input-text" type="text" placeholder="Fecha de nacimiento" />
            </div>
          </div>
          <div className="div-wrapper">
            <button className="button">Agregar</button>
          </div>
          <div className="overlap-wrapper">
            <div className="overlap-group-2">
              <div className="text-wrapper-6">Peso:</div>
              <input className="rectangle-3 input-text" type="text" placeholder="Peso:" />
            </div>
          </div>
          <div className="overlap-group-wrapper">
            <div className="overlap-group-2">
              <div className="text-wrapper-7">Tamaño:</div>
              <input className="rectangle-3 input-text" type="text" placeholder="Tamaño:" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agregarmas;
