import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as yup from "yup";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { toastSuccess } from "../shared/toastify";
import Confirm from "../shared/Modal/Confirm";
import { BillContext } from "../context/BillContext";

const EditBill = ({ object, showModal, setShowModal }) => {
  const [formValues, setFormValues] = useState(null);
  const { services, handleEditBill } = useContext(BillContext);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = (resetForm) => {
    if (formValues) {
      const changes = Object.keys(formValues).reduce((acc, key) => {
        if (formValues[key] !== object[key]) {
          acc[key] = formValues[key];
        }
        return acc;
      }, {});

      if (Object.keys(changes).length > 0) {
        handleEditBill(object.id, changes);
      }
    }
    setShowConfirm(false);
    setShowModal(false);
    resetForm();
    toastSuccess("Bill updated successfully");
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      customerName: object.customerName || "",
      serviceId: object.serviceId || "none",
      totalPrice: Number(object.totalPrice) || 0,
      discount: Number(object.discount) || 0,
      paidAmount: Number(object.paidAmount) || 0,
      isPaid: object.isPaid || false,
    },
    onSubmit: (values) => {
      setFormValues(values);
      setShowConfirm(true);
    },
    validationSchema: yup.object().shape({
      customerName: yup.string().required("Customer name is required."),
      serviceId: yup
        .string()
        .required("Please select a service.")
        .test(
          "select-service",
          "Please choose a valid service",
          function (value) {
            return value !== "none";
          }
        ),
      totalPrice: yup
        .number()
        .required("Total price is required.")
        .typeError("Please enter a valid number"),
      discount: yup
        .number()
        .required("Discount is required.")
        .typeError("Please enter a valid number"),
      paidAmount: yup
        .number()
        .required("Paid amount is required.")
        .typeError("Please enter a valid number"),
    }),
  });

  return (
    <>
      <Confirm
        action={"change"}
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
          <Modal.Title>Edit Bill</Modal.Title>
        </Modal.Header>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="6"
                controlId="validationFormikCustomerName"
              >
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  name="customerName"
                  placeholder="Enter customer name"
                  value={formik.values.customerName}
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched.customerName && !!formik.errors.customerName
                  }
                  isValid={
                    formik.touched.customerName && !formik.errors.customerName
                  }
                />
                {formik.errors.customerName ? (
                  <Form.Control.Feedback type="invalid">
                    {String(formik.errors.customerName)}
                  </Form.Control.Feedback>
                ) : (
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationFormikService">
                <Form.Label>Service</Form.Label>
                <Form.Select
                  name="serviceId"
                  value={formik.values.serviceId}
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched.serviceId && !!formik.errors.serviceId
                  }
                  isValid={formik.touched.serviceId && !formik.errors.serviceId}
                >
                  <option value="none">Choose a service</option>
                  {services && services.length > 0 ? (
                    services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No services available</option>
                  )}
                </Form.Select>
                {formik.errors.serviceId ? (
                  <Form.Control.Feedback type="invalid">
                    {String(formik.errors.serviceId)}
                  </Form.Control.Feedback>
                ) : (
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                )}
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="4"
                controlId="validationFormikTotalPrice"
              >
                <Form.Label>Total Price</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="number"
                    placeholder="Enter total price"
                    name="totalPrice"
                    value={formik.values.totalPrice}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.totalPrice && !!formik.errors.totalPrice
                    }
                    isValid={
                      formik.touched.totalPrice && !formik.errors.totalPrice
                    }
                  />
                  <InputGroup.Text>VND</InputGroup.Text>
                  {formik.errors.totalPrice ? (
                    <Form.Control.Feedback type="invalid">
                      {String(formik.errors.totalPrice)}
                    </Form.Control.Feedback>
                  ) : (
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  )}
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationFormikDiscount">
                <Form.Label>Discount</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="number"
                    placeholder="Enter discount"
                    name="discount"
                    value={formik.values.discount}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.discount && !!formik.errors.discount
                    }
                    isValid={formik.touched.discount && !formik.errors.discount}
                  />
                  <InputGroup.Text>%</InputGroup.Text>
                  {formik.errors.discount ? (
                    <Form.Control.Feedback type="invalid">
                      {String(formik.errors.discount)}
                    </Form.Control.Feedback>
                  ) : (
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  )}
                </InputGroup>
              </Form.Group>

              <Form.Group
                as={Col}
                md="4"
                controlId="validationFormikPaidAmount"
              >
                <Form.Label>Paid Amount</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="number"
                    placeholder="Enter paid amount"
                    name="paidAmount"
                    value={formik.values.paidAmount}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.paidAmount && !!formik.errors.paidAmount
                    }
                    isValid={
                      formik.touched.paidAmount && !formik.errors.paidAmount
                    }
                  />
                  <InputGroup.Text>VND</InputGroup.Text>
                  {formik.errors.paidAmount ? (
                    <Form.Control.Feedback type="invalid">
                      {String(formik.errors.paidAmount)}
                    </Form.Control.Feedback>
                  ) : (
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  )}
                </InputGroup>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Paid"
                  onChange={(e) =>
                    formik.setFieldValue("isPaid", e.target.checked)
                  }
                  checked={formik.values.isPaid}
                />
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setShowModal(false)}>Close</Button>
            <Button type="submit">Save Changes</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditBill;
