import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            siderBg: "#023047",
          },
        },
      }}
    >
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
