import React, { createContext, useState, useEffect } from "react";
import {
  fetchStaff,
  addStaff,
  editStaff,
  deleteStaff,
} from "../apiService/StaffAPI.jsx";

// Tạo Context cho Staff
export const StaffContext = createContext(null);

// Provider để bọc các component cần truy cập Staff Context
export const StaffProvider = ({ children }) => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hàm lấy danh sách nhân viên
  const getStaff = async () => {
    setLoading(true);
    try {
      const data = await fetchStaff();
      console.log("Fetched staff data:", data); // Kiểm tra dữ liệu từ API trước khi set vào state
      setStaff(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching staff:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Hàm thêm nhân viên
  const createStaff = async (newStaff) => {
    setLoading(true);
    try {
      const addedStaff = await addStaff(newStaff);
      setStaff((prevStaff) => [...prevStaff, addedStaff]);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Hàm chỉnh sửa nhân viên
  const updateStaff = async (id, updatedData) => {
    setLoading(true);
    try {
      const updatedStaff = await editStaff(id, updatedData);
      setStaff((prevStaff) =>
        prevStaff.map((staff) => (staff.id === id ? updatedStaff : staff))
      );
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xóa nhân viên
  const removeStaff = async (id) => {
    setLoading(true);
    try {
      await deleteStaff(id);
      setStaff((prevStaff) => prevStaff.filter((staff) => staff.id !== id));
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Lấy dữ liệu nhân viên khi component mount
  useEffect(() => {
    console.log("useEffect called: fetching staff data...");
    getStaff();
  }, []);

  return (
    <StaffContext.Provider
      value={{
        staff, // Đây là nơi biến staff từ API được truyền vào context
        loading,
        error,
        getStaff,
        createStaff,
        updateStaff,
        removeStaff,
      }}
    >
      {children}
    </StaffContext.Provider>
  );
};
