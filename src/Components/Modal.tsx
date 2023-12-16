import React, { FC, useEffect } from "react";
import "./Modal.css";

const Modal: FC<any> = ({ show, onClose, children }) => {
  useEffect(() => {
    if (show) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "visible";
  }, [show]);

  return show ? (
    <div className="modal-wrapper">
      <div
        className="modal-background-plate"
        onClick={() => {
          onClose();
        }}
      />
      <div className="modal-cotent">
        <div>{children}</div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Modal;
