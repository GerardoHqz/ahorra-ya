import React, { useEffect, useState } from "react";
import { Button, Drawer, Space, Popover, Modal } from "antd";
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
import { getStoreImage } from "../api/images";
import "../assets/style/AntDesignCustom.css";
import { SlOptions } from "react-icons/sl";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { deleteStore } from "../api/stores";
import EditStoreForm from "./EditStoreForm";

const StoreOffers = ({
  visible,
  onClose,
  store,
  handleUpdateStores,
  showMapButton,
}) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [offersData, setOffersData] = useState([]);
  const [openOfferForm, setOpenOfferForm] = useState(false);
  const [updateOffers, setUpdateOffers] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [image, setImage] = useState();
  const [open, setOpen] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageURL = await getStoreImage(token, store.idStore);
        setImage(imageURL);
      } catch (error) {}
    };
    fetchImage();
  }, [store, token]);
  console.log("image", image);

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

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    try {
      await deleteStore(token, store.idStore);
      handleUpdateStores(true);
    } catch (error) {
      console.error("Error al eliminar el elemento:", error);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const content = (
    <div>
      <span
        className="flex p-2 hover:text-blue hover:cursor-pointer active:bg-opacity-50"
        onClick={() => {
          setOpenEditForm(true);
        }}
      >
        <AiOutlineEdit size={20} />
        <p className="pl-2">Editar</p>
      </span>
    </div>
  );

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
          {store?.webSite && (
            <p className="flex flex-col  pb-8">
              Sitio web:
              <span className="flex border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md ">
                <IoIosLink size={20} color="#808080" className="mr-2" />
                {store?.webSite}
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
      <div className="flex justify-between items-center">
        <span className="flex items-center">
          <span className="pr-3">
            <h1 className="text-xl font-bold">{store?.name}</h1>
            <h2 className="text-sm text-secondary-text">
              {store?.departament.name}, {store?.municipality.name}
            </h2>
          </span>
          <FaHeart
            className="cursor-pointer"
            size={30}
            color={isFavorite ? "red" : "gray"}
            onClick={handleToggleFavorite}
          />
        </span>
        <Space wrap>
          <Popover
            content={content}
            trigger="click"
            style={{
              width: "20%",
              padding: "0px !important",
            }}
          >
            <SlOptions />
          </Popover>
        </Space>
        <EditStoreForm
          open={openEditForm}
          setOpen={setOpenEditForm}
          handleUpdateStores={handleUpdateStores}
          store={store}
          latitude={store?.latitude}
          longitude={store?.longuitude}
        />
      </div>
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
          {showMapButton && (
            <Button
              onClick={handleMapLocation}
              className="bg-pink text-white flex items-center gap-3"
            >
              <FaLocationArrow size={20} /> Ver en el mapa
            </Button>
          )}
          <Button
            className="bg-pink text-white"
            onClick={() => setOpenOfferForm(true)}
          >
            Añadir oferta
          </Button>
        </div>

        <hr />
        <Image className="" src={image} alt={store?.name} />
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
            storeId={store?.idStore}
            category={offer?.category}
            productName={offer.name}
            description={offer.description}
            actualPrice={offer.priceNow}
            previousPrice={offer.priceBefore}
            duration={offer.endDate}
            initDate={offer.initDate}
            handleUpdateOffers={setUpdateOffers}
          />
        ))}
      </Drawer>
      <Modal
        title="Confirmación"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>¿Esta seguro que desea eliminar esta oferta?</p>
      </Modal>
    </>
  );
};

export default StoreOffers;
