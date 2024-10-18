import React from "react";
import { Button, Modal } from "react-bootstrap";
import { splitDate } from "../shared/splitDateTime";
import { CUSTOMER_FIELDS } from "../shared/constant";

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
              <strong>Name</strong> {object[CUSTOMER_FIELDS.ID]}
            </p>
            <p>
              <strong>Sex:</strong> {object[CUSTOMER_FIELDS.SEX]}
            </p>
            <p>
              <strong>Birth Date:</strong>{" "}
              {splitDate(object[CUSTOMER_FIELDS.BIRTH_DATE])}
            </p>
            <p>
              <strong>Email:</strong> {object[CUSTOMER_FIELDS.EMAIL]}
            </p>
            <p>
              <strong>Phone:</strong> {object[CUSTOMER_FIELDS.PHONE]}
            </p>
            <p>
              <strong>Point:</strong> {object[CUSTOMER_FIELDS.POINT]}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {object[CUSTOMER_FIELDS.ACTIVE] ? (
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
