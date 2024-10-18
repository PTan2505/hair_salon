import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { AppointmentContext } from "../context/AppointmentContext";
import { AppointmentStatus } from "../shared/status";
import { splitDate, splitTime } from "../shared/splitDateTime";
import { APPOINTMENT_FIELDS } from "../shared/constant";
import { toastSuccess } from "../shared/toastify";

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
    toastSuccess(message);
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
              <strong>Customer:</strong> {object[APPOINTMENT_FIELDS.CUSTOMER]}
            </p>
            <p>
              <strong>Stylist:</strong> {object[APPOINTMENT_FIELDS.STYLIST]}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {splitDate(object[APPOINTMENT_FIELDS.DATE_TIME])}
            </p>
            <p>
              <strong>Time:</strong>{" "}
              {splitTime(object[APPOINTMENT_FIELDS.DATE_TIME])}
            </p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        {object && object[APPOINTMENT_FIELDS.STATUS] === false ? (
          <>
            <Button
              variant="warning"
              onClick={() => {
                handleAppointmentStatusChange(
                  object[APPOINTMENT_FIELDS.ID],
                  status.accepted
                );
              }}
            >
              Accept
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleAppointmentStatusChange(
                  object[APPOINTMENT_FIELDS.ID],
                  status.canceled
                );
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
                  handleAppointmentStatusChange(
                    object[APPOINTMENT_FIELDS.ID],
                    status.done
                  );
                }}
              >
                Done
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleAppointmentStatusChange(
                    object[APPOINTMENT_FIELDS.ID],
                    status.canceled
                  );
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
