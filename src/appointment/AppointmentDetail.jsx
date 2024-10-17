import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { Bounce, toast } from "react-toastify";
import { AppointmentContext } from "../context/AppointmentContext";
import { AppointmentStatus } from "../shared/status";
import { splitDate, splitTime } from "../shared/splitDateTime";

const AppointmentDetail = ({ object, showModal, setShowModal }) => {
  const { handleStatusUpdate } = useContext(AppointmentContext);
  const status = AppointmentStatus;

  const handleAppointmentStatusChange = (id, newStatus) => {
    handleStatusUpdate(id, newStatus);
    setShowModal(false);
    let message;
    newStatus === status.canceled
      ? (message = "Appointment is canceled")
      : newStatus === status.done
      ? (message = "Appointment is done")
      : (message = "Appointment is accepted");

    toast.success(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  return (
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
  );
};

export default AppointmentDetail;
