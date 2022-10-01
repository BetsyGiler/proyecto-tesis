import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login/Login";
import RecoverPassword from "./containers/RecoverPassword/RecoverPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar-clave" element={<RecoverPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
