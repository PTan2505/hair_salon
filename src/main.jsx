import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { CustomerProvider } from './context/CustomerContext';
import { SortProvider } from './context/SortContext.jsx';
import { AppointmentContext, AppointmentProvider } from './context/AppointmentContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomerProvider>
        <AppointmentProvider>
          <SortProvider>
            <App />
          </SortProvider>
        </AppointmentProvider>
      </CustomerProvider>
    </BrowserRouter>
  </React.StrictMode>
)
