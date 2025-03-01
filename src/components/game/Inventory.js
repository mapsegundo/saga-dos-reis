import React, { useState } from "react";
import styled from "styled-components";
import { useGame } from "../../context/GameContext";

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

const ItemDetailsModal = styled.div`
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
  justify-content: space-around;
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
        // Lógica para usar poção de cura
        addDialog(
          "Sistema",
          `Você usou ${item.name} e recuperou ${item.value} pontos de vida.`
        );
      } else if (item.effect === "mana") {
        // Lógica para usar poção de mana
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

      {selectedItem && (
        <ItemDetailsModal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{selectedItem.name}</ModalTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>

            <ModalBody>
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
            </ModalBody>

            <ModalActions>
              {selectedItem.type === "consumable" && (
                <ActionButton
                  primary
                  onClick={() => handleUseItem(selectedItem)}
                >
                  Usar
                </ActionButton>
              )}

              {["weapon", "armor", "accessory"].includes(selectedItem.type) && (
                <ActionButton
                  primary
                  onClick={() => handleEquipItem(selectedItem)}
                >
                  Equipar
                </ActionButton>
              )}

              <ActionButton onClick={() => handleDropItem(selectedItem)}>
                Descartar
              </ActionButton>

              <ActionButton onClick={closeModal}>Fechar</ActionButton>
            </ModalActions>
          </ModalContent>
        </ItemDetailsModal>
      )}
    </InventoryContainer>
  );
};

export default Inventory;
