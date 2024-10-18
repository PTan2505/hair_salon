import React, { createContext, useEffect, useState } from "react";
import {
  addService,
  addServiceType,
  deleteService,
  deleteServiceType,
  editService,
  editServiceType,
  fetchServices,
  fetchServicesType,
} from "../apiService/ServiceAPI";
import { SERVICE_FIELDS, TYPE_FIELDS } from "../shared/constant";

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
  const handleAddServiceType = async (newServiceType) => {
    try {
      await addServiceType(newServiceType);

      const newServicesType = [...servicesType, newServiceType];
      setServicesType(newServicesType);
    } catch (error) {
      console.error("Failed to add new Service Type:", error);
    }
  };

  const handleEditService = async (id, updatedData) => {
    try {
      await editService(id, updatedData);

      const newServices = services.map((service) =>
        service[SERVICE_FIELDS.ID] === id
          ? { ...service, ...updatedData }
          : service
      );
      setServices(newServices);
    } catch (error) {
      console.error("Failed to edit Service:", error);
    }
  };

  const handleEditServiceType = async (id, updatedData) => {
    try {
      await editServiceType(id, updatedData);

      const newServicesType = servicesType.map((type) =>
        type[TYPE_FIELDS.ID] === id ? { ...type, ...updatedData } : type
      );
      setServicesType(newServicesType);
    } catch (error) {
      console.error("Failed to edit Service Type:", error);
    }
  };

  const handleDeleteService = async (id) => {
    try {
      await deleteService(id);

      const updateService = services.map((service) =>
        service[SERVICE_FIELDS.ID] === id
          ? { ...service, is_active: false }
          : service
      );
      setServices(updateService);
    } catch (error) {
      console.error("Failed to delete Service:", error);
    }
  };

  const handleDeleteServiceType = async (id) => {
    try {
      await deleteServiceType(id);

      const updateServiceType = servicesType.map((type) =>
        type[TYPE_FIELDS.ID] === id ? { ...type, is_active: false } : type
      );
      setServicesType(updateServiceType);
    } catch (error) {
      console.error("Failed to delete Service Type:", error);
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
  }, [servicesType]);

  return (
    <ServiceContext.Provider
      value={{
        services,
        servicesType,
        loading,
        handleAddService,
        handleAddServiceType,
        handleEditService,
        handleEditServiceType,
        handleDeleteService,
        handleDeleteServiceType,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
