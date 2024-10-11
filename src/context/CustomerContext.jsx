// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { deleteCustomer, fetchCustomers } from '../apiService/CustomerAPI';

// Create a Context for the user
export const CustomerContext = createContext();

// Create a provider component
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
                console.error('Error loading customers:', error);
            } finally {
                setLoading(false);
            }
        };

        loadCustomers();


        const interval = setInterval(() => {
            loadCustomers();
        }, 10000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(interval);
    }, [customers]);

    const handleDeleteCustomer = async (id) => {
        const updatedCustomers = customers.map(customer =>
            customer.id === id ? { ...customer, status: false } : customer
        );

        setCustomers(updatedCustomers);

        try {
            await deleteCustomer(id);
        } catch (error) {
            console.error('Failed to delete customer:', error);
        }
    }

    return (
        <CustomerContext.Provider value={{ customers, setCustomers, handleDeleteCustomer, loading }}>
            {children}
        </CustomerContext.Provider>
    );
};
