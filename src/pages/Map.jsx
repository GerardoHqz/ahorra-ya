import "leaflet/dist/leaflet.css";
import "../assets/style/AntDesignCustom.css";
import { Input, Layout } from "antd";
import SideMenu from "../components/Menu";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { Icon } from "leaflet";
import OrangePin from "../assets/OrangePin.png";
import BluePin from "../assets/BluePin.png";
import { useState, useEffect } from "react";
import AddStoreForm from "../components/AddStoreForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllStoresService } from "../api/stores";
import StoreOffers from "../components/StoreOffers";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const icon = new Icon({
  iconUrl: OrangePin,
  iconSize: [30, 41],
});

const storeIcon = new Icon({
  iconUrl: BluePin,
  iconSize: [30, 41],
});

function AddStore({ setOpen, position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup>
        <button
          onClick={() => setOpen(true)}
          className="bg-green-500 p-3 rounded-md text-white shadow-md border-2 border-green-400"
        >
          Agregar tienda
        </button>
      </Popup>
    </Marker>
  );
}

const MapComponent = ({ position, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, zoom);
    }
  }, [position, map, zoom]);
  return null;
};

const Map = () => {
  const state = useLocation().state;
  const token = localStorage.getItem("token");

  const [position, setPosition] = useState([13.7035233, -89.2116845]);
  const [openStoreForm, setOpenStoreForm] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(position);
  const [stores, setStores] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [address, setAddress] = useState("");
  const [zoom, setZoom] = useState(13);

  const [updateStores, setUpdateStores] = useState(false);

  const handleGetAllStores = async () => {
    try {
      const data = await getAllStoresService(token);
      setStores(data);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetAllStores();
    setUpdateStores(false);
    // eslint-disable-next-line
  }, [updateStores]);

  useEffect(() => {
    if (state?.location) {
      const [lat, lng] = state.location.split(",");
      setPosition([lat, lng]);
      setZoom(16);
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

  const handleMarkerClick = (store) => {
    setSelectedStore(store);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedStore(null);
  };

  const onSearch = async () => {
    const result = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`
    );
    const data = await result.json();
    if (data.length > 0) {
      setPosition([data[0].lat, data[0].lon]);
      setZoom(16);
    }
  };

  return (
    <Layout className="min-h-screen flex flex-row text-bg-dark-blue dark:text-white">
      <ToastContainer />
      <AddStoreForm
        open={openStoreForm}
        setOpen={setOpenStoreForm}
        handleUpdateStores={setUpdateStores}
        latitude={selectedPosition.lat}
        longitude={selectedPosition.lng}
      />
      <SideMenu />
      <Layout>
        <MapContainer center={position} zoom={zoom} style={{ height: "100vh" }}>
          <div className="absolute z-[500] mt-5 ml-20 w-10/12 flex gap-4">
            <Input
              placeholder="Ingrese una dirección"
              onChange={(e) => setAddress(e.target.value)}
            />
            <button
              className="rounded-full bg-gradient-to-br from-orange to-pink text-white p-2 shadow-md"
              onClick={onSearch}
            >
              <FaSearch size={25} />
            </button>
          </div>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapComponent position={position} zoom={zoom} />
          <AddStore
            setOpen={setOpenStoreForm}
            setPosition={setSelectedPosition}
            position={selectedPosition}
          />
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
          <StoreOffers
            visible={drawerVisible}
            onClose={closeDrawer}
            store={selectedStore}
            handleUpdateStore={setUpdateStores}
          />
        </MapContainer>
      </Layout>
    </Layout>
  );
};

export default Map;
