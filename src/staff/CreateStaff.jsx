import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { StaffContext } from "../context/StaffContext";
import * as yup from "yup";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Confirm from "../shared/Modal/Confirm";
import { toastSuccess } from "../shared/toastify";

const AddStaff = ({ showModal, setShowModal, currentUserRole }) => {
  const [formValues, setFormValues] = useState(null);
  const { createStaff } = useContext(StaffContext);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = (resetForm) => {
    if (formValues) {
      const updatedValues = {
        ...formValues,
        phone: formValues.phone.replace(/-/g, ""),
        role: formValues.role === "none" ? null : formValues.role,
      };
      createStaff(updatedValues); // Gọi hành động thêm staff
    }
    setShowConfirm(false); // Đóng confirm modal
    setShowModal(false); // Đóng add staff modal
    resetForm(); // Reset form sau khi submit thành công
    toastSuccess("Add Staff Successfully");
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const formik = useFormik({
    initialValues: {
      phone: "",
      role: "none",
    },
    onSubmit: (values) => {
      console.log("Submitting form values:", values);
      setFormValues(values);
      setShowConfirm(true);
    },

    validationSchema: yup.object().shape({
      phone: yup
        .string()
        .required("Phone number is required.")
        .matches(/^[0-9]+$/, "Phone number must only contain digits")
        .min(10, "Phone number must be at least 10 digits"),
      role: yup
        .string()
        .required("Please select role.")
        .test("role-not-none", "Choose a valid role", function (value) {
          return value !== "none";
        }),
    }),
  });

  // Function to determine available roles based on the current user's role
  const getAvailableRoles = () => {
    if (currentUserRole === "SUPER_USER") {
      return [
        { value: "stylist", label: "Stylist" },
        { value: "cashier", label: "Cashier" },
        { value: "manager", label: "Manager" },
      ];
    } else if (currentUserRole === "MANAGER") {
      return [
        { value: "stylist", label: "Stylist" },
        { value: "cashier", label: "Cashier" },
      ];
    } else {
      return []; // No roles available for other types of users (if needed)
    }
  };

  return (
    <>
      <Confirm
        action={"add"}
        showConfirm={showConfirm}
        onConfirm={() => handleConfirm(formik.resetForm)}
        onCancel={handleCancel}
      />
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Staff
          </Modal.Title>
        </Modal.Header>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationFormikPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  isInvalid={formik.touched.phone && !!formik.errors.phone}
                  isValid={formik.touched.phone && !formik.errors.phone}
                />
                {formik.errors.phone ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.phone}
                  </Form.Control.Feedback>
                ) : (
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group as={Col} controlId="validationFormikRole">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  name="role"
                  value={formik.values.role}
                  aria-label="Select role"
                  onChange={formik.handleChange}
                  isInvalid={formik.touched.role && !!formik.errors.role}
                  isValid={formik.touched.role && !formik.errors.role}
                >
                  <option value={"none"}>-------------</option>
                  {getAvailableRoles().map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </Form.Select>
                {formik.errors.role ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.role}
                  </Form.Control.Feedback>
                ) : (
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                )}
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setShowModal(false)}>Close</Button>
            <Button type="submit">Add Staff</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddStaff;
