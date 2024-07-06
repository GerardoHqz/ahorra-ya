import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { TbMapPinFilled } from "react-icons/tb";
import { getStoreImage } from "../api/images";

const StoreCard = ({
  id,
  name,
  description,
  department,
  municipality,
  address,
}) => {
  const token = localStorage.getItem("token");
  const [image, setImage] = useState();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageURL = await getStoreImage(token, id);
        setImage(imageURL);
      } catch (error) {}
    };
    fetchImage();
  }, [id, token]);

  return (
    <Card
      id={id}
      hoverable
      style={{
        width: 300,
        height: 345,
      }}
      className="shadow-md flex flex-col justify-between"
      cover={
        <img className="object-scale-down h-48 w-24" alt={name} src={image} />
      }
    >
      <p className="text-lg ">{name}</p>
      <p className="-mt-2 font-thin">{description}</p>
      <div className="flex flex-col justify-between pt-2">
        <div className="flex items-start gap-2">
          <TbMapPinFilled size={20} />
          <p>
            {address}, {municipality.name}, {department.name}
          </p>
        </div>
      </div>
    </Card>
  );
};
export default StoreCard;
