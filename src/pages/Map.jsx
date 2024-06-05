import "leaflet/dist/leaflet.css";
import { Layout } from "antd";
import SideMenu from "../components/Menu";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";
import OrangePin from "../assets/OrangePin.png";
import BluePin from "../assets/BluePin.png";
import { useState, useEffect } from "react";

const icon = new Icon ({
  iconUrl: OrangePin,
  iconSize: [30, 41]
});

function AddStore() {
  const [position, setPosition] = useState(null);
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    }
  });

  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup>Lat: {position.lat.toFixed(5)}, Lng: {position.lng.toFixed(5)}</Popup>
    </Marker>
  );
}

const MapComponent = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 13);
    }
  }, [position, map]);
  return null;
};

const Map = () => {
  const [position, setPosition] = useState([13.7035233, -89.2116845]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  return (
    <Layout className="min-h-screen text-bg-dark-blue dark:text-white">
      <SideMenu />
      <Layout>
        <MapContainer center={position} zoom={13} style={{ height: "100vh" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapComponent position={position} />
          <AddStore />
        </MapContainer>
      </Layout>
    </Layout>
  );
};

export default Map;
