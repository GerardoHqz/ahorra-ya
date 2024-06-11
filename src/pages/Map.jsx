import "leaflet/dist/leaflet.css";
import "../assets/style/AntDesignCustom.css"
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
import StoreOffers from "../components/StoreOffers";

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
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  const [updateStores, setUpdateStores] = useState(false);

  useEffect(() => {
    const token="eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhbGVAdGVzdC5jb20iLCJpYXQiOjE3MTgwNjc4NzcsImV4cCI6MTcxOTM2Mzg3N30.dbz7W9OTu1uI6QXKoBXc-eC11LMScugvP6O88rTWjIKVYO7JJsHxjR5af83cwTGj"
    getAllStoresService(token).then((data) => setStores(data));
    setUpdateStores(false);
  }, [updateStores]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  const handleMarkerClick = (store) => {
    setSelectedStore(store);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedStore(null);
  };

  return (
    <Layout className="min-h-screen flex flex-row text-bg-dark-blue dark:text-white">
      <ToastContainer />
      <AddStoreForm open={openStoreForm} setOpen={setOpenStoreForm} handleUpdateStores={setUpdateStores} latitude={selectedPosition.lat} longitude={selectedPosition.lng}/>
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
            <Marker 
              key={store.storeId} 
              position={[store.latitude, store.longuitude]} 
              icon={storeIcon}
              eventHandlers={{
                click: () => handleMarkerClick(store),
              }}
            />
          ))}
          <StoreOffers visible={drawerVisible} onClose={closeDrawer} store={selectedStore}/>
        </MapContainer>
      </Layout>
    </Layout>
  );
};

export default Map;
