import axios from "axios";

// Hàm lấy danh sách dịch vụ (ví dụ)
export const fetchServices = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/services");
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

// Hàm lấy danh sách đánh giá (ví dụ)
export const fetchReviews = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/reviews");
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};
