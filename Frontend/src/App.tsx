import React from "react";
import { Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import Login from "./pages/Login";
import Map from "./pages/Map";
import SetPassword from "./pages/SetPassword";
import Favorites from "./pages/Favorites";
import Stores from "./pages/Stores";
import Offers from "./pages/Offers";

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            siderBg:
              "linear-gradient(145deg, rgba(255,68,145,1) 0%, rgba(244,141,1,1) 100%)",
          },
        },
      }}
    >
      <Routes>
        <Route index element={<Login />} />
        <Route path="/signin" element={<SetPassword />} />
        <Route path="/map" element={<Map />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="stores" element={<Stores />} />
        <Route path="/offers" element={<Offers />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
