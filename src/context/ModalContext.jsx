import React, { createContext, useState } from "react";

export const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <ModalContext.Provider
      value={{ showModal, showConfirm, setShowConfirm, setShowModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};
