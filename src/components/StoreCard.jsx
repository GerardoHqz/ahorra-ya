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
  latitude,
  longitude,
  department,
  municipality,
  address,
  ownerName,
  website,
  phone,
  email,
}) => {
  const contact = [
    {
      key: id,
      label: <h2 className="font-bold">Información de contacto</h2>,
      children: (
        <div className="flex flex-col gap-2 -mt-4">
          {ownerName && (
            <p className="flex items-center gap-2">
              <FiUser size={20} color="#808080" />
              {ownerName}
            </p>
          )}
          {website && (
            <p className="flex items-center gap-2">
              <IoIosLink size={20} color="#808080" />
              {website}
            </p>
          )}
          {phone && (
            <p className="flex items-center gap-2">
              <FiPhone size={20} color="#808080" />
              {phone}
            </p>
          )}
          {email && (
            <p className="flex items-center gap-2">
              <AiOutlineMail size={20} color="#808080" />
              {email}
            </p>
          )}
        </div>
      ),
    },
  ];
  return (
    <Card
      id={id}
      hoverable
      style={{
        width: 290,
        height: "max-content",
      }}
      className="shadow-md"
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
        <div>
          <Collapse defaultActiveKey={["1"]} ghost items={contact} />
        </div>
      </div>
    </Card>
  );
};
export default StoreCard;
