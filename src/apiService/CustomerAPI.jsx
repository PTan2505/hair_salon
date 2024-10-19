export const fetchCustomers = async () => {
  try {
    const response = await fetch("");
    if (!response.ok) {
      throw new Error("Failed to fetch customers");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const deleteCustomer = async (id) => {
  try {
    const response = await fetch(
      `https://67066a87a0e04071d226c4b3.mockapi.io/customers/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_active: false }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete customer");
    }
    return await response.json();
  } catch (error) {
    console.error("Error delete customer:", error);
    throw error;
  }
};
