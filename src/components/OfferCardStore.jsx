import React from "react";
import { Card } from "antd";
import '../assets/style/AntDesignCustom.css'

const OfferCardStore = ({ id, productName, description, duration, image, actualPrice, previousPrice }) => (
  <Card
    id={id}
    hoverable
    style={{
      display: "flex",
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
      <p className="text-lg font-bold line-clamp-2 leading-[1.2rem]">{productName}</p>
      <span className="flex">
        <p className="font-bold text-xl text-pink pr-3">${actualPrice}</p>
        <p className="text-lg text-secondary-text line-through">${previousPrice}</p>
      </span>
    </div>
    <p className="py-2 text-sm">{description}</p>
    <p className="text-sm ">Valido hasta: {duration}</p>

  </Card>
);
export default OfferCardStore;