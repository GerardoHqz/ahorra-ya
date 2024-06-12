import { useState } from "react";
import { Layout } from "antd";
import SideMenu from "../components/Menu";
import { offers } from "../mock_data/offers";
import { Offer } from "../interfaces/Offers";
import { Content } from "antd/es/layout/layout";
import OfferCard from "../components/OfferCard";

const Home = () => {
  const [recentOffers, setRecentOffers] = useState<Offer[]>(offers);
  return (
    <Layout className="min-h-screen flex flex-row text-bg-dark-blue dark:text-white">
      <SideMenu />
      <Layout>
        <div className="bg-white dark:bg-gray-800 p-6">
          <p className="text-xl">Últimas ofertas</p>
        </div>
        <Content className="flex gap-8 p-8">
          {recentOffers.map((offer) => (
            <OfferCard
              id={offer.id}
              productName={offer.product_name}
              image={offer.images[0].url}
              storeName={offer.store.name}
              actualPrice={offer.actual_price}
              previousPrice={offer.previous_price}
            />
          ))}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Home;
