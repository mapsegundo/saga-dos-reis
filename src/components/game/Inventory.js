import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useGame } from "../../context/GameContext";
import Modal from "../ui/Modal";

const InventoryContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InventoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const InventoryTitle = styled.h3`
  color: #d4af37;
  margin: 0;
`;

const InventoryCount = styled.div`
  font-size: 0.9rem;
  color: #d4af37;
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
`;

const ItemCard = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #8b4513;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    border-color: #d4af37;
  }
`;

const ItemName = styled.div`
  font-size: 1rem;
  color: #d4af37;
  margin-bottom: 5px;
  text-align: center;
`;

const ItemType = styled.div`
  font-size: 0.8rem;
  color: #aaa;
  margin-bottom: 8px;
  text-align: center;
`;

const ItemDescription = styled.div`
  font-size: 0.8rem;
  margin-top: 8px;
  border-top: 1px solid #8b4513;
  padding-top: 8px;
`;

const ItemDetail = styled.div`
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
`;

const ItemDetailLabel = styled.span`
  color: #d4af37;
`;

const ItemDetailValue = styled.span``;

const ItemActions = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const ItemButton = styled.button`
  background-color: transparent;
  border: 1px solid #8b4513;
  color: #d4af37;
  padding: 5px 10px;
  font-size: 0.8rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgba(139, 69, 19, 0.3);
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #8b4513;
  padding-bottom: 10px;
  margin-top: 30px;
`;

const ModalTitle = styled.h3`
  color: #d4af37;
  margin: 0;
`;

const ModalBody = styled.div`
  margin-bottom: 20px;
  margin-top: 30px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  border-top: 1px solid #8b4513;
  padding-top: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  padding: 10px 15px;
  background-color: ${(props) => (props.primary ? "#8B4513" : "transparent")};
  color: #d4af37;
  border: 1px solid #8b4513;
  border-radius: 4px;
  cursor: pointer;
  min-width: 120px;
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.primary ? "#a0522d" : "rgba(139, 69, 19, 0.3)"};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 5px;
  }
`;

const EmptyInventory = styled.div`
  text-align: center;
  padding: 30px;
  color: #aaa;
  font-style: italic;
