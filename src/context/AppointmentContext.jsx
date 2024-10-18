import React, { createContext, useState, useEffect } from "react";
import { updateAppointmentStatus } from "../apiService/AppointmentAPI";
import { fetchAppointments } from "../apiService/AppointmentAPI";
import { APPOINTMENT_FIELDS } from "../shared/constant";

export const AppointmentContext = createContext(null);

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
        console.error("Error loading appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();

    const interval = setInterval(() => {
      loadAppointments();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateAppointmentStatus(id, newStatus);

      const updatedAppointments = appointments.map(
        (appointment) =>
          appointment[APPOINTMENT_FIELDS.ID] === id && {
            ...appointment,
            status: newStatus,
          }
      );

      setAppointments(updatedAppointments);
    } catch (error) {
      console.error("Failed to update appointment:", error);
    }
  };

  return (
    <AppointmentContext.Provider
      value={{ appointments, handleStatusUpdate, loading }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
