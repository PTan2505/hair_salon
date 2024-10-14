import React, { createContext, useContext, useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { ModalTypeList, NoticeTypeList } from "../shared/constant";
import { AppointmentContext } from "./AppointmentContext";
import { NoticficationContext } from "./NoticficationContext";
import { AppointmentStatus } from "../shared/status";
import { ServiceContext } from "./ServiceContext";
import { useFormik } from "formik";
import * as yup from "yup";

export const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [object, setObject] = useState(null);
  const [modalType, setModalType] = useState(null);
  const { handleStatusUpdate } = useContext(AppointmentContext);
  const { handleShowNotice } = useContext(NoticficationContext);
  const { servicesType, handleAddService, services } =
    useContext(ServiceContext);
  const ModalType = ModalTypeList;
  const status = AppointmentStatus;
  const noticeType = NoticeTypeList;

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      price: "",
      point: "",
      time: "",
      isActive: true,
    },
    onSubmit: (values, { resetForm }) => {
      handleAddService(values);
      setShowModal(false);
      resetForm();
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

  const handleAppointmentStatusChange = (id, newStatus) => {
    handleStatusUpdate(id, newStatus);
    setShowModal(false);
    newStatus === status.canceled
      ? handleShowNotice(noticeType.red, `Appointment has been ${newStatus}!!!`)
      : newStatus === status.done
      ? handleShowNotice(
          noticeType.green,
          `Appointment has been ${newStatus}!!!`
        )
      : handleShowNotice(
          noticeType.yellow,
          `Appointment has been ${newStatus}!!!`
        );
  };

  const splitDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  };

  const splitTime = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString();
  };

  return (
    <ModalContext.Provider value={{ setObject, setShowModal, setModalType }}>
      {children}
      {modalType === ModalType.customerDetail ? (
        //Customer Detail Modal
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Customer's Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {object && (
              <>
                <p>
                  <strong>Name</strong> {object.name}
                </p>
                <p>
                  <strong>Sex:</strong> {object.sex}
                </p>
                <p>
                  <strong>Birth Date:</strong> {splitDate(object.birth_date)}
                </p>
                <p>
                  <strong>Email:</strong> {object.email}
                </p>
                <p>
                  <strong>Phone:</strong> {object.phone}
                </p>
                <p>
                  <strong>Point:</strong> {object.point}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {object.is_active ? (
                    <span
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        padding: "2px 30px",
                        borderRadius: "1rem",
                      }}
                    >
                      Active
                    </span>
                  ) : (
                    <span
                      style={{
                        backgroundColor: "#cf2626",
                        color: "white",
                        padding: "2px 20px",
                        borderRadius: "1rem",
                      }}
                    >
                      No Active
                    </span>
                  )}
                </p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : modalType === ModalType.appointmentDetail ? (
        //Appointment Detail Modal
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Review Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {object && (
              <>
                <p>
                  <strong>Customer:</strong> {object.customer}
                </p>
                <p>
                  <strong>Stylist:</strong> {object.stylist}
                </p>
                <p>
                  <strong>Date:</strong> {splitDate(object.date)}
                </p>
                <p>
                  <strong>Time:</strong> {splitTime(object.date)}
                </p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            {object && object?.status === false ? (
              <>
                <Button
                  variant="warning"
                  onClick={() => {
                    handleAppointmentStatusChange(object.id, status.accepted);
                  }}
                >
                  Accept
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    handleAppointmentStatusChange(object.id, status.canceled);
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              object?.status === "accepted" && (
                <>
                  <Button
                    variant="success"
                    onClick={() => {
                      handleAppointmentStatusChange(object.id, status.done);
                    }}
                  >
                    Done
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleAppointmentStatusChange(object.id, status.canceled);
                    }}
                  >
                    Cancel
                  </Button>
                </>
              )
            )}
          </Modal.Footer>
        </Modal>
      ) : (
        //Add new service
        modalType === ModalType.addService && (
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
                  <Form.Group as={Col} md="4" controlId="validationFormik01">
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
                  <Form.Group as={Col} md="4" controlId="validationFormik02">
                    <Form.Label>Type</Form.Label>
                    <Form.Select
                      name="type"
                      value={formik.values.type}
                      aria-label="Default select example"
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.type && !!formik.errors.type}
                      isValid={formik.touched.type && !formik.errors.type}
                    >
                      <option value="none">--------</option>
                      {servicesType.map((type) => (
                        <option value={type.id}>{type.name}</option>
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
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormikUsername"
                  >
                    <Form.Label>Price</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="number"
                        placeholder="Price"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        isInvalid={
                          formik.touched.price && !!formik.errors.price
                        }
                        isValid={formik.touched.price && !formik.errors.price}
                      />
                      <InputGroup.Text id="inputGroupPrepend">
                        .000
                      </InputGroup.Text>
                      <InputGroup.Text id="inputGroupPrepend">
                        VND
                      </InputGroup.Text>
                      {formik.errors.price ? (
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.price}
                        </Form.Control.Feedback>
                      ) : (
                        <Form.Control.Feedback>
                          Look good!
                        </Form.Control.Feedback>
                      )}
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationFormik03">
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
                  <Form.Group as={Col} md="6" controlId="validationFormik04">
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
                <Button type="submit">Submit form</Button>
              </Modal.Footer>
            </Form>
          </Modal>
        )
      )}
    </ModalContext.Provider>
  );
};
