import React, { useEffect, useState } from "react";
import { Button, Drawer, Space } from "antd";
import { IoIosLink } from "react-icons/io";
import { FiPhone, FiUser } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { FaLocationArrow } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { Collapse } from "antd";
import logo from "../assets/img/logo.svg";
import { Image } from "antd";
import OfferCard from "./OfferCardStore";
import { LuMapPin } from "react-icons/lu";
import AddOfferForm from "./AddOfferForm";
import { getOfferByStore } from "../api/offer";
import {
  addFavoriteService,
  deleteFavoriteService,
  getOneFavoriteService,
} from "../api/favorites";
import { useNavigate } from "react-router-dom";

const StoreOffers = ({ visible, onClose, store }) => {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [offersData, setOffersData] = useState([]);
  const [openOfferForm, setOpenOfferForm] = useState(false);
  const [updateOffers, setUpdateOffers] = useState();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleVerifyFavorite = async () => {
    try {
      const favorite = await getOneFavoriteService(token, store.idStore);
      setIsFavorite(favorite);
    } catch (error) {}
  };

  const handleToggleFavorite = async () => {
    if (isFavorite) {
      try {
        await deleteFavoriteService(token, store.idStore);
        setIsFavorite(false);
      } catch (error) {}
    } else {
      try {
        await addFavoriteService(token, { store: store.idStore });
        setIsFavorite(true);
      } catch (error) {}
    }
  };

  const handleMapLocation = () => {
    navigate("/map", {
      state: { location: `${store.latitude}, ${store.longuitude}` },
    });
  };

  const offers = [
    {
      key: store?.idStore,
      label: <h2 className="font-bold">Información de contacto</h2>,
      children: (
        <div>
          {store?.ownerName && (
            <p className="flex flex-col  pb-8">
              Propiertario:
              <span className="flex border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md ">
                <FiUser size={20} color="#808080" className="mr-2" />
                {store?.ownerName}
              </span>
            </p>
          )}
          {store?.website && (
            <p className="flex flex-col  pb-8">
              Sitio web:
              <span className="flex border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md ">
                <IoIosLink size={20} color="#808080" className="mr-2" />
                {store?.website}
              </span>
            </p>
          )}
          {store?.phone && (
            <p className="flex flex-col  pb-8">
              Número de teléfono:
              <span className="flex border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md ">
                <FiPhone size={20} color="#808080" className="mr-2" />
                {store?.phone}
              </span>
            </p>
          )}
          {store?.email && (
            <p className="flex flex-col  pb-8">
              Correo electronico:
              <span className="flex border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md">
                <AiOutlineMail size={20} color="#808080" className="mr-2" />
                {store?.email}
              </span>
            </p>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (store) {
      getOfferByStore(token, store.idStore).then((data) => setOffersData(data));
      handleVerifyFavorite();
      setUpdateOffers(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateOffers, store]);

  const DrawerTitle = () => {
    return (
      <span className="flex items-center">
        <span>
          <h1 className="text-xl font-bold">{store?.name}</h1>
          <h2 className="text-sm text-secondary-text">
            {store?.departament.name}, {store?.municipality.name}
          </h2>
        </span>
        <embed src={logo} className="size-12 mx-5" />
        <FaHeart
            size={30}
            color={isFavorite ? "red" : "gray"}
            onClick={handleToggleFavorite}
          />
      </span>
    );
  };

  return (
    <>
      <AddOfferForm
        open={openOfferForm}
        setOpen={setOpenOfferForm}
        idStore={store?.idStore}
        handleUpdateOffers={setUpdateOffers}
      />

      <Drawer
        title={<DrawerTitle />}
        placement="left"
        width={650}
        onClose={onClose}
        open={visible}
      >
        <div className="flex justify-between items-center gap-5 pb-5">
          
          <Button
            onClick={handleMapLocation}
            className="bg-pink text-white flex items-center gap-3"
          >
            <FaLocationArrow size={20} /> Ver en el mapa
          </Button>
          <Button
            className="bg-pink text-white"
            onClick={() => setOpenOfferForm(true)}
          >
            Añadir oferta
          </Button>
        </div>
        <hr />
        <Image
          className="w-full"
          src="https://erf.org.eg/app/themes/website2020/resources/assets/images/placeholder.jpg"
        />
        <p className="text-black py-5">{store?.description}</p>
        <p className="pb-5 flex items-center ">
          <LuMapPin className="mr-2" />
          <span className="font-bold">Dirección:</span>
          {store?.direction}
        </p>
        <hr />
        <Collapse defaultActiveKey={["1"]} ghost items={offers} />
        <hr />

        {offersData.map((offer) => (
          <OfferCard
            key={offer.idOffer}
            id={offer.idOffer}
            productName={offer.name}
            image="https://erf.org.eg/app/themes/website2020/resources/assets/images/placeholder.jpg"
            description={offer.description}
            actualPrice={offer.priceNow}
            previousPrice={offer.priceBefore}
            duration={offer.endDate}
          />
        ))}
      </Drawer>
    </>
  );
};

export default StoreOffers;
