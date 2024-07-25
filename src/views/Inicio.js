import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/Inicio.css";
import { MascotaContainer } from "../components/MascotaContainer";
import LeafletMap from "../components/MapsUbicacion";
import axios from "axios";

export const Inicio = () => {
  const navigate = useNavigate();
  const [mascotas, setMascotas] = useState([]);
  const [selectedMascota, setSelectedMascota] = useState({
    edad: -1,
    nombre: "",
  });

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/");
    }
    async function fetchMascotas() {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/perros/map`, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': sessionStorage.getItem('token')
        }
      });
      if (response && response.data) {
        const data = response.data.data;
        setMascotas(data);
      }
    }
    fetchMascotas();
  }, []);

  useEffect(() => {
    setSelectedMascota(mascotas[0] ?? { edad: -1, nombre: "" });
  }, [mascotas]);

  function gotToInfoPage(idPerro, nombrePerro) {
    navigate(`/VerDatosPerro?idPerro=${idPerro}&nombrePerro=${nombrePerro}`);
  }

  const [ws, setWS] = useState(null);
    const [temperatura, setTemperatura] = useState(Number());
    const [ritmoCardiaco, setRitmoCardiaco] = useState(Number());
    //para poner una fecha en español: Date().toLocaleDateString() con las opciones: "es-ES" y un json con las opciones
    const [fechaDeRegistro, setFechaDeRegistro] = useState(new Date().toLocaleDateString("es-ES", {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: '2-digit'
    }));

    function goBack() {
        navigate('/inicio');
    }

    useEffect(function () {
        function connectToWS() {
            const ws = new WebSocket(process.env.REACT_APP_WS_URL);
    
            ws.onopen = async function () {
                setWS(ws);

                const response = await axios.get(`${process.env.REACT_APP_API_URL}/usuarios/accessToken/values`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': sessionStorage.getItem('token')
                    }
                }).catch((error) => {
                    console.error(error.message);
                    return error.response ?? null;
                });

                if ((!response || response.statusCode !== 200) || !response.data) {
                    console.error('error al establecer el puente de datos');
                    return;
                }

                ws.send(JSON.stringify({
                    eventName: 'setBridge',
                    idPerro: mascotas.find(m => m.idDueño === response.data._id).idDueño,
                    idUsuario: response.data._id   
                }));
            }

            ws.onmessage = function (event) {
                const data = event.data;
                switch (data.eventName) {
                    case "SensorData":
                        setFechaDeRegistro(data.fechaRegistro);
                        setRitmoCardiaco(data.latidosPorMinuto);
                        setTemperatura(data.temperatura);
                        break;
                    
                    default:
                        return;
                }
            }
    
            ws.onclose = function (event) {
                console.log(event.reason);
                console.log("intentando reconectar en 5 segundos...");
                setTimeout(() => connectToWS(), 5000);
            }

            ws.onerror = function (event) {
                console.log(event);
                ws.close();
            }
        }

        connectToWS();

        return () => {
            if (ws && ws.readyState) {
                ws.close();
            }
        }
    },[]);

  return (
    <div className="macbook-pro">
      <div className="overlap">
        <div className="rectangle" />
        <div className="text-wrapper">PetMaps</div>
      </div>
      <div className="div">PetsGPS</div>
      <div className="thread"><LeafletMap /></div>
      <div className="text-wrapper-2">Todas mis mascotas</div>
      <Link to="/mascotas">
        <img className="arrow" alt="Arrow" src="Arrow 2.png" />
      </Link>{" "}
      <div className="parent-container">
        <div className="frame">
          <div className="frame-wrapper">
          {mascotas.map((mascota, index) => (
            <MascotaContainer edad={mascota.fechaNacimiento} nombre={mascota.nombre}
            goToInfo={() => gotToInfoPage(mascota._id, mascota.nombre)}/>
          ))}
          </div>
          <div className="text-wrapper-5">Mis mascotas</div>
          <div className="div-wrapper">
            
          </div>
          <div className="livescreen-overflow">
            <img className="vector" alt="Vector" src="temp.png" />
            <div className="ellipse" />
            <div className="text-wrapper-6">{temperatura}</div>
            <div className="text-wrapper-7">°C</div>
            <div className="text-wrapper-8">Temperatura de *nombre*</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
