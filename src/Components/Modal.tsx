import React, { FC, ReactNode, useEffect } from "react";
import "./Modal.css";

interface IModal {
  show: boolean;
  onClose: () => void;
  children?: ReactNode | string;
}

const Modal: FC<IModal> = ({ show, onClose, children }) => {
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
