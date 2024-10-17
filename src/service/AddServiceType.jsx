import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { ServiceContext } from "../context/ServiceContext";
import * as yup from "yup";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import Confirm from "../shared/Modal/Confirm";
import { toastSuccess } from "../shared/toastify";

const AddServiceType = ({ showModal, setShowModal }) => {
  const { servicesType, handleAddServiceType } = useContext(ServiceContext);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = (resetForm) => {
    handleAddServiceType(formik.values);
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
      image: "",
      is_active: true,
    },
    onSubmit: () => {
      setShowConfirm(true);
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("Required.")
        .test("name-exist", "Name is exist", function (value) {
          return !servicesType.some((type) => type.name === value);
        }),
      image: yup
        .string()
        .required("Required.")
        .test("image-exist", "Image is exist", function (value) {
          return !servicesType.some((type) => type.image === value);
        }),
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
            Add New Service Type
          </Modal.Title>
        </Modal.Header>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationFormikName">
                <Form.Label>Service Type Name</Form.Label>
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
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationFormikImage">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Image URL"
                  name="image"
                  value={formik.values.image}
                  onChange={formik.handleChange}
                  isInvalid={formik.touched.image && !!formik.errors.image}
                  isValid={formik.touched.image && !formik.errors.image}
                />
                {formik.errors.image ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.image}
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

export default AddServiceType;
