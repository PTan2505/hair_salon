import React, { useContext, useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { StaffContext } from "../context/StaffContext";
import { toastSuccess } from "../shared/toastify";

export default function EditStaff({ showModal, setShowModal, object }) {
  const { updateStaff } = useContext(StaffContext);
  const [staffData, setStaffData] = useState({
    phone: "",
    role: "",
    isStaff: false, // Mặc định là false
  });

  useEffect(() => {
    if (object) {
      setStaffData({
        phone: object.phone,
        role: object.role,
        isStaff: object.isStaff, // Lấy trạng thái từ object
      });
    }
  }, [object]);

  const handleChange = (e) => {
    setStaffData({
      ...staffData,
      [e.target.name]: e.target.value,
    });
  };

  const handleToggleStaff = () => {
    setStaffData((prevData) => ({
      ...prevData,
      isStaff: !prevData.isStaff, // Đảo ngược giá trị của isStaff
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStaff(object.id, staffData);
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
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter staff phone"
              name="phone"
              value={staffData.phone}
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
            <Form.Label>Is Staff</Form.Label>
            <Form.Check
              type="switch"
              id="staff-switch"
              label="Active"
              onChange={handleToggleStaff} // Gọi hàm để thay đổi trạng thái
              checked={staffData.isStaff} // Kiểm tra trạng thái của isStaff
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
