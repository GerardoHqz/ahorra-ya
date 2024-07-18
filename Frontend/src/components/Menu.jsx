import React, { useState } from "react";
import { FaUserCircle, FaMapMarkedAlt, FaHeart } from "react-icons/fa";
import { IoStorefront } from "react-icons/io5";
import { MdOutlineLogout, MdLightMode } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

const SideMenu = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  const handleLogout = async () => {
    try {
      await logout(token);
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className="w-max h-screen fixed bg-gradient-to-br from-orange to-pink dark:from-gray-800 dark:to-gray-800 text-white ">
      <div className="flex items-center p-4 gap-3">
        <FaUserCircle size={30} color={"#FFFFFF"}/>
        <div>
          <p>{email}</p>
        </div>
      </div>
      <hr />
      <div className="flex flex-col justify-between h-5/6">
        <div>
          <Link to={"/map"}>
            <div className="flex items-center p-4 gap-3 cursor-pointer hover:bg-orange-300 dark:hover:bg-gray-700">
              <FaMapMarkedAlt size={20} color={"#FFFFFF"}/>
              Mapa
            </div>
          </Link>
          <Link to={"/favorites"}>
            <div className="flex items-center p-4 gap-3 cursor-pointer hover:bg-orange-300 dark:hover:bg-gray-700">
              <FaHeart size={20} color={"#FFFFFF"}/>
              Favoritos
            </div>
          </Link>
          <Link to={"/offers"}>
            <div className="flex items-center p-4 gap-3 cursor-pointer hover:bg-orange-300 dark:hover:bg-gray-700">
              <BiSolidOffer size={20} color={"#FFFFFF"}/>
              Ofertas
            </div>
          </Link>
          <Link to={"/stores"}>
            <div className="flex items-center p-4 gap-3 cursor-pointer hover:bg-orange-300 dark:hover:bg-gray-700">
              <IoStorefront size={20} color={"#FFFFFF"}/>
              Tiendas
            </div>
          </Link>
        </div>
        <div>
          <div
            onClick={handleLogout}
            className="flex items-center p-4 gap-3 cursor-pointer hover:bg-pink-400 dark:hover:bg-gray-700"
          >
            <MdOutlineLogout size={20} color={"#FFFFFF"}/>
            Cerrar sesión
          </div>
          <div
            className="flex items-center p-4 gap-3 cursor-pointer hover:bg-pink-400 dark:hover:bg-gray-700"
            onClick={darkModeHandler}
          >
            <MdLightMode size={20} color={"#FFFFFF"}/>
            Modo claro/oscuro
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
