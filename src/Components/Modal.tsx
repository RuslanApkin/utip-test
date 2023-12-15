import React, { FC, useEffect } from "react";
import "./Modal.css";

const Modal: FC<any> = ({ action, setModal, children }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const onClose = () => {
    setModal({ id: -1, show: false });
    document.body.style.overflow = "visible";
  };

  return (
    <div className="modal-wrapper">
      <div className="modal-background-plate" onClick={onClose} />
      <div className="modal-cotent">
        <div>{children}</div>
        <button onClick={onClose}>Cancel</button>
        <button
          onClick={() => {
            action();
            onClose();
          }}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default Modal;
