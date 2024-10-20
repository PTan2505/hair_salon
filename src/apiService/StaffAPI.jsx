export const fetchStaff = async () => {
  try {
    const response = await fetch(
      "https://67066a87a0e04071d226c4b3.mockapi.io/staff"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch staff");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching staff:", error);
    throw error;
  }
};
export const addStaff = async (newStaff) => {
  try {
    const response = await fetch(
      `https://67066a87a0e04071d226c4b3.mockapi.io/staff`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStaff),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to add new Staff");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding new Staff:", error);
    throw error;
  }
};
export const editStaff = async (id, updatedData) => {
  try {
    const response = await fetch(
      `https://67066a87a0e04071d226c4b3.mockapi.io/staff/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to edit Staff");
    }
    return await response.json();
  } catch (error) {
    console.error("Error editing Staff:", error);
    throw error;
  }
};
export const deleteStaff = async (id) => {
  try {
    const response = await fetch(
      `https://67066a87a0e04071d226c4b3.mockapi.io/staff/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_active: false }), // Hoặc có thể dùng DELETE nếu thực sự muốn xóa
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete staff");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting staff:", error);
    throw error;
  }
};
