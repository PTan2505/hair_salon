import { Routes, Route } from "react-router-dom";
import "./App.css";
import AdminNavbar from "./navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Customer from "./customer/Customer";
import Appointment from "./appointment/Appointment";
import React from "react";
import Service from "./service/Service";

function App() {
  return (
    <>
      <AdminNavbar />
      <div className="layout-container">
        <Sidebar role="admin" />
        <div className="main-content">
          <Routes>
            <Route path={"/:endpoint"} element={<Customer />}></Route>
            <Route
              path={"/appointment/:endpoint"}
              element={<Appointment />}
            ></Route>
            <Route path={"/service"} element={<Service />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
