import React, { createContext, useEffect, useState } from "react";
import {
  fetchBills,
  addBill,
  editBill,
  deleteBill,
  updateBillPaymentStatus,
} from "../apiService/BillAPI"; // Ensure these APIs are implemented

export const BillContext = createContext(null);

export const BillProvider = ({ children }) => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAddBill = async (newBill) => {
    try {
      const addedBill = await addBill(newBill);
      setBills((prevBills) => [...prevBills, addedBill]);
    } catch (error) {
      console.error("Failed to add new Bill:", error);
    }
  };

  const handleEditBill = async (id, updatedData) => {
    try {
      const editedBill = await editBill(id, updatedData);
      setBills((prevBills) =>
        prevBills.map((bill) =>
          bill.id === id ? { ...bill, ...editedBill } : bill
        )
      );
    } catch (error) {
      console.error("Failed to edit Bill:", error);
    }
  };

  const handleDeleteBill = async (id) => {
    try {
      await deleteBill(id);
      setBills((prevBills) => prevBills.filter((bill) => bill.id !== id));
    } catch (error) {
      console.error("Failed to delete Bill:", error);
    }
  };

  const handleUpdatePaymentStatus = async (id) => {
    try {
      const updatedBill = await updateBillPaymentStatus(id, { isPaid: true });
      setBills((prevBills) =>
        prevBills.map((bill) =>
          bill.id === id ? { ...bill, isPaid: updatedBill.isPaid } : bill
        )
      );
    } catch (error) {
      console.error("Failed to update payment status:", error);
    }
  };

  useEffect(() => {
    const loadBills = async () => {
      setLoading(true);
      try {
        const billsData = await fetchBills();
        setBills(billsData);
      } catch (error) {
        console.error("Error loading bills:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBills();
  }, []);

  return (
    <BillContext.Provider
      value={{
        bills,
        loading,
        handleAddBill,
        handleEditBill,
        handleDeleteBill,
        handleUpdatePaymentStatus,
      }}
    >
      {children}
    </BillContext.Provider>
  );
};
