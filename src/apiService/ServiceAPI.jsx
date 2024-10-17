export const fetchServices = async () => {
  try {
    const response = await fetch(
      "https://67066a87a0e04071d226c4b3.mockapi.io/services"
    ); // Backend URL
    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error; // Re-throw so the caller knows it failed
  }
};

export const fetchServicesType = async () => {
  try {
    const response = await fetch(
      "https://67066a87a0e04071d226c4b3.mockapi.io/servicesType"
    ); // Backend URL
    if (!response.ok) {
      throw new Error("Failed to fetch services type");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching services type:", error);
    throw error; // Re-throw so the caller knows it failed
  }
};

export const addService = async (newService) => {
  try {
    const response = await fetch(
      `https://67066a87a0e04071d226c4b3.mockapi.io/services`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newService),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to add new Service");
    }
    return await response.json();
  } catch (error) {
    console.error("Error add new Service:", error);
    throw error;
  }
};

export const addServiceType = async (newServiceType) => {
  try {
    const response = await fetch(
      `https://67066a87a0e04071d226c4b3.mockapi.io/servicesType`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newServiceType),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to add new Service type");
    }
    return await response.json();
  } catch (error) {
    console.error("Error add new Service type:", error);
    throw error;
  }
};

export const editService = async (id, updatedData) => {
  try {
    const response = await fetch(
      `https://67066a87a0e04071d226c4b3.mockapi.io/services/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to edit Service");
    }
    return await response.json();
  } catch (error) {
    console.error("Error edit Service:", error);
    throw error;
  }
};

export const editServiceType = async (id, updatedData) => {
  try {
    const response = await fetch(
      `https://67066a87a0e04071d226c4b3.mockapi.io/servicesType/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to edit Service Type");
    }
    return await response.json();
  } catch (error) {
    console.error("Error edit Service Type:", error);
    throw error;
  }
};

export const deleteService = async (id) => {
  try {
    const response = await fetch(
      `https://67066a87a0e04071d226c4b3.mockapi.io/services/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_active: false }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete service");
    }
    return await response.json();
  } catch (error) {
    console.error("Error delete service:", error);
    throw error;
  }
};

export const deleteServiceType = async (id) => {
  try {
    const response = await fetch(
      `https://67066a87a0e04071d226c4b3.mockapi.io/servicesType/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_active: false }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete service type");
    }
    return await response.json();
  } catch (error) {
    console.error("Error delete service type:", error);
    throw error;
  }
};
