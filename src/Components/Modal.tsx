import React, { FC, useEffect } from "react";
import "./Modal.css";

const Modal: FC<any> = ({ action, setModal, children }) => {
    // useEffect(() => {
    //     document.body.style.overflow = props.isOpen ? "hidden" : "visible";
    // }, [props.isOpen]);

    return (
        <div className="modal-wrapper">
            <div
                className="modal-background-plate"
                onClick={() => setModal({ id: -1, show: false })}
            />
            <div className="modal-cotent">
                <div>{children}</div>
                <button onClick={() => setModal({ id: -1, show: false })}>
                    Cancel
                </button>
                <button
                    onClick={() => {
                        action();
                        setModal({ id: -1, show: false });
                    }}
                >
                    Yes
                </button>
            </div>
        </div>
    );
};

export default Modal;
