// HomeCustomerContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { fetchServices, fetchReviews } from "./HomeCustomerAPI";

export const HomeCustomerContext = createContext();

export const HomeCustomerProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const servicesData = await fetchServices();
        const reviewsData = await fetchReviews();
        setServices(servicesData);
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <HomeCustomerContext.Provider value={{ services, reviews, loading }}>
      {children}
    </HomeCustomerContext.Provider>
  );
};

// Thêm default export cho HomeCustomerProvider
export default HomeCustomerProvider;
