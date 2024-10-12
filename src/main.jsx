import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { CustomerProvider } from "./context/CustomerContext";
import { AppointmentProvider } from "./context/AppointmentContext.jsx";
import { NoticficationProvider } from "./context/NoticficationContext.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <NoticficationProvider>
        {/* <CustomerProvider> */}
        {/* <AppointmentProvider> */}
        <App />
        {/* </AppointmentProvider> */}
        {/* </CustomerProvider> */}
      </NoticficationProvider>
    </BrowserRouter>
  </React.StrictMode>
);
