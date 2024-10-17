import React, { createContext, useState, useEffect } from "react";
import { deleteCustomer, fetchCustomers } from "../apiService/CustomerAPI";

export const CustomerContext = createContext(null);

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCustomers = async () => {
      setLoading(true);
      try {
        const data = await fetchCustomers();
        if (JSON.stringify(data) !== JSON.stringify(customers)) {
          setCustomers(data);
        }
      } catch (error) {
        console.error("Error loading customers:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();

    const interval = setInterval(() => {
      loadCustomers();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleDeleteCustomer = async (id) => {
    try {
      await deleteCustomer(id);
      const updatedCustomers = customers.map((customer) =>
        customer.id === id ? { ...customer, is_active: false } : customer
      );

      setCustomers(updatedCustomers);
    } catch (error) {
      console.error("Failed to delete customer:", error);
    }
  };

  return (
    <CustomerContext.Provider
      value={{ customers, setCustomers, handleDeleteCustomer, loading }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
