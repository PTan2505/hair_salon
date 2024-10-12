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
