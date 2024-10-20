import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { StaffContext } from "../context/StaffContext";
import { toastSuccess } from "../shared/toastify";

export default function CreateStaff({ showModal, setShowModal }) {
  const { handleAddStaff } = useContext(StaffContext);
  const [newStaff, setNewStaff] = useState({
    name: "",
    phone: "", // Thêm trường SĐT
    email: "",
    gender: "", // Thêm trường giới tính
    role: "", // Thêm trường role
  });

  const handleChange = (e) => {
    setNewStaff({
      ...newStaff,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleAddStaff(newStaff);
      toastSuccess("Staff Added Successfully!");
      setShowModal(false);
      setNewStaff({
        name: "",
        phone: "", // Đặt lại trường SĐT
        email: "",
        gender: "", // Đặt lại trường giới tính
        role: "", // Đặt lại trường role
      });
    } catch (error) {
      console.error("Failed to add staff:", error);
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter staff name"
              name="name"
              value={newStaff.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter staff role"
              name="role"
              value={newStaff.role}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Staff
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
