import React, { useContext, useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { StaffContext } from "../context/StaffContext";
import { toastSuccess } from "../shared/toastify";

export default function EditStaff({ showModal, setShowModal, object }) {
  const { handleEditStaff } = useContext(StaffContext);
  const [staffData, setStaffData] = useState({
    name: "",
    role: "",
    email: "",
  });

  useEffect(() => {
    if (object) {
      setStaffData({
        name: object.name,
        role: object.role,
        email: object.email,
      });
    }
  }, [object]);

  const handleChange = (e) => {
    setStaffData({
      ...staffData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleEditStaff(object.id, staffData);
      toastSuccess("Staff Updated Successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Failed to update staff:", error);
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter staff name"
              name="name"
              value={staffData.name}
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
              value={staffData.role}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter staff email"
              name="email"
              value={staffData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Staff
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
