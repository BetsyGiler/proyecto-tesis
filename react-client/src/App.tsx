import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login/Login";
import RecoverPassword from "./containers/RecoverPassword/RecoverPassword";
import RestabPassword from "./containers/RestabPassword/RestabPassword";
import SegurCode from "./containers/SegurCode/SegurCode";
import NewPassword from "./containers/NewPassword/NewPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar-clave" element={<RecoverPassword />} />
        <Route path="/restablecer-clave" element={<RestabPassword />} />
        <Route path="/codigo-seguridad" element={<SegurCode />} />
        <Route path="/new-code" element={<NewPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
