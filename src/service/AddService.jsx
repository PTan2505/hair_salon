import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { ServiceContext } from "../context/ServiceContext";
import * as yup from "yup";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import Confirm from "../shared/Modal/Confirm";
import { toastSuccess } from "../shared/toastify";
import { SERVICE_FIELDS, TYPE_FIELDS } from "../shared/constant";

const AddService = ({ showModal, setShowModal }) => {
  const [formValues, setFormValues] = useState(null);
  const { servicesType, handleAddService, services } =
    useContext(ServiceContext);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = (resetForm) => {
    if (formValues) {
      const updatedValues = {
        ...formValues,
        [SERVICE_FIELDS.PRICE]: Number(formValues[SERVICE_FIELDS.PRICE]) * 1000,
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
      [SERVICE_FIELDS.NAME]: "",
      [SERVICE_FIELDS.TYPE]: "",
      [SERVICE_FIELDS.PRICE]: 0,
      [SERVICE_FIELDS.POINT]: 0,
      [SERVICE_FIELDS.TIME]: 0,
      [SERVICE_FIELDS.ACTIVE]: true,
    },
    onSubmit: (values) => {
      setFormValues(values);
      setShowConfirm(true);
    },
    validationSchema: yup.object().shape({
      [SERVICE_FIELDS.NAME]: yup
        .string()
        .required("Required.")
        .test("name-exist", "Name already exists", function (value) {
          return !services.some(
            (service) => service[SERVICE_FIELDS.NAME] === value
          );
        }),
      [SERVICE_FIELDS.TYPE]: yup
        .string()
        .required("Please select type.")
        .test("same-none", "Choose an option", function (value) {
          return value !== "none";
        }),
      [SERVICE_FIELDS.PRICE]: yup
        .number()
        .required("Required.")
        .typeError("Please enter a valid number"),
      [SERVICE_FIELDS.POINT]: yup
        .number()
        .required("Required.")
        .typeError("Please enter a valid number"),
      [SERVICE_FIELDS.TIME]: yup
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
                  name={SERVICE_FIELDS.NAME}
                  placeholder="Name"
                  // @ts-ignore
                  value={formik.values[SERVICE_FIELDS.NAME]}
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched[SERVICE_FIELDS.NAME] &&
                    !!formik.errors[SERVICE_FIELDS.NAME]
                  }
                  isValid={
                    formik.touched[SERVICE_FIELDS.NAME] &&
                    !formik.errors[SERVICE_FIELDS.NAME]
                  }
                />
                {formik.errors[SERVICE_FIELDS.NAME] ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors[SERVICE_FIELDS.NAME]}
                  </Form.Control.Feedback>
                ) : (
                  <Form.Control.Feedback>Look good!</Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormikType">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  name={SERVICE_FIELDS.TYPE}
                  // @ts-ignore
                  value={formik.values[SERVICE_FIELDS.TYPE]}
                  aria-label="Default select example"
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched[SERVICE_FIELDS.TYPE] &&
                    !!formik.errors[SERVICE_FIELDS.TYPE]
                  }
                  isValid={
                    formik.touched[SERVICE_FIELDS.TYPE] &&
                    !formik.errors[SERVICE_FIELDS.TYPE]
                  }
                >
                  <option value={"none"}>-------------</option>
                  {servicesType.map((type) => (
                    <option
                      key={type[TYPE_FIELDS.ID]}
                      value={type[TYPE_FIELDS.ID]}
                    >
                      {type[SERVICE_FIELDS.NAME]}
                    </option>
                  ))}
                </Form.Select>
                {formik.errors[SERVICE_FIELDS.TYPE] ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors[SERVICE_FIELDS.TYPE]}
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
                    name={SERVICE_FIELDS.PRICE}
                    // @ts-ignore
                    value={formik.values[SERVICE_FIELDS.PRICE]}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched[SERVICE_FIELDS.PRICE] &&
                      !!formik.errors[SERVICE_FIELDS.PRICE]
                    }
                    isValid={
                      formik.touched[SERVICE_FIELDS.PRICE] &&
                      !formik.errors[SERVICE_FIELDS.PRICE]
                    }
                  />
                  <InputGroup.Text id="inputGroupPrepend">.000</InputGroup.Text>
                  <InputGroup.Text id="inputGroupPrepend">VND</InputGroup.Text>
                  {formik.errors[SERVICE_FIELDS.PRICE] ? (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors[SERVICE_FIELDS.PRICE]}
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
                  name={SERVICE_FIELDS.POINT}
                  // @ts-ignore
                  value={formik.values[SERVICE_FIELDS.POINT]}
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched[SERVICE_FIELDS.POINT] &&
                    !!formik.errors[SERVICE_FIELDS.POINT]
                  }
                  isValid={
                    formik.touched[SERVICE_FIELDS.POINT] &&
                    !formik.errors[SERVICE_FIELDS.POINT]
                  }
                />
                {formik.errors[SERVICE_FIELDS.POINT] ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors[SERVICE_FIELDS.POINT]}
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
                  name={SERVICE_FIELDS.TIME}
                  // @ts-ignore
                  value={formik.values[SERVICE_FIELDS.TIME]}
                  onChange={formik.handleChange}
                  isInvalid={
                    formik.touched[SERVICE_FIELDS.TIME] &&
                    !!formik.errors[SERVICE_FIELDS.TIME]
                  }
                  isValid={
                    formik.touched[SERVICE_FIELDS.TIME] &&
                    !formik.errors[SERVICE_FIELDS.TIME]
                  }
                />
                {formik.errors[SERVICE_FIELDS.TIME] ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors[SERVICE_FIELDS.TIME]}
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
