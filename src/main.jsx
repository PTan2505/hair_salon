import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { CustomerProvider } from "./context/CustomerContext";
import { AppointmentProvider } from "./context/AppointmentContext.jsx";
import { ServiceProvider } from "./context/ServiceContext.jsx";
import { BillProvider } from "./context/BillContext.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BillProvider>
        <CustomerProvider>
          <AppointmentProvider>
            <ServiceProvider>
              <App />
            </ServiceProvider>
          </AppointmentProvider>
        </CustomerProvider>
      </BillProvider>
    </BrowserRouter>
  </React.StrictMode>
);
