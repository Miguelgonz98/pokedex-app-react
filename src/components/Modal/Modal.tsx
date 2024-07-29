import React from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
        <div className={`modal-overlay__modal-content ${className || ''}`} onClick={e => e.stopPropagation()}
          aria-label="Modal Content">
            {children}
        </div>
    </div>,
    document.body
  );
};