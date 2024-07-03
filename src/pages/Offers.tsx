import { useEffect, useState } from "react";
import { Input, Layout } from "antd";
import SideMenu from "../components/Menu";
import { Offer } from "../interfaces/Offers";
import { Content } from "antd/es/layout/layout";
import OfferCard from "../components/OfferCard";
import { getOfferAll, getOffersByName } from "../api/offer";
import { FaSearch } from "react-icons/fa";

const Offers = () => {
  const token = localStorage.getItem("token");
  const [recentOffers, setRecentOffers] = useState<Offer[]>([]);
  const [search, setSearch] = useState("");

  const handleGetAllOffers = async () => {
    try {
      const response = await getOfferAll(token);
      setRecentOffers(response);
    } catch (error) {}
  };

  const onSearch = async () => {
    try {
      const response = await getOffersByName(token, search);
      setRecentOffers(response);
    } catch (error) {}
  }

  useEffect(() => {
    handleGetAllOffers();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout className="min-h-screen flex flex-row text-bg-dark-blue dark:text-white">
      <SideMenu />
      <Layout>
        <div className="bg-white dark:bg-gray-800 p-6">
          <p className="text-xl">Ofertas</p>
        </div>
        <Content className="flex flex-col gap-4 p-8">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Ingrese una dirección"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="rounded-full bg-gradient-to-br from-orange to-pink text-white p-2 shadow-md"
              onClick={onSearch}
            >
              <FaSearch size={25} />
            </button>
          </div>
          <button
            className="rounded-full w-max bg-gradient-to-br from-orange to-pink text-white p-2 shadow-md"
            onClick={handleGetAllOffers}
          >
            Limpiar filtros
          </button>
          <div className="flex gap-5">
            {recentOffers.map((offer) => (
              <OfferCard
                key={offer.idOffer}
                id={offer.idOffer}
                productName={offer.name}
                storeName={offer.store.name}
                actualPrice={offer.priceNow}
                previousPrice={offer.priceBefore}
                endDate={offer.endDate}
              />
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Offers;
