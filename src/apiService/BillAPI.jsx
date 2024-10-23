// BillAPI.js

// Fetch all bills from the API
export const fetchBills = async () => {
  try {
    const response = await fetch(
      "https://66f6699f436827ced97704c4.mockapi.io/bill"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch bills");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching bills:", error);
    throw error;
  }
};

// Add a new bill to the API
export const addBill = async (newBill) => {
  try {
    const response = await fetch(
      "https://66f6699f436827ced97704c4.mockapi.io/bill",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBill),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to add new bill");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding new bill:", error);
    throw error;
  }
};

// Edit an existing bill in the API
export const editBill = async (id, updatedData) => {
  try {
    const response = await fetch(
      `https://66f6699f436827ced97704c4.mockapi.io/bill/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to edit bill");
    }
    return await response.json();
  } catch (error) {
    console.error("Error editing bill:", error);
    throw error;
  }
};

// Delete a bill in the API
export const deleteBill = async (id) => {
  try {
    const response = await fetch(
      `https://66f6699f436827ced97704c4.mockapi.io/bill/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete bill");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting bill:", error);
    throw error;
  }
};

// Update payment status of a bill
export const updateBillPaymentStatus = async (id, updatedStatus) => {
  try {
    const response = await fetch(
      `https://66f6699f436827ced97704c4.mockapi.io/bill/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStatus),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update payment status");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw error;
  }
};
