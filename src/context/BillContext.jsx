import React, { createContext, useState, useEffect } from "react";
import {
  fetchBills,
  addBill,
  editBill,
  deleteBill,
} from "../apiService/BillAPI"; // Ensure these APIs are implemented

export const BillContext = createContext(null);

export const BillProvider = ({ children }) => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false); // Sửa lại loading thành false ban đầu
  const [error, setError] = useState(null);

  // Hàm lấy danh sách hóa đơn
  const getBills = async () => {
    setLoading(true); // Bắt đầu trạng thái loading
    try {
      const data = await fetchBills();
      console.log("Fetched bills data:", data); // Kiểm tra dữ liệu từ API trước khi set vào state
      setBills(data); // Lưu trữ dữ liệu vào state
      setError(null); // Xóa bất kỳ lỗi nào trước đó
    } catch (error) {
      console.error("Error fetching bills:", error);
      setError(error.message); // Lưu trữ lỗi nếu có
    } finally {
      setLoading(false); // Dừng trạng thái loading
    }
  };

  // Hàm thêm hóa đơn
  const createBill = async (newBill) => {
    setLoading(true); // Bắt đầu trạng thái loading
    try {
      const addedBill = await addBill(newBill);
      setBills((prevBills) => [...prevBills, addedBill]);
      setError(null); // Xóa bất kỳ lỗi nào trước đó
    } catch (error) {
      setError(error.message); // Lưu trữ lỗi nếu có
    } finally {
      setLoading(false); // Dừng trạng thái loading
    }
  };

  // Hàm chỉnh sửa hóa đơn
  const updateBill = async (id, updatedData) => {
    setLoading(true); // Bắt đầu trạng thái loading
    try {
      const updatedBill = await editBill(id, updatedData);
      setBills((prevBills) =>
        prevBills.map((bill) => (bill.id === id ? updatedBill : bill))
      );
      setError(null); // Xóa bất kỳ lỗi nào trước đó
    } catch (error) {
      setError(error.message); // Lưu trữ lỗi nếu có
    } finally {
      setLoading(false); // Dừng trạng thái loading
    }
  };

  // Hàm xóa hóa đơn
  const removeBill = async (id) => {
    setLoading(true); // Bắt đầu trạng thái loading
    try {
      await deleteBill(id);
      setBills((prevBills) => prevBills.filter((bill) => bill.id !== id));
      setError(null); // Xóa bất kỳ lỗi nào trước đó
    } catch (error) {
      setError(error.message); // Lưu trữ lỗi nếu có
    } finally {
      setLoading(false); // Dừng trạng thái loading
    }
  };

  // Lấy dữ liệu hóa đơn khi component mount
  useEffect(() => {
    console.log("useEffect called: fetching bills data...");
    getBills();
  }, []);

  return (
    <BillContext.Provider
      value={{
        bills, // Đây là nơi biến bills từ API được truyền vào context
        loading,
        error,
        getBills,
        createBill,
        updateBill,
        removeBill,
      }}
    >
      {children}
    </BillContext.Provider>
  );
};
