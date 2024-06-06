import "leaflet/dist/leaflet.css";
import { Layout } from "antd";
import SideMenu from "../components/Menu";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";
import OrangePin from "../assets/OrangePin.png";
import BluePin from "../assets/BluePin.png";
import { useState, useEffect } from "react";
import AddStoreForm from "../components/AddStoreForm";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getAllStoresService } from "../api/stores"

const icon = new Icon ({
  iconUrl: OrangePin,
  iconSize: [30, 41]
});

const storeIcon = new Icon({
  iconUrl: BluePin,
  iconSize: [30, 41]
});

function AddStore({ setOpen, position, setPosition }) {

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    }
  });

  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup><button onClick={() => setOpen(true)} className="bg-green-500 p-3 rounded-md text-white shadow-md border-2 border-green-400">Agregar tienda</button></Popup>
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
  const [openStoreForm, setOpenStoreForm] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(position);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const token="eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJKb2huRG9lMTIzIUBleGFtcGxlLmNvbSIsImlhdCI6MTcxNzY4MjE4MiwiZXhwIjoxNzE4OTc4MTgyfQ.NOCFEluWldWu3uDVr9vxdU3rNJ1lajBbVGN8mnJyZ2PHSPSvaSpvZX28qKw7fSCc"
    getAllStoresService(token).then((data) => setStores(data));
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  return (
    <Layout className="min-h-screen text-bg-dark-blue dark:text-white">
      <ToastContainer />
      <AddStoreForm open={openStoreForm} setOpen={setOpenStoreForm} latitude={selectedPosition.lat} longitude={selectedPosition.lng}/>
      <SideMenu />
      <Layout>
        <MapContainer center={position} zoom={13} style={{ height: "100vh" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapComponent position={position} />
          <AddStore setOpen={setOpenStoreForm} setPosition={setSelectedPosition} position={selectedPosition}/>

          {stores.map((store) => (
            <Marker key={store.id} position={[store.latitude, store.longuitude]} icon={storeIcon}>
              <Popup>
                <div>
                  <h2>{store.name}</h2>
                  <p>{store.description}</p>
                  <p>{store.direction}</p>
                  <p>{store.ownerName}</p>
                  <p>{store.website}</p>
                  <p>{store.phone}</p>
                  <p>{store.email}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Layout>
    </Layout>
  );
};

export default Map;
