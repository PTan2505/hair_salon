import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { ServiceContext } from "../context/ServiceContext";
import * as yup from "yup";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import Confirm from "../shared/Modal/Confirm";
import { toastSuccess } from "../shared/toastify";

const AddService = ({ showModal, setShowModal }) => {
  const [formValues, setFormValues] = useState(null);
  const { servicesType, handleAddService, services } =
    useContext(ServiceContext);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = (resetForm) => {
    if (formValues) {
      const updatedValues = {
        ...formValues,
        price: Number(formValues.price) * 1000,
      };
      handleAddService(updatedValues);
    }
    setShowConfirm(false);
    setShowModal(false);
    resetForm();
    toastSuccess("Add Service Successfully");
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      price: 0,
      point: 0,
      time: 0,
      is_active: true,
    },
    onSubmit: (values) => {
      setFormValues(values);
      setShowConfirm(true);
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("Required.")
        .test("name-exist", "Name is exist", function (value) {
          return !services.some((service) => service.name === value);
        }),
      type: yup
        .string()
        .required("Please select type.")
        .test("same-none", "Choose an option", function (value) {
          return value !== "none";
        }),
      price: yup
        .number()
        .required("Required.")
        .typeError("Please enter a valid number"),
      point: yup
        .number()
        .required("Required.")
        .typeError("Please enter a valid number"),
      time: yup
        .number()
        .required("Required.")
        .typeError("Please enter a valid number"),
    }),
  });
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
            Add New Service
          </Modal.Title>
        </Modal.Header>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationFormikName">
                <Form.Label>Service Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  isInvalid={formik.touched.name && !!formik.errors.name}
                  isValid={formik.touched.name && !formik.errors.name}
                />
                {formik.errors.name ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.name}
                  </Form.Control.Feedback>
                ) : (
                  <Form.Control.Feedback>Look good!</Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormikType">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  name="type"
                  value={formik.values.type}
                  aria-label="Default select example"
                  onChange={formik.handleChange}
                  isInvalid={formik.touched.type && !!formik.errors.type}
                  isValid={formik.touched.type && !formik.errors.type}
                >
                  <option value={"none"}>-------------</option>
                  {servicesType.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </Form.Select>
                {formik.errors.type ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.type}
                  </Form.Control.Feedback>
                ) : (
                  <Form.Control.Feedback>Look good!</Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormikPrice">
                <Form.Label>Price</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="number"
                    placeholder="Price"
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.price && !!formik.errors.price}
                    isValid={formik.touched.price && !formik.errors.price}
                  />
                  <InputGroup.Text id="inputGroupPrepend">.000</InputGroup.Text>
                  <InputGroup.Text id="inputGroupPrepend">VND</InputGroup.Text>
                  {formik.errors.price ? (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.price}
                    </Form.Control.Feedback>
                  ) : (
                    <Form.Control.Feedback>Look good!</Form.Control.Feedback>
                  )}
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationFormikPoint">
                <Form.Label>Point</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Point"
                  name="point"
                  value={formik.values.point}
                  onChange={formik.handleChange}
                  isInvalid={formik.touched.point && !!formik.errors.point}
                  isValid={formik.touched.point && !formik.errors.point}
                />
                {formik.errors.point ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.point}
                  </Form.Control.Feedback>
                ) : (
                  <Form.Control.Feedback>Look good!</Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationFormikTime">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Time"
                  name="time"
                  value={formik.values.time}
                  onChange={formik.handleChange}
                  isInvalid={formik.touched.time && !!formik.errors.time}
                  isValid={formik.touched.time && !formik.errors.time}
                />
                {formik.errors.time ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.time}
                  </Form.Control.Feedback>
                ) : (
                  <Form.Control.Feedback>Look good!</Form.Control.Feedback>
                )}
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setShowModal(false)}>Close</Button>
            <Button type="submit">Add Service</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddService;
