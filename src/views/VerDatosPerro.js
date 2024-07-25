import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../assets/styles/VerDatosPerro.css";
import axios from "axios";

const VerDatosPerro = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate('/');
        }
    }, []);

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();
    const idPerro = query.get('idPerro');
    const nombrePerro = query.get('nombrePerro');
    
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

                const response = await axios.get(process.env.REACT_APP_API_URL, {
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
                    idPerro: idPerro,
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

    const mainNode = useRef(null);

    return (
        <main className="main-block" ref={mainNode}>
            <p className="main-title">{nombrePerro}</p>
            <div className="gradient-line" />
            <p className="goBack-button" onClick={goBack}>volver</p>
            <article className="data-article">
                <section className="temperature-section">
                    <p className="temperature-title">temperatura:</p>
                    <p className="temperature-value">{temperatura} C°</p>
                </section>
                <section className="heartbeats-section">
                    <p className="heartbeat-title">ritmo cardiaco:</p>
                    <p className="heartbeat-value">{ritmoCardiaco} latidos por minuto</p>
                </section>
            </article>
            <footer className="fecha-registro">
                Datos pertenecientes a la fecha: {fechaDeRegistro}
            </footer>
        </main>
    );
}

export default VerDatosPerro;