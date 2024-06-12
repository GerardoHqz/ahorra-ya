import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ConfigProvider } from "antd";
import Login from "./pages/Login";
import Map from "./pages/Map";

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            siderBg: "linear-gradient(145deg, rgba(255,68,145,1) 0%, rgba(244,141,1,1) 100%)",
          },
        },
      }}
    >
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/map" element={<Map/>} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
