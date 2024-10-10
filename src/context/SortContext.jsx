import React, { createContext, useState } from 'react';

// Create the context
export const SortContext = createContext();

// Create a provider component
export function SortProvider({ children }) {
    const [sortOption, setSortOption] = useState('date-asc');

    // Function to change sort option
    const changeSortOption = (option) => {
        setSortOption(option);
    };

    return (
        <SortContext.Provider value={{ sortOption, changeSortOption }}>
            {children}
        </SortContext.Provider>
    );
}

