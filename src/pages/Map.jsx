import "leaflet/dist/leaflet.css";
import { Layout } from "antd";
import SideMenu from "../components/Menu";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";
import OrangePin from "../assets/OrangePin.png";
import BluePin from "../assets/BluePin.png";
import { useState, useEffect } from "react";
import { Button, Drawer } from 'antd';
import '../assets/style/drawer.css'
import logo from "../assets/img/logo.svg"
import AddStoreForm from "../components/AddStoreForm";

const icon = new Icon({
  iconUrl: OrangePin,
  iconSize: [30, 41]
});

function AddStore({ showDrawer }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      console.log("open")
    }
  });

  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup>
        Lat: {position.lat.toFixed(5)}, Lng: {position.lng.toFixed(5)}
        <Button type="primary" onClick={showDrawer}>
          Añadir
        </Button>
      </Popup>
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

const DrawerTitle = () => {
  return (
    <span className="flex items-center">
      <span>
        <h1 className="text-xl pb-2">Agregar Tienda</h1>
        <h2 className="text-sm text-secondary-text">Informacion básica</h2>
      </span>
      <embed src={logo} className="size-12 mx-5" />
    </span>
  )
}
const Map = () => {
  const [position, setPosition] = useState([13.7035233, -89.2116845]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const onClose = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  return (
    <Layout className="min-h-screen text-bg-dark-blue dark:text-white">
      <Drawer
        title={<DrawerTitle />}
        placement="left"
        closable={true}
        onClose={onClose}
        open={drawerOpen}
      >
        <AddStoreForm />
      </Drawer>
      <SideMenu />
      <Layout>
        <MapContainer center={position} zoom={13} style={{ height: "100vh" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapComponent position={position} />
          <AddStore showDrawer={showDrawer} />
        </MapContainer>
      </Layout>
    </Layout>
  );
};

export default Map;
