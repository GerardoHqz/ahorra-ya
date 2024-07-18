import React, { useEffect, useState } from "react";
import { Card } from "antd";
import "../assets/style/AntDesignCustom.css";
import { getOfferImage } from "../api/images";
import { deleteOffer } from "../api/offer";
import { Popover, Space, Modal } from 'antd';
import { SlOptions } from "react-icons/sl";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import EditOfferForm from "../components/EditOfferForm"

const OfferCardStore = (
  {
    id,
    storeId,
    category,
    productName,
    description,
    duration,
    initDate,
    actualPrice,
    previousPrice,
    handleUpdateOffers
  }) => {

  const token = localStorage.getItem("token");
  const [image, setImage] = useState();
  const [updateImage, setUpdateImage] = useState(false)
  const [open, setOpen] = useState(false);

  const [openEditForm, setOpenEditForm] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  //Delete offer
  const handleOk = async () => {
    try {
      await deleteOffer(token, id);
      handleUpdateOffers(true);
    } catch (error) {
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageURL = await getOfferImage(token, id);
        setImage(imageURL);
      } catch (error) { }
    };
    fetchImage();
    // eslint-disable-next-line
  }, [id, updateImage]);


  const content = (
    <div>
      <span className="flex p-2 hover:bg-orange hover:bg-opacity-25 hover:cursor-pointer active:bg-opacity-50" onClick={showModal}>
        <AiOutlineDelete size={20} />
        <p className="pl-2">Eliminar</p>
      </span>
      <span className="flex p-2 hover:bg-orange hover:bg-opacity-25 hover:cursor-pointer active:bg-opacity-50" onClick={() => {
        setOpenEditForm(true)
      }}>
        <AiOutlineEdit size={20} />
        <p className="pl-2">Editar</p>
      </span>
    </div>
  );

  const offerData = {
    id,
    name: productName,
    description: description,
    priceBefore: previousPrice,
    priceNow: actualPrice,
    endDate: duration,
    initDate: initDate,
    category:category
  };
  return (
    <Card
      id={id}
      hoverable
      style={{
        display: "grid",
        gridColumn: 2,
        marginTop: "7%",
        padding: "0px !important",
      }}
      className="shadow-md grid grid-cols-2"
      cover={
        <img
          id="id"
          className="h-48 w-24 object-cover rounded-md rounded-e-md"
          alt={productName}
          src={image}
        />
      }
    >
      <div className="">
        <span className="flex justify-between items-start">
          <p className="text-lg font-bold line-clamp-2 leading-[1.2rem] pr-3">
            {productName}
          </p>
          <Space wrap>
            <Popover content={content} trigger="click"
              style={{
                width: "20%",
                padding: "0px !important",
              }}>
              <SlOptions />
            </Popover>
          </Space>
        </span>
        <span className="flex">
          <p className="font-bold text-xl text-pink pr-3">${actualPrice}</p>
          <p className="text-lg text-secondary-text line-through">
            ${previousPrice}
          </p>
        </span>
      </div>
      <p className="py-2 text-sm line-clamp-3 !p-0 m-0">{description}</p>
      <p className="text-sm ">Valido hasta: {duration}</p>
      <Modal
        title="Confirmación"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>¿Esta seguro que desea eliminar esta oferta?</p>
      </Modal>
      <EditOfferForm
        open={openEditForm}
        setOpen={setOpenEditForm}
        idStore={storeId}
        handleUpdateOffers={handleUpdateOffers}
        handleUpdateImage={setUpdateImage}
        offer={offerData}
      />
    </Card>
  );
};
export default OfferCardStore;
