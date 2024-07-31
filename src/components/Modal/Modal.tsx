// Modal.tsx
import React from 'react';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md overflow-y-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <button className="text-2xl" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-2">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
