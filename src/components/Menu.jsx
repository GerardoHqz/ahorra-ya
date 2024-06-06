import React, { useState } from "react";
import { FaUserCircle, FaHome, FaMapMarkedAlt } from "react-icons/fa";
import { MdOutlineLogout, MdLightMode } from "react-icons/md";
import { Link } from "react-router-dom";

const SideMenu = () => {
  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="w-max h-screen bg-gradient-to-br from-orange-400 to bg-pink-500 dark:from-gray-800 dark:to-gray-800 dark:text-white">
      <div className="flex items-center p-4 gap-3">
        <FaUserCircle size={30} />
        <div>
          <p className="font-bold">Nombre usuario</p>
          <p>correo@usuario.com</p>
        </div>
      </div>
      <hr />
      <div className="flex flex-col justify-between h-5/6">
        <div>
          <Link to={"/home"}>
            <div className="flex items-center p-4 gap-3 cursor-pointer hover:bg-orange-300 dark:hover:bg-gray-700">
              <FaHome size={20} />
              Inicio
            </div>
          </Link>
          <Link to={"/map"}>
            <div className="flex items-center p-4 gap-3 cursor-pointer hover:bg-orange-300 dark:hover:bg-gray-700">
              <FaMapMarkedAlt size={20} />
              Mapa
            </div>
          </Link>
        </div>
        <div>
          <div className="flex items-center p-4 gap-3 cursor-pointer hover:bg-pink-400 dark:hover:bg-gray-700">
            <MdOutlineLogout size={20} />
            Cerrar sesión
          </div>
          <div
            className="flex items-center p-4 gap-3 cursor-pointer hover:bg-pink-400 dark:hover:bg-gray-700"
            onClick={darkModeHandler}
          >
            <MdLightMode size={20} />
            Modo claro/oscuro
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
