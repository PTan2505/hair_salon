import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as yup from "yup";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { toastSuccess } from "../shared/toastify";
import Confirm from "../shared/Modal/Confirm";
import { ServiceContext } from "../context/ServiceContext";

const EditService = ({ object, showModal, setShowModal }) => {
  const { servicesType, handleEditServiceType } = useContext(ServiceContext);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = (resetForm) => {
    const changes = Object.keys(formik.values).reduce((acc, key) => {
      if (formik.values[key] !== object[key]) {
        acc[key] = formik.values[key];
      }
      console.log(acc);
      return acc;
    }, {});
    if (Object.keys(changes).length > 0) {
      handleEditServiceType(object.id, changes);
    }
    setShowConfirm(false);
    setShowModal(false);
    resetForm();
    toastSuccess("Edit Service Type Successfully");
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: object.name || "",
      image: object.image || "",
      is_active: object.is_active || false,
    },
    onSubmit: () => {
      setShowConfirm(true);
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("Required.")
        .test("name-exist", "Name is exist", function (value) {
          return value !== object.name
            ? !servicesType.some((type) => type.name === value)
            : true;
        }),
      image: yup
        .string()
        .required("Please select type.")
        .test("image-exist", "Image is exist", function (value) {
          return value !== object.name
            ? !servicesType.some((type) => type.name === value)
            : true;
        }),
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
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Service Type
          </Modal.Title>
        </Modal.Header>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationFormikName">
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
                    {String(formik.errors.name)}
                  </Form.Control.Feedback>
                ) : (
                  <Form.Control.Feedback>Look good!</Form.Control.Feedback>
                )}
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationFormikImage">
                <Form.Label>Image</Form.Label>
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
                    {String(formik.errors.image)}
                  </Form.Control.Feedback>
                ) : (
                  <Form.Control.Feedback>Look good!</Form.Control.Feedback>
                )}
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Check // prettier-ignore
                  type="switch"
                  id="custom-switch"
                  label="Active"
                  onChange={(e) =>
                    formik.setFieldValue("is_active", e.target.checked)
                  }
                  checked={formik.values.is_active}
                />
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setShowModal(false)}>Close</Button>
            <Button type="submit">Save Change</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditService;
