import React from "react";
import styled from "styled-components";
import { useGame } from "../../context/GameContext";

// Importar imagens
import kingdomImages from "../../assets/images/kingdoms";

const LocationContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  border: 1px solid #8b4513;
  padding: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const LocationHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #8b4513;
  padding-bottom: 15px;
`;

const LocationImageContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background-color: #333;
  margin-right: 15px;
  border: 2px solid #8b4513;
  position: relative;
  overflow: hidden;
`;

const LocationImageElement = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LocationInfo = styled.div`
  flex: 1;
`;

const LocationTitle = styled.h3`
  color: #d4af37;
  margin: 0 0 5px 0;
`;

const LocationType = styled.div`
  font-size: 0.9rem;
  color: #aaa;
`;

const LocationDescription = styled.div`
  color: #f0e6d2;
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
`;

const LocationFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const FeatureTag = styled.div`
  background-color: rgba(139, 69, 19, 0.3);
  color: #d4af37;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
`;

const FeatureIcon = styled.span`
  margin-right: 5px;
`;

const LocationDescriptionComponent = ({ location }) => {
  const { gameState } = useGame();

  // Verificar se a localização foi fornecida
  if (!location) {
    console.error("LocationDescription: Localização não fornecida");
    return (
      <LocationContainer>
        <LocationTitle>Localização desconhecida</LocationTitle>
        <LocationDescription>
          Erro ao carregar informações da localização.
        </LocationDescription>
      </LocationContainer>
    );
  }

  // Obter a imagem da localização
  const locationImage = kingdomImages[location.id] || kingdomImages.default;

  // Renderizar características da localização
  const renderFeatures = () => {
    const features = [];

    // NPCs
    if (location.npcs && location.npcs.length > 0) {
      features.push(
        <FeatureTag key="npcs">
          <FeatureIcon>👤</FeatureIcon> NPCs: {location.npcs.length}
        </FeatureTag>
      );
    }

    // Lojas
    if (location.shops && location.shops.length > 0) {
      features.push(
        <FeatureTag key="shops">
          <FeatureIcon>🛒</FeatureIcon> Lojas: {location.shops.length}
        </FeatureTag>
      );
    }

    // Inimigos
    if (location.enemies && location.enemies.length > 0) {
      features.push(
        <FeatureTag key="enemies">
          <FeatureIcon>⚔️</FeatureIcon> Área de Combate
        </FeatureTag>
      );
    }

    // Missões
    const availableMissions = gameState.questLog.filter(
      (quest) => !quest.completed && quest.location === location.id
    );

    if (availableMissions.length > 0) {
      features.push(
        <FeatureTag key="quests">
          <FeatureIcon>📜</FeatureIcon> Missões: {availableMissions.length}
        </FeatureTag>
      );
    }

    return features;
  };

  return (
    <LocationContainer>
      <LocationHeader>
        <LocationImageContainer>
          <LocationImageElement src={locationImage} alt={location.name} />
          {location.emoji && (
            <div
              style={{
                position: "absolute",
                bottom: "5px",
                right: "5px",
                fontSize: "24px",
                textShadow: "0 0 3px #000",
              }}
            >
              {location.emoji}
            </div>
          )}
        </LocationImageContainer>
        <LocationInfo>
          <LocationTitle>{location.name}</LocationTitle>
          <LocationType>{location.type || "Área de exploração"}</LocationType>
        </LocationInfo>
      </LocationHeader>

      <LocationDescription>{location.description}</LocationDescription>

      <LocationFeatures>{renderFeatures()}</LocationFeatures>
    </LocationContainer>
  );
};

export default LocationDescriptionComponent;
