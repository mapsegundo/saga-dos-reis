import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const DialogContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  border: 1px solid #8b4513;
  padding: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 200px;
  max-height: 100%;
  width: 100%;
  box-sizing: border-box;

  @media (min-height: 900px) {
    min-height: 250px;
  }

  @media (max-width: 768px) {
    min-height: 180px;
    padding: 10px;
  }

  @media (max-width: 480px) {
    min-height: 150px;
  }
`;

const DialogTitle = styled.h3`
  color: #d4af37;
  margin: 0 0 15px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #8b4513;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin: 0 0 10px 0;
    padding-bottom: 8px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin: 0 0 8px 0;
    padding-bottom: 5px;
  }
`;

const DialogContent = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-right: 5px;
  height: 100%;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #8b4513;
    border-radius: 4px;
  }
`;

const DialogEntry = styled.div`
  margin-bottom: 10px;
  animation: fadeIn 0.3s ease;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  border-left: 3px solid #8b4513;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    padding: 8px;
    margin-bottom: 8px;
  }

  @media (max-width: 480px) {
    padding: 6px;
    margin-bottom: 6px;
  }
`;

const DialogSpeaker = styled.div`
  color: #d4af37;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 3px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const DialogText = styled.div`
  color: #f0e6d2;
  line-height: 1.6;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

const EmptyDialogMessage = styled.div`
  color: #aaa;
  font-style: italic;
  text-align: center;
  padding: 20px;
`;

const DialogBox = ({ dialogHistory = [] }) => {
  const dialogContentRef = useRef(null);

  // Rolar para o último diálogo quando novos diálogos são adicionados
  useEffect(() => {
    if (dialogContentRef.current) {
      dialogContentRef.current.scrollTop =
        dialogContentRef.current.scrollHeight;
    }
  }, [dialogHistory]);

  // Verificar se há diálogos para exibir
  const hasDialogs = Array.isArray(dialogHistory) && dialogHistory.length > 0;

  console.log(
    "Renderizando DialogBox com",
    dialogHistory?.length || 0,
    "diálogos"
  );

  return (
    <DialogContainer>
      <DialogTitle>Diálogos</DialogTitle>
      <DialogContent ref={dialogContentRef}>
        {!hasDialogs ? (
          <EmptyDialogMessage>
            Nenhum diálogo ainda... Explore o mundo para interagir com
            personagens.
          </EmptyDialogMessage>
        ) : (
          dialogHistory.map((dialog, index) => (
            <DialogEntry key={index}>
              <DialogSpeaker>{dialog.speaker || "Desconhecido"}:</DialogSpeaker>
              <DialogText>{dialog.text || "..."}</DialogText>
            </DialogEntry>
          ))
        )}
      </DialogContent>
    </DialogContainer>
  );
};

export default DialogBox;
