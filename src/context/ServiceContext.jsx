import React, { createContext, useEffect, useState } from "react";
import {
  addService,
  fetchServices,
  fetchServicesType,
} from "../apiService/ServiceAPI";

export const ServiceContext = createContext(null);

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [servicesType, setServicesType] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAddService = async (newService) => {
    try {
      await addService(newService);

      const newServices = [...services, newService];
      setServices(newServices);
    } catch (error) {
      console.error("Failed to add new Service:", error);
    }
  };

  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      try {
        const serviceData = await fetchServices();
        if (JSON.stringify(serviceData) !== JSON.stringify(services)) {
          setServices(serviceData);
        }
      } catch (error) {
        console.error("Error loading services:", error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, [services]);

  useEffect(() => {
    const loadServicesType = async () => {
      setLoading(true);
      try {
        const serviceTypeData = await fetchServicesType();
        if (JSON.stringify(serviceTypeData) !== JSON.stringify(servicesType)) {
          setServicesType(serviceTypeData);
        }
      } catch (error) {
        console.error("Error loading services type:", error);
      } finally {
        setLoading(false);
      }
    };

    loadServicesType();
  }, []);

  return (
    <ServiceContext.Provider
      value={{ services, handleAddService, loading, servicesType }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
