import React from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";

export const CommonModal = ({
  children,
  buttonText,
  buttonIcon,
  width,
  className,
  isOpen,
  onClose,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "606px",
      border: "none",
      borderRadius: "22px",
      zIndex: "50",
      background: "rgb(107 114 128)",
      color: "white",
    },
  };

  return (
    <>
      <Modal style={customStyles} isOpen={isOpen} onRequestClose={onClose}>
        <button onClick={onClose} className="flex justify-end w-full">
          <AiOutlineClose size={20} />
        </button>
        {children}
      </Modal>
    </>
  );
};
