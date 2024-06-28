import React from "react";
import { Card, Collapse } from "antd";
import { TbMapPinFilled } from "react-icons/tb";
import { FiPhone, FiUser } from "react-icons/fi";
import { IoIosLink } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";

const StoreCard = ({
  id,
  name,
  description,
  department,
  municipality,
  address,
}) => {
  
  return (
    <Card
      id={id}
      hoverable
      style={{
        width: 340,
        height: 345,
      }}
      className="shadow-md flex flex-col justify-between"
      cover={
        <img className="object-scale-down h-48 w-24" alt={name} src={name} />
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
