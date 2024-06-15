import { useEffect, useState } from "react";
import { Layout } from "antd";
import SideMenu from "../components/Menu";
import { Content } from "antd/es/layout/layout";
import { getAllFavoritesService } from "../api/favorites";
import { Store } from "../interfaces/Stores";
import StoreCard from "../components/StoreCard";

const Favorites = () => {
  const token = localStorage.getItem("token");
  const [stores, setStores] = useState<Store[]>([]);

  const handleGetAllStores = async () => {
    try {
      const response = await getAllFavoritesService(token);
      setStores(response);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetAllStores();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout className="min-h-screen flex flex-row text-bg-dark-blue dark:text-white">
      <SideMenu />
      <Layout>
        <div className="bg-white dark:bg-gray-800 p-6">
          <p className="text-xl">Tiendas favoritas</p>
        </div>
        <Content className="flex gap-8 p-8">
          {stores.map((store) => (
            <StoreCard
              key={store.idStore}
              id={store.idStore}
              name={store.name}
              description={store.description}
              latitude={store.latitude}
              longitude={store.longitude}
              department={store.departament}
              municipality={store.municipality}
              address={store.direction}
              ownerName={store.ownerName}
              website={store.website}
              phone={store.phone}
              email={store.email}
            />
          ))}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Favorites;
