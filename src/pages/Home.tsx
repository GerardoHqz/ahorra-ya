import { useEffect, useState } from "react";
import { Layout } from "antd";
import SideMenu from "../components/Menu";
import { Offer } from "../interfaces/Offers";
import { Content } from "antd/es/layout/layout";
import OfferCard from "../components/OfferCard";
import { getOfferAll } from "../api/offer";

const Home = () => {
  const token = localStorage.getItem("token");
  const [recentOffers, setRecentOffers] = useState<Offer[]>([]);

  const handleGetAllOffers = async () => {
    try {
      const response = await getOfferAll(token);
      setRecentOffers(response);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetAllOffers();
    // eslint-disable-next-line
  }, []);

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
              key={offer.idOffer}
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
