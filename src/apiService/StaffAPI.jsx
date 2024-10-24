export const fetchStaff = async () => {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzI5NzUxMDc5LCJleHAiOjE3Mjk4Mzc0Nzl9.eUa5cim-fE3Pfle1OuQZW1JEoRtUodLoqSFortB4StIeyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzI5NzUxMTk3LCJleHAiOjE3Mjk4Mzc1OTd9.q1Ok1ZRMfveCowb0Chwyvj42B_B9zN0Z3nkFPu5Te0M";
  try {
    const response = await fetch("http://localhost:8080/api/admin/staffs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token here
      },
    });

    console.log("API Response Status:", response.status); // Check response status

    if (!response.ok) {
      throw new Error("Failed to fetch staff");
    }

    const data = await response.json();
    console.log("Fetched staff data:", data); // Check the returned data
    return data;
  } catch (error) {
    console.error("Error fetching staff:", error);
    throw error;
  }
};

export const addStaff = async (newStaff) => {
  try {
    const response = await fetch(`http://localhost:8080/api/admin/staffs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStaff),
    });
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
      `http://localhost:8080/api/admin/staffs/${id}`,
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
      `http://localhost:8080/api/admin/staffs/${id}`,
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
