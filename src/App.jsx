import { Routes, Route } from "react-router-dom";
import "./App.css";
import AdminNavbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import Customer from "./customer/Customer";
import Appointment from "./appointment/Appointment";
import React from "react";
import Service from "./service/Service";
import Bill from "./bill/Bill";
import ServiceType from "./service/ServiceType";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            <Route path={"/bill"} element={<Bill />}></Route>
            <Route path={"/service"} element={<Service />}></Route>
            <Route path={"/serviceType"} element={<ServiceType />}></Route>
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
