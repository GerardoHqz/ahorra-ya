import React from "react";
import { Card } from "antd";
const OfferCard = ({
  id,
  productName,
  image,
  storeName,
  actualPrice,
  previousPrice,
}) => (
  <Card
    id={id}
    hoverable
    style={{
      width: 240,
      height: 315,
    }}
    className="shadow-md"
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
  </Card>
);
export default OfferCard;
