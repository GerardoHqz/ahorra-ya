import { useEffect, useState } from "react";
import { Layout } from "antd";
import SideMenu from "../components/Menu";
import { offers } from "../mock_data/offers";
import { Offer } from "../interfaces/Offers";
import { Content } from "antd/es/layout/layout";
import OfferCard from "../components/OfferCard";
import { getOfferAll } from "../api/offer";
import StoreOffers from "../components/StoreOffers";
import { Store } from "../interfaces/Stores";

const Home = () => {
  const [recentOffers, setRecentOffers] = useState<Offer[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedStore(null);
  };

  const handleOfferClick = (store: Store) => {
    setSelectedStore(store);
    setDrawerVisible(true);
  };

  useEffect(() => {
    getOfferAll(
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhbGVAdGVzdC5jb20iLCJpYXQiOjE3MTgwNjc4NzcsImV4cCI6MTcxOTM2Mzg3N30.dbz7W9OTu1uI6QXKoBXc-eC11LMScugvP6O88rTWjIKVYO7JJsHxjR5af83cwTGj"
    ).then((data) => setRecentOffers(data));
  }, []);

  return (
    <Layout className="min-h-screen flex flex-row text-bg-dark-blue dark:text-white">
      <SideMenu />
      <StoreOffers
        visible={drawerVisible}
        onClose={closeDrawer}
        store={selectedStore}
      />
      <Layout>
        <div className="bg-white dark:bg-gray-800 p-6">
          <p className="text-xl">Últimas ofertas</p>
        </div>
        <Content className="flex gap-8 p-8">
          {recentOffers.map((offer) => (
            <OfferCard
              id={offer.idOffer}
              productName={offer.name}
              image={/*offer.images[0].url*/ ""}
              storeName={offer.store.name}
              actualPrice={offer.priceNow}
              previousPrice={offer.priceBefore}
            />
          ))}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Home;
