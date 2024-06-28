import React from "react";
import { Card } from "antd";
const OfferCard = ({
  id,
  productName,
  image,
  storeName,
  actualPrice,
  previousPrice,
  endDate,
}) => (
  <Card
    id={id}
    style={{
      width: 240,
      height: 325,
    }}
    className="shadow-md flex flex-col justify-between"
    cover={
      <img
        className="object-scale-down h-48 w-24"
        alt={productName}
        src={image}
      />
    }
  >
    <p className="text-lg ">{productName}</p>
    <p className="-mt-2 font-thin">{storeName}</p>
    <div className="flex justify-between pt-2">
      <p className="font-bold text-lg text-red-600">${actualPrice}</p>
      <p className="font-bold text-lg line-through">${previousPrice}</p>
    </div>
    <p className="text-sm font-thin text-center">Válido hasta: {endDate}</p>
  </Card>
);
export default OfferCard;
