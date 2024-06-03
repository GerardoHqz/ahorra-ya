import React, { useState } from "react";
import { FaUserCircle, FaHome, FaMapMarkedAlt } from "react-icons/fa";
import { MdOutlineLogout, MdLightMode, MdDarkMode } from "react-icons/md";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
const { Sider } = Layout;

const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (url)=> {
    navigate(`${url}`)
  }

  const items = [
    {
      key: "inicio",
      icon: <FaHome />,
      label: "Inicio",
      textColor: dark ? "text-white" : "text-black",
      iconColor: dark ? "white" : "black",
    },
    {
      key: "mapa",
      icon: <FaMapMarkedAlt />,
      label: "Mapa",
      textColor: dark ? "text-white" : "text-black",
      iconColor: dark ? "white" : "black",
    },
  ];

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <Sider
      className="flex flex-col"
      theme={dark ? "dark" : "light"}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="flex m-4 gap-3 items-center justify-center">
        <FaUserCircle size={20} />
        <div className={`${collapsed ? "hidden" : "block"}`}>
          <h1 className="font-bold">Nombre usuario</h1>
          <p>correo@usuario.com</p>
        </div>
      </div>
      <hr />
      <Menu
        className="bg-white dark:bg-dark-blue"
        defaultSelectedKeys={["inicio"]}
        mode="inline"
        theme={dark ? "dark" : "light"}
      >
        {items.map((item) => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            className={`${item.textColor}`}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
      <div className="flex flex-col h-4/6 mt-12 justify-end m-4 gap-6">
        <div 
          className={`flex gap-3 ${collapsed ? "justify-center" : ""}`}
          onClick={()=>{handleNavigation("/login")}}  
        >
          <MdOutlineLogout size={20} />
          <p className={`${collapsed ? "hidden" : "block"}`}>Cerrar sesión</p>
        </div>
        <button
          onClick={() => darkModeHandler()}
          className={`flex gap-3 ${collapsed ? "justify-center" : ""}`}
        >
          {dark ? (
            <div className={`flex gap-3 ${collapsed ? "justify-center" : ""}`}>
              <MdLightMode size={20} />{" "}
              <p className={`${collapsed ? "hidden" : "block"}`}>Modo claro</p>
            </div>
          ) : (
            <div className="flex gap-3">
              <MdDarkMode size={20} />{" "}
              <p className={`${collapsed ? "hidden" : "block"}`}>Modo oscuro</p>
            </div>
          )}
        </button>
      </div>
    </Sider>
  );
};

export default SideMenu;
