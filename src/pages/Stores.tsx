import { useEffect, useState } from "react";
import { Input, Layout, Select } from "antd";
import SideMenu from "../components/Menu";
import { Content } from "antd/es/layout/layout";
import {
  getAllStoresService,
  getStoresByDepartmentService,
  getStoresByMunicipalityService,
  getStoresByNameService,
} from "../api/stores";
import { Store } from "../interfaces/Stores";
import StoreCard from "../components/StoreCard";
import { FaSearch } from "react-icons/fa";
import StoreOffers from "../components/StoreOffers";

const items = [
  {
    value: "1",
    label: "Nombre",
  },
  {
    value: "2",
    label: "Departamento",
  },
  {
    value: "3",
    label: "Municipio",
  },
];

const Stores = () => {
  const token = localStorage.getItem("token");
  const [stores, setStores] = useState<Store[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("1");

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
      const response = await getAllStoresService(token);
      setStores(response);
    } catch (error) {}
  };

  const handleChangeFilter = (key: string) => {
    setFilter(key);
  };

  const onSearch = async () => {
    if (search === "") {
      return;
    }
    switch (filter) {
      case "1":
        try {
          const storesByName = await getStoresByNameService(token, search);
          setStores(storesByName);
        } catch (error) {}
        break;
      case "2":
        try {
          const storesByDepartment = await getStoresByDepartmentService(
            token,
            search
          );
          setStores(storesByDepartment);
        } catch (error) {}
        break;
      case "3":
        try {
          const storesByMunicipality = await getStoresByMunicipalityService(
            token,
            search
          );
          setStores(storesByMunicipality);
        } catch (error) {}
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleGetAllStores();
    setUpdateStores(false);
    // eslint-disable-next-line
  }, [updateStores]);

  return (
    <Layout className="min-h-screen flex flex-row text-bg-dark-blue dark:text-white">
      <SideMenu />
      <Layout className="ml-52">
        <div className="bg-white dark:bg-gray-800 p-6">
          <p className="text-xl">Tiendas</p>
        </div>
        <Content className="flex flex-col gap-4 p-8">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Ingrese un parámetro de búsqueda"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select
              placeholder="Filtrar por"
              onChange={handleChangeFilter}
              options={items}
            />
            <button
              className="rounded-full dark:from-gray-800 dark:to-gray-800 bg-gradient-to-br from-orange to-pink text-white p-2 shadow-md"
              onClick={onSearch}
            >
              <FaSearch size={25} />
            </button>
          </div>
          <button
            className="rounded-full w-max dark:from-gray-800 dark:to-gray-800 bg-gradient-to-br from-orange to-pink text-white p-2 shadow-md"
            onClick={handleGetAllStores}
          >
            Limpiar filtros
          </button>
          <div className="flex gap-5 flex-wrap">
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
          </div>
        </Content>
        <StoreOffers
          visible={drawerVisible}
          onClose={closeDrawer}
          store={selectedStore}
          handleUpdateStores={setUpdateStores}
          showMapButton={true}
        />
      </Layout>
    </Layout>
  );
};


export default Stores;
