import React, { useState } from "react";
import styled from "styled-components";
import { useGame } from "../../context/GameContext";

const QuestLogContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuestLogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const QuestLogTitle = styled.h3`
  color: #d4af37;
  margin: 0;
`;

const QuestCount = styled.div`
  font-size: 0.9rem;
  color: #d4af37;
`;

const QuestTabs = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #8b4513;
`;

const QuestTab = styled.button`
  background-color: ${(props) =>
    props.active ? "rgba(139, 69, 19, 0.5)" : "transparent"};
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.active ? "#d4af37" : "transparent")};
  color: ${(props) => (props.active ? "#d4af37" : "#aaa")};
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #d4af37;
  }
`;

const QuestList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const QuestCard = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #8b4513;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    border-color: #d4af37;
  }
`;

const QuestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const QuestName = styled.h4`
  color: #d4af37;
  margin: 0;
`;

const QuestStatus = styled.div`
  font-size: 0.8rem;
  padding: 3px 8px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.completed ? "rgba(46, 204, 113, 0.3)" : "rgba(52, 152, 219, 0.3)"};
  color: ${(props) => (props.completed ? "#2ecc71" : "#3498db")};
  border: 1px solid ${(props) => (props.completed ? "#2ecc71" : "#3498db")};
`;

const QuestDescription = styled.p`
  margin-bottom: 10px;
  font-size: 0.9rem;
`;

const QuestObjective = styled.div`
  font-size: 0.9rem;
  margin-bottom: 10px;
  color: #aaa;
`;

const QuestReward = styled.div`
  font-size: 0.9rem;
  color: #d4af37;
  border-top: 1px solid #8b4513;
  padding-top: 10px;
`;

const EmptyQuests = styled.div`
  text-align: center;
  padding: 30px;
  color: #aaa;
  font-style: italic;
`;

const QuestDetailsModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: #111;
  border: 2px solid #8b4513;
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #8b4513;
  padding-bottom: 10px;
`;

const ModalTitle = styled.h3`
  color: #d4af37;
  margin: 0;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: #d4af37;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`;

const ModalBody = styled.div`
  margin-bottom: 20px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  border-top: 1px solid #8b4513;
  padding-top: 15px;
`;

const ActionButton = styled.button`
  padding: 8px 15px;
  background-color: ${(props) => (props.primary ? "#8B4513" : "transparent")};
  color: #d4af37;
  border: 1px solid #8b4513;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.primary ? "#a0522d" : "rgba(139, 69, 19, 0.3)"};
  }
`;

const QuestLog = () => {
  const { gameState, addDialog } = useGame();
  const [activeTab, setActiveTab] = useState("active");
  const [selectedQuest, setSelectedQuest] = useState(null);

  const activeQuests = gameState.questLog.filter((quest) => !quest.completed);
  const completedQuests = gameState.questLog.filter((quest) => quest.completed);

  const handleQuestClick = (quest) => {
    setSelectedQuest(quest);
  };

  const closeModal = () => {
    setSelectedQuest(null);
  };

  const handleTrackQuest = (quest) => {
    addDialog("Sistema", `Missão em destaque: ${quest.name}`);
    closeModal();
  };

  return (
    <QuestLogContainer>
      <QuestLogHeader>
        <QuestLogTitle>Missões</QuestLogTitle>
        <QuestCount>
          {activeQuests.length} ativa(s), {completedQuests.length} completada(s)
        </QuestCount>
      </QuestLogHeader>

      <QuestTabs>
        <QuestTab
          active={activeTab === "active"}
          onClick={() => setActiveTab("active")}
        >
          Ativas
        </QuestTab>
        <QuestTab
          active={activeTab === "completed"}
          onClick={() => setActiveTab("completed")}
        >
          Completadas
        </QuestTab>
      </QuestTabs>

      {activeTab === "active" &&
        (activeQuests.length === 0 ? (
          <EmptyQuests>Você não tem missões ativas no momento.</EmptyQuests>
        ) : (
          <QuestList>
            {activeQuests.map((quest, index) => (
              <QuestCard key={index} onClick={() => handleQuestClick(quest)}>
                <QuestHeader>
                  <QuestName>{quest.name}</QuestName>
                  <QuestStatus completed={false}>Em Andamento</QuestStatus>
                </QuestHeader>
                <QuestObjective>
                  <strong>Objetivo:</strong> {quest.objective}
                </QuestObjective>
              </QuestCard>
            ))}
          </QuestList>
        ))}

      {activeTab === "completed" &&
        (completedQuests.length === 0 ? (
          <EmptyQuests>Você ainda não completou nenhuma missão.</EmptyQuests>
        ) : (
          <QuestList>
            {completedQuests.map((quest, index) => (
              <QuestCard key={index} onClick={() => handleQuestClick(quest)}>
                <QuestHeader>
                  <QuestName>{quest.name}</QuestName>
                  <QuestStatus completed={true}>Completada</QuestStatus>
                </QuestHeader>
                <QuestObjective>
                  <strong>Objetivo:</strong> {quest.objective}
                </QuestObjective>
              </QuestCard>
            ))}
          </QuestList>
        ))}

      {selectedQuest && (
        <QuestDetailsModal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{selectedQuest.name}</ModalTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>

            <ModalBody>
              <QuestStatus completed={selectedQuest.completed}>
                {selectedQuest.completed ? "Completada" : "Em Andamento"}
              </QuestStatus>

              <QuestDescription>{selectedQuest.description}</QuestDescription>

              <QuestObjective>
                <strong>Objetivo:</strong> {selectedQuest.objective}
              </QuestObjective>

              <QuestReward>
                <strong>Recompensa:</strong> {selectedQuest.reward}
              </QuestReward>
            </ModalBody>

            <ModalActions>
              {!selectedQuest.completed && (
                <ActionButton
                  primary
                  onClick={() => handleTrackQuest(selectedQuest)}
                >
                  Destacar Missão
                </ActionButton>
              )}

              <ActionButton onClick={closeModal}>Fechar</ActionButton>
            </ModalActions>
          </ModalContent>
        </QuestDetailsModal>
      )}
    </QuestLogContainer>
  );
};

export default QuestLog;
