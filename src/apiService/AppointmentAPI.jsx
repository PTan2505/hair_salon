export const fetchAppointments = async () => {
    try {
        const response = await fetch('https://67066a87a0e04071d226c4b3.mockapi.io/appointments'); // Backend URL
        if (!response.ok) {
            throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw error; // Re-throw so the caller knows it failed
    }
};

// Update appointment status
export const updateAppointmentStatus = async (id, newStatus) => {
    try {
        const response = await fetch(`https://67066a87a0e04071d226c4b3.mockapi.io/appointments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        });
        if (!response.ok) {
            throw new Error('Failed to update appointment status');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating appointment:', error);
        throw error;
    }
};