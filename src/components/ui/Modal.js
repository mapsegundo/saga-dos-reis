import React, { useEffect } from "react";
import styled from "styled-components";
import Portal from "./Portal";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
  padding: 20px;
  pointer-events: auto; // Permite interagir com o modal
`;

const ModalWrapper = styled.div`
  background-color: #111;
  border: 2px solid #8b4513;
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  z-index: 1000000;

  @media (max-width: 768px) {
    width: 95%;
    padding: 15px;
    max-height: 80vh;
  }
`;

const CloseButton = styled.button`
  background-color: #8b4513;
  border: 1px solid #d4af37;
  border-radius: 50%;
  color: #d4af37;
  font-size: 1.5rem;
  cursor: pointer;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: absolute;
  right: 10px;
  top: 10px;

  &:hover {
    background-color: #a0522d;
    color: #fff;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Modal = ({ isOpen, onClose, children, showCloseButton = true }) => {
  // Impedir rolagem do body quando o modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Não renderizar nada se o modal não estiver aberto
  if (!isOpen) return null;

  // Fechar o modal ao clicar no overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Portal>
      <ModalOverlay onClick={handleOverlayClick}>
        <ModalWrapper>
          {showCloseButton && (
            <CloseButton onClick={onClose}>&times;</CloseButton>
          )}
          {children}
        </ModalWrapper>
      </ModalOverlay>
    </Portal>
  );
};

export default Modal;
