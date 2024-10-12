import React, { createContext, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { AppointmentStatus, CustomerStatus } from "../shared/status";

export const NoticficationContext = createContext(null);

export const NoticficationProvider = ({ children }) => {
  const [showNotice, setShowNotice] = useState(false);
  const [noticeType, setNoticeType] = useState("");
  const [message, setMessage] = useState("");

  const handleShowNotice = (noticeType, message) => {
    setNoticeType(noticeType);
    setMessage(message);
    setShowNotice(true);
  };

  return (
    <NoticficationContext.Provider value={{ handleShowNotice }}>
      {children}
      <ToastContainer
        className="p-3"
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          zIndex: 1000,
        }}
      >
        <Toast
          onClose={() => setShowNotice(false)}
          show={showNotice}
          delay={5000}
          autohide
          bg={noticeType}
        >
          <Toast.Header>
            <strong className="me-auto">Noticfication</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </NoticficationContext.Provider>
  );
};
