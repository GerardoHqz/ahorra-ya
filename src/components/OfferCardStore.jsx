import React from "react";
import { Card } from "antd";
import '../assets/style/AntDesignCustom.css'

const OfferCardStore = ({ id, productName, description, duration, image, actualPrice, previousPrice }) => (
  <Card
    id={id}
    hoverable
    style={{
      display: "flex",
      marginTop: "5%",
      padding: "0px !important",

    }}
    className="shadow-md grid grid-cols-2"
    cover={
      <img
        className="h-48 w-24 object-cover"
        alt={productName}
        src={image}
      />
    }
  >

    <div className="">
      <p className="text-lg font-bold">{productName}</p>
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
