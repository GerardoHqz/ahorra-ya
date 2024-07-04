import { useEffect, useState } from "react";
import { Layout } from "antd";
import SideMenu from "../components/Menu";
import { Content } from "antd/es/layout/layout";
import { getAllFavoritesService } from "../api/favorites";
import { Store } from "../interfaces/Stores";
import StoreCard from "../components/StoreCard";
import StoreOffers from "../components/StoreOffers";

const Favorites = () => {
  const token = localStorage.getItem("token");
  const [stores, setStores] = useState<Store[]>([]);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  
  const [updateStores, setUpdateStores] = useState(false);

  const handleMarkerClick = (store: any) => {
    setSelectedStore(store);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedStore(null);
  };

  const handleGetAllStores = async () => {
    try {
      const response = await getAllFavoritesService(token);
      setStores(response);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetAllStores();
    setUpdateStores(false);
    // eslint-disable-next-line
  }, [updateStores]);

  return (
    <Layout className="min-h-screen flex flex-row text-bg-dark-blue dark:text-white">
      <SideMenu />
      <Layout>
        <div className="bg-white dark:bg-gray-800 p-6">
          <p className="text-xl">Tiendas favoritas</p>
        </div>
        <Content className="flex gap-8 p-8 flex-wrap">
          {stores.map((store) => (
            <div onClick={() => handleMarkerClick(store)}>
              <StoreCard
                key={store.idStore}
                id={store.idStore}
                name={store.name}
                description={store.description}
                department={store.departament}
                municipality={store.municipality}
                address={store.direction}
              />
            </div>
          ))}
        </Content>
        <StoreOffers
          visible={drawerVisible}
          onClose={closeDrawer}
          store={selectedStore}
          handleUpdateStore={setUpdateStores}
        />
      </Layout>
    </Layout>
  );
};
export default Favorites;
