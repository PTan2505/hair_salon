import React from "react";
import { Button, Modal } from "react-bootstrap";
import { splitDate } from "../splitDateTime";

const CustomerDetail = ({ object, showModal, setShowModal }) => {
  return (
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
  );
};

export default CustomerDetail;
