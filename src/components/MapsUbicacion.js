import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const LocationUpdater = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom());
    }
  }, [position, map]);

  return null;
};

const Google = () => {
  const [ws, setWs] = useState(null);
  const [latitud, setLatitud] = useState(0);
  const [longitud, setLongitud] = useState(0);

  const position = [latitud, longitud];

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    setWs(socket);

    socket.onopen = () => {
      console.log("Conectado al servidor WebSocket");
    };

    socket.onmessage = (event) => {
      let message = event.data;

      if (message instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          message = reader.result;
          processMessage(message);
        };
        reader.readAsText(message);
      } else {
        processMessage(message);
      }
    };

    socket.onerror = (error) => {
      console.error("Error en WebSocket:", error);
    };

    return () => {
      socket.close();
    };
  }, []);

  const processMessage = (message) => {
    try {
      const data = JSON.parse(message);
      setLatitud(data.latitud || 0);
      setLongitud(data.longitud || 0);
    } catch (e) {
      console.error("Error al parsear el mensaje:", e);
    }
  };

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationUpdater position={position} />
      <Marker position={position}>
        <Popup>
          Latitud: {latitud.toFixed(6)} <br /> Longitud: {longitud.toFixed(6)}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Google;