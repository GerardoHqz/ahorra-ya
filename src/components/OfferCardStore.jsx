import React from "react";
import { Card } from "antd";
const OfferCardStore = ({id, productName, description, duration, image, actualPrice, previousPrice }) => (
  <Card
    id={id}
    hoverable
    style={{
      width: "100%",
      display: "flex",
    }}
    className="shadow-md grid grid-cols-2"
    cover={
      <img
        className="object-scale-down h-48 w-24"
        alt={productName}
        src={image}
      />
    }
  >
    <p className="text-lg font-bold">{productName}</p>
    <div className=" ">
      <span className="flex">
        <p className="font-bold text-lg text-red-600 pr-3">${actualPrice}</p>
        <p className="font-bold text-lg text-secondary-text line-through">${previousPrice}</p>
      </span>
      <p className="py-2 text-base">{description}</p>
      <p className="text-sm">Valido hasta: {duration}</p>
    </div>
    
  </Card>
);
export default OfferCardStore;
