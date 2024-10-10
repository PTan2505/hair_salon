// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { updateAppointmentStatus } from '../apiService/AppointmentAPI';
import { fetchAppointments } from '../apiService/AppointmentAPI';

// Create a Context for the user
export const AppointmentContext = createContext();

// Create a provider component
export const AppointmentProvider = ({ children }) => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const loadAppointments = async () => {
            try {
                const data = await fetchAppointments();
                setAppointments(data);
            } catch (error) {
                console.error('Error loading appointments:', error);
            }
        };

        loadAppointments();

        // Set up a polling interval (e.g., every 10 seconds)
        const interval = setInterval(() => {
            loadAppointments();
        }, 5000); // Fetches every 10 seconds

        // Cleanup the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    const handleStatusUpdate = async (id, newStatus) => {

        try {
            // Call the API to update the appointment status in the backend
            const updatedAppointment = await updateAppointmentStatus(id, newStatus);

            // Once the update is successful, update the local state
            const updatedAppointments = appointments.map(appointment =>
                appointment.id === id ? { ...appointment, status: newStatus } : appointment
            );

            setAppointments(updatedAppointments); // Update the state to reflect changes
        } catch (error) {
            console.error('Failed to update appointment:', error);
        }
    }

    return (
        <AppointmentContext.Provider value={{ appointments, setAppointments, handleStatusUpdate }}>
            {children}
        </AppointmentContext.Provider>
    );
};
