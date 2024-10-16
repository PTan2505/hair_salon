import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const Confirm = ({ action, showConfirm, onConfirm, onCancel }) => {
  return (
    <Modal
      show={showConfirm}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm the action
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure to {action} it?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onCancel}>No</Button>
        <Button onClick={onConfirm}>Yes</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default Confirm;
