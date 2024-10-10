// UserContext.js
import React, { createContext, useState } from 'react';

// Create a Context for the user
export const CustomerContext = createContext();

// Create a provider component
export const CustomerProvider = ({ children }) => {
    const [customer, setCustomer] = useState(null);

    return (
        <CustomerContext.Provider value={{ customer, setCustomer }}>
            {children}
        </CustomerContext.Provider>
    );
};
