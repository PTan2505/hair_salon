// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { updateAppointmentStatus } from '../apiService/AppointmentAPI';
import { fetchAppointments } from '../apiService/AppointmentAPI';

// Create a Context for the user
export const AppointmentContext = createContext();

// Create a provider component
export const AppointmentProvider = ({ children }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAppointments = async () => {
            setLoading(true);
            try {
                const data = await fetchAppointments();
                if (JSON.stringify(data) !== JSON.stringify(appointments)) {
                    setAppointments(data);
                }
            } catch (error) {
                console.error('Error loading appointments:', error);
            } finally {
                setLoading(false);
            }
        };

        loadAppointments();

        const interval = setInterval(() => {
            loadAppointments();
        }, 10000);

        return () => clearInterval(interval);
    }, [appointments]);

    const handleStatusUpdate = async (id, newStatus) => {

        const updatedAppointments = appointments.map(appointment =>
            appointment.id === id ? { ...appointment, status: newStatus } : appointment
        );

        setAppointments(updatedAppointments);

        try {
            await updateAppointmentStatus(id, newStatus);
        } catch (error) {
            console.error('Failed to update appointment:', error);
        }
    }

    return (
        <AppointmentContext.Provider value={{ appointments, setAppointments, handleStatusUpdate, loading }}>
            {children}
        </AppointmentContext.Provider>
    );
};