`;

const Inventory = () => {
  const {
    player,
    addToInventory,
    removeFromInventory,
    equipItem,
    unequipItem,
    addDialog,
    heal,
    recoverMana,
  } = useGame();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleUseItem = (item) => {
    if (item.type === "consumable") {
      if (item.effect === "heal") {
        // Lógica para usar poção de cura - chamar a função heal do contexto do jogo
        console.log(
          `Usando poção de cura: valor=${item.value}, vida atual=${player.health}`
        );
        heal(item.value);
        addDialog(
          "Sistema",
          `Você usou ${item.name} e recuperou ${item.value} pontos de vida.`
        );
      } else if (item.effect === "mana") {
        // Lógica para usar poção de mana - chamar a função recoverMana do contexto do jogo
        console.log(
          `Usando poção de mana: valor=${item.value}, mana atual=${player.mana}`
        );
        recoverMana(item.value);
        addDialog(
          "Sistema",
          `Você usou ${item.name} e recuperou ${item.value} pontos de mana.`
        );
      }

      // Remover item após uso
      removeFromInventory(item.id);
      closeModal();
    }
  };

  const handleEquipItem = (item) => {
    if (["weapon", "armor", "accessory"].includes(item.type)) {
      equipItem(item);
      addDialog("Sistema", `Você equipou ${item.name}.`);
      closeModal();
    }
  };

  const handleDropItem = (item) => {
    removeFromInventory(item.id);
    addDialog("Sistema", `Você descartou ${item.name}.`);
    closeModal();
  };

  return (
    <InventoryContainer>
      <InventoryHeader>
        <InventoryTitle>Inventário</InventoryTitle>
        <InventoryCount>{player.inventory.length} item(s)</InventoryCount>
      </InventoryHeader>

      {player.inventory.length === 0 ? (
        <EmptyInventory>Seu inventário está vazio.</EmptyInventory>
      ) : (
        <ItemsGrid>
          {player.inventory.map((item, index) => (
            <ItemCard key={index} onClick={() => handleItemClick(item)}>
              <ItemName>{item.name}</ItemName>
              <ItemType>
                {item.type === "weapon" && "Arma"}
                {item.type === "armor" && "Armadura"}
                {item.type === "accessory" && "Acessório"}
                {item.type === "consumable" && "Consumível"}
                {item.type === "ammo" && "Munição"}
                {item.type === "quest" && "Item de Missão"}
              </ItemType>

              {item.type === "weapon" && (
                <ItemDetail>
                  <ItemDetailLabel>Dano:</ItemDetailLabel>
                  <ItemDetailValue>{item.damage}</ItemDetailValue>
                </ItemDetail>
              )}

              {item.type === "armor" && (
                <ItemDetail>
                  <ItemDetailLabel>Defesa:</ItemDetailLabel>
                  <ItemDetailValue>{item.defense}</ItemDetailValue>
                </ItemDetail>
              )}

              {item.type === "consumable" && (
                <ItemDetail>
                  <ItemDetailLabel>Efeito:</ItemDetailLabel>
                  <ItemDetailValue>
                    {item.effect === "heal" && `+${item.value} Vida`}
                    {item.effect === "mana" && `+${item.value} Mana`}
                  </ItemDetailValue>
                </ItemDetail>
              )}

              {item.amount > 1 && (
                <ItemDetail>
                  <ItemDetailLabel>Quantidade:</ItemDetailLabel>
                  <ItemDetailValue>{item.amount}</ItemDetailValue>
                </ItemDetail>
              )}
            </ItemCard>
          ))}
        </ItemsGrid>
      )}

      <Modal isOpen={selectedItem !== null} onClose={closeModal}>
        <ModalHeader>
          <ModalTitle>{selectedItem?.name}</ModalTitle>
        </ModalHeader>

        <ModalBody>
          {selectedItem && (
            <>
              <ItemType>
                {selectedItem.type === "weapon" && "Arma"}
                {selectedItem.type === "armor" && "Armadura"}
                {selectedItem.type === "accessory" && "Acessório"}
                {selectedItem.type === "consumable" && "Consumível"}
                {selectedItem.type === "ammo" && "Munição"}
                {selectedItem.type === "quest" && "Item de Missão"}
              </ItemType>

              <ItemDescription>{selectedItem.description}</ItemDescription>

              {selectedItem.type === "weapon" && (
                <ItemDetail>
                  <ItemDetailLabel>Dano:</ItemDetailLabel>
                  <ItemDetailValue>{selectedItem.damage}</ItemDetailValue>
                </ItemDetail>
              )}

              {selectedItem.type === "armor" && (
                <ItemDetail>
                  <ItemDetailLabel>Defesa:</ItemDetailLabel>
                  <ItemDetailValue>{selectedItem.defense}</ItemDetailValue>
                </ItemDetail>
              )}

              {selectedItem.type === "consumable" && (
                <ItemDetail>
                  <ItemDetailLabel>Efeito:</ItemDetailLabel>
                  <ItemDetailValue>
                    {selectedItem.effect === "heal" &&
                      `+${selectedItem.value} Vida`}
                    {selectedItem.effect === "mana" &&
                      `+${selectedItem.value} Mana`}
                  </ItemDetailValue>
                </ItemDetail>
              )}

              {selectedItem.amount > 1 && (
                <ItemDetail>
                  <ItemDetailLabel>Quantidade:</ItemDetailLabel>
                  <ItemDetailValue>{selectedItem.amount}</ItemDetailValue>
                </ItemDetail>
              )}

              <ItemDetail>
                <ItemDetailLabel>Valor:</ItemDetailLabel>
                <ItemDetailValue>{selectedItem.value} ouro</ItemDetailValue>
              </ItemDetail>
            </>
          )}
        </ModalBody>

        <ModalActions>
          {selectedItem && selectedItem.type === "consumable" && (
            <ActionButton primary onClick={() => handleUseItem(selectedItem)}>
              Usar
            </ActionButton>
          )}

          {selectedItem &&
            ["weapon", "armor", "accessory"].includes(selectedItem.type) && (
              <ActionButton
                primary
                onClick={() => handleEquipItem(selectedItem)}
              >
                Equipar
              </ActionButton>
            )}

          {selectedItem && (
            <ActionButton onClick={() => handleDropItem(selectedItem)}>
              Descartar
            </ActionButton>
          )}

          <ActionButton onClick={closeModal}>Fechar</ActionButton>
        </ModalActions>
      </Modal>
    </InventoryContainer>
  );
};

export default Inventory;
