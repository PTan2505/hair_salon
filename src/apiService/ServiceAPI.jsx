export const fetchServices = async () => {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzI5NzQ2OTE3LCJleHAiOjE3Mjk4MzMzMTd9.ht7f1OT_UADcnz7q9kATurb72midJ6pPqUYG7HFM004";
  try {
    const response = await fetch("http://localhost:8080/api/admin/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token here
      },
    });

    console.log("API Response Status:", response); // Check response status

    if (!response.ok) {
      throw new Error("Failed to fetch staff");
    }

    const data = await response.json();
    console.log("Fetched service data:", data); // Check the returned data
    return data;
  } catch (error) {
    console.error("Error fetching service:", error);
    throw error;
  }
};

export const fetchServicesType = async () => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/admin/product-types"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch services type");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching services type:", error);
    throw error;
  }
};

export const addService = async (newService) => {
  try {
    const response = await fetch(`http://localhost:8080/api/admin/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newService),
    });
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
      `http://localhost:8080/api/admin/product-types`,
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
      `http://localhost:8080/api/admin/products/${id}`,
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
      `http://localhost:8080/api/admin/product-types/${id}`,
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
      `http://localhost:8080/api/admin/products/${id}`,
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
      `http://localhost:8080/api/admin/product-types/${id}`,
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
