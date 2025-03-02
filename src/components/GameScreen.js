import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import styled from "styled-components";
import { useGame } from "../context/GameContext";
import {
  getClassName,
  getClassEmoji,
  getClassNameWithEmoji,
} from "../utils/translations";

// Componentes
import PlayerStats from "./game/PlayerStats";
import DialogBox from "./game/DialogBox";
import LocationDescription from "./game/LocationDescription";
import ActionMenu from "./game/ActionMenu";
import Inventory from "./game/Inventory";
import QuestLog from "./game/QuestLog";

// Importar imagens
import uiImages from "../assets/images/ui";
import classImages from "../assets/images/classes";
import kingdomImages from "../assets/images/kingdoms";

// Importar dados
import { locations } from "../data/locations";
import { npcs } from "../data/npcs";
import { enemies } from "../data/enemies";

// Adicionar log para verificar as imagens disponíveis
console.log("Imagens de reinos disponíveis:", Object.keys(kingdomImages));
console.log("Imagem padrão:", kingdomImages.default);

// Importe a imagem quando estiver disponível
// import backgroundImage from "../assets/images/ui/game-background.jpg";

const GameContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 3fr 2fr;
  grid-template-areas:
    "main sidebar"
    "dialog actions";
  gap: 20px;
  height: calc(100vh - 120px);
  padding: 20px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 2fr 1fr;
    padding: 15px;
    gap: 15px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
    grid-template-areas:
      "main"
      "sidebar"
      "dialog"
      "actions";
    height: auto;
    min-height: calc(100vh - 120px);
    gap: 10px;
    padding: 10px;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  grid-area: ${(props) => props.area};
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #8b4513;
  border-radius: 8px;
  padding: 15px;
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const MainContent = styled(ContentWrapper)`
  grid-area: main;
  height: 100%;
  overflow: auto;
  min-height: 300px;

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

  @media (max-width: 768px) {
    height: auto;
    min-height: 300px;
  }
`;

const SidebarContent = styled(ContentWrapper)`
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 300px;
`;

const DialogContent = styled(ContentWrapper)`
  grid-area: dialog;
  height: 100%;
  min-height: 200px;
  overflow: hidden;
`;

const ActionsContent = styled(ContentWrapper)`
  grid-area: actions;
  height: 100%;
  min-height: 200px;
  overflow: auto;

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

const GameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.7);
  border-bottom: 1px solid #8b4513;
  margin-bottom: 20px;
`;

const PlayerInfo = ({ player }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3 style={{ color: "#d4af37", marginBottom: "10px" }}>{player.name}</h3>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            border: "2px solid #8b4513",
            marginRight: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            fontSize: "30px",
          }}
        >
          {player.classEmoji || getClassEmoji(player.class)}
        </div>
        <div>
          <div style={{ marginBottom: "5px" }}>
            <span style={{ color: "#d4af37" }}>Nível: </span>
            <span>{player.level}</span>
          </div>
          <div style={{ marginBottom: "5px" }}>
            <span style={{ color: "#d4af37" }}>Classe: </span>
            <span>{player.className || getClassName(player.class)}</span>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "5px" }}>
        <span style={{ color: "#d4af37" }}>Vida: </span>
        <div
          style={{
            width: "100%",
            height: "10px",
            backgroundColor: "#333",
            borderRadius: "5px",
            overflow: "hidden",
            marginTop: "5px",
          }}
        >
          <div
            style={{
              width: `${(player.health / player.maxHealth) * 100}%`,
              height: "100%",
              backgroundColor: "#e74c3c",
            }}
          ></div>
        </div>
        <div style={{ fontSize: "0.8rem", textAlign: "right" }}>
          {player.health}/{player.maxHealth}
        </div>
      </div>

      <div style={{ marginBottom: "5px" }}>
        <span style={{ color: "#d4af37" }}>Mana: </span>
        <div
          style={{
            width: "100%",
            height: "10px",
            backgroundColor: "#333",
            borderRadius: "5px",
            overflow: "hidden",
            marginTop: "5px",
          }}
        >
          <div
            style={{
              width: `${(player.mana / player.maxMana) * 100}%`,
              height: "100%",
              backgroundColor: "#3498db",
            }}
          ></div>
        </div>
        <div style={{ fontSize: "0.8rem", textAlign: "right" }}>
          {player.mana}/{player.maxMana}
        </div>
      </div>

      <div style={{ marginBottom: "5px" }}>
        <span style={{ color: "#d4af37" }}>Experiência: </span>
        <div
          style={{
            width: "100%",
            height: "10px",
            backgroundColor: "#333",
            borderRadius: "5px",
            overflow: "hidden",
            marginTop: "5px",
          }}
        >
          <div
            style={{
              width: `${Math.min(
                (player.experience / (player.level * 100)) * 100,
                100
              )}%`,
              height: "100%",
              backgroundColor: "#2ecc71",
            }}
          ></div>
        </div>
        <div style={{ fontSize: "0.8rem", textAlign: "right" }}>
          {player.experience}/{player.level * 100}
        </div>
      </div>

      <div>
        <span style={{ color: "#d4af37" }}>Ouro: </span>
        <span>{player.gold}</span>
      </div>
    </div>
  );
};

const StatBars = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

const StatBar = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
`;

const BarLabel = styled.span`
  color: #d4af37;
  margin-right: 5px;
`;

const BarValue = styled.span`
  color: ${(props) => props.color};
`;

const GameControls = styled.div`
  display: flex;
  gap: 15px;
`;

const ControlButton = styled.button`
  background-color: rgba(139, 69, 19, 0.5);
  color: #d4af37;
  border: 1px solid #8b4513;
  border-radius: 5px;
  padding: 8px 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(139, 69, 19, 0.8);
  }
`;

const LoadingScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #000;
  color: #d4af37;
`;

const LoadingText = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  text-shadow: 0 0 10px #8b4513;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #8b4513;
  border-top: 5px solid #d4af37;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 1.2rem;
  text-align: center;
  max-width: 600px;
  margin: 20px;
`;

const Button = styled.button`
  background-color: rgba(139, 69, 19, 0.7);
  color: #d4af37;
  border: 1px solid #8b4513;
  border-radius: 5px;
  padding: 8px 15px;
  margin: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background-color: rgba(139, 69, 19, 0.9);
    transform: translateY(-2px);
  }
`;

const MiniInventory = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  border: 1px solid #8b4513;
  padding: 15px;
  height: 100%;
`;

const MiniInventoryTitle = styled.h3`
  color: #d4af37;
  margin: 0 0 15px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #8b4513;
`;

const MiniInventoryContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MiniInventoryItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  background-color: rgba(139, 69, 19, 0.2);
  border-radius: 5px;
`;

const ItemIcon = styled.div`
  width: 30px;
  height: 30px;
  background-color: #333;
  border-radius: 5px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const ItemName = styled.div`
  color: #f0e6d2;
  font-size: 0.9rem;
`;

const LocationScreen = ({ location }) => {
  return (
    <div>
      <h2 style={{ color: "#d4af37", marginBottom: "15px" }}>
        {location.name} {location.emoji && <span>{location.emoji}</span>}
      </h2>
      <p style={{ color: "#f0e6d2", marginBottom: "20px", lineHeight: "1.6" }}>
        {location.description}
      </p>
      {location.image !== false && (
        <div style={{ position: "relative" }}>
          <img
            src={kingdomImages[location.id] || kingdomImages.default}
            alt={location.name}
            style={{
              maxWidth: "100%",
              borderRadius: "8px",
              marginBottom: "20px",
              border: "1px solid #8b4513",
            }}
          />
          {location.emoji && (
            <div
              style={{
                position: "absolute",
                bottom: "25px",
                right: "10px",
                fontSize: "32px",
                textShadow: "0 0 5px #000",
              }}
            >
              {location.emoji}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const GameScreen = () => {
  const {
    player,
    gameState,
    phases,
    setGameState,
    locationConnections,
    setLocationConnections,
  } = useGame();
  const [showInventory, setShowInventory] = useState(false);
  const [showQuestLog, setShowQuestLog] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // DEBUG - Log para verificar os valores do jogador quando o GameScreen é montado
  useEffect(() => {
    console.log("GameScreen Montado - Valores do jogador:");
    console.log(
      `Vida: ${player.health}/${player.maxHealth}, Mana: ${player.mana}/${player.maxMana}`
    );
  }, [player.health, player.mana, player.maxHealth, player.maxMana]);

  // Referência para o componente de diálogo
  const dialogRef = useRef(null);

  // Efeito para rolar para o final do diálogo quando novos diálogos são adicionados
  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.scrollTop = dialogRef.current.scrollHeight;
    }
  }, [gameState.dialogHistory]);

  // Efeito para carregar o jogo
  useEffect(() => {
    // DEBUG - Registrar valores no início do carregamento
    console.log("GameScreen - useEffect de carregamento - Valores INICIAIS:");
    console.log(
      `Vida: ${player.health}/${player.maxHealth}, Mana: ${player.mana}/${player.maxMana}`
    );

    // Simular tempo de carregamento
    const timer = setTimeout(() => {
      setLoading(false);

      // DEBUG - Log após o carregamento do jogo
      console.log(
        "GameScreen Carregado - Valores do jogador após carregamento:"
      );
      console.log(
        `Vida: ${player.health}/${player.maxHealth}, Mana: ${player.mana}/${player.maxMana}`
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, [player.health, player.mana, player.maxHealth, player.maxMana]);

  // Verificar se o jogo foi iniciado
  if (!gameState.gameStarted) {
    return <Navigate to="/" />;
  }

  // Verificar se o jogo acabou
  if (gameState.gameOver) {
    return <Navigate to="/game-over" />;
  }

  // Obter a fase atual
  const currentPhase = phases[gameState.currentPhase];

  // Obter a localização atual dos dados de localização
  const currentLocation =
    locations.find((loc) => loc.id === gameState.currentLocation) ||
    currentPhase?.locations?.find(
      (loc) => loc.id === gameState.currentLocation
    );

  // Certificar-se de que a localização tenha todas as propriedades necessárias
  // e usar as conexões armazenadas no gameState se existirem
  const enhancedLocation = currentLocation
    ? {
        ...currentLocation,
        // Garantir que as propriedades existam mesmo que não estejam definidas na localização original
        npcs: currentLocation.npcs || [],
        enemies: currentLocation.enemies || [],
        items: currentLocation.items || [],
        // Usar conexões armazenadas no gameState se disponíveis, senão usar as originais
        connectedLocations:
          (gameState.locationConnections &&
            gameState.locationConnections[gameState.currentLocation]) ||
          currentLocation.connectedLocations ||
          [],
      }
    : null;

  // Iniciar combate
  const handleStartCombat = (enemy) => {
    // Verificar se o inimigo foi fornecido
    if (!enemy) {
      console.error("Nenhum inimigo fornecido para o combate");
      return;
    }

    // Obter dados do inimigo
    let enemyData = enemy;

    // Se o inimigo for uma string (ID), buscar o objeto completo
    if (typeof enemy === "string") {
      // Buscar o inimigo nos dados do jogo
      const enemyFromData = enemies.find((e) => e.id === enemy);

      if (enemyFromData) {
        enemyData = { ...enemyFromData }; // Criar uma cópia para evitar referências
      } else {
        // Procurar o inimigo na fase atual
        const currentPhase = phases[gameState.currentPhase];
        const enemyFromPhase = currentPhase?.enemies?.find(
          (e) => e.id === enemy
        );

        if (enemyFromPhase) {
          enemyData = { ...enemyFromPhase }; // Criar uma cópia para evitar referências
        } else {
          console.error(`Inimigo não encontrado: ${enemy}`);
          return;
        }
      }
    } else if (typeof enemy === "object") {
      // Criar uma cópia do objeto para evitar referências
      enemyData = { ...enemy };
    }

    // Verificar se o objeto do inimigo tem todas as propriedades necessárias
    if (!enemyData.health) {
      console.error("Inimigo sem propriedade health:", enemyData);

      // Tentar corrigir o objeto do inimigo
      const enemyTemplate = enemies.find(
        (e) =>
          e.id === (typeof enemyData === "object" ? enemyData.id : enemyData)
      );

      if (enemyTemplate) {
        // Usar o template para preencher as propriedades ausentes
        enemyData = {
          ...enemyTemplate,
          ...(typeof enemyData === "object" ? enemyData : { id: enemyData }),
        };
      } else {
        console.error("Não foi possível corrigir o objeto do inimigo");
        return;
      }
    }

    // Garantir que todas as propriedades necessárias estejam presentes
    if (!enemyData.id || !enemyData.name) {
      console.error(
        "Inimigo com propriedades obrigatórias ausentes:",
        enemyData
      );
      return;
    }

    console.log("Iniciando combate com:", enemyData.id);
    console.log("Dados do inimigo:", enemyData);

    // Limpar qualquer inimigo anterior
    setGameState((prev) => ({
      ...prev,
      currentEnemy: null,
    }));

    // Atualizar o estado do jogo com o inimigo atual após um pequeno delay
    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        currentEnemy: enemyData,
      }));

      // Redirecionar para a página de combate após outro pequeno delay
      setTimeout(() => {
        navigate("/combat");
      }, 50);
    }, 50);
  };

  // Alternar inventário
  const toggleInventory = () => {
    setShowInventory(!showInventory);
    setShowQuestLog(false);
  };

  // Alternar registro de missões
  const toggleQuestLog = () => {
    setShowQuestLog(!showQuestLog);
    setShowInventory(false);
  };

  // Renderizar tela de carregamento
  if (loading) {
    return (
      <LoadingScreen>
        <LoadingText>Carregando...</LoadingText>
        <LoadingSpinner />
      </LoadingScreen>
    );
  }

  // Verificar se a fase e a localização foram carregadas
  if (!currentPhase || !currentLocation) {
    return (
      <LoadingScreen>
        <LoadingText>Erro ao carregar o jogo</LoadingText>
        <ErrorMessage>
          Não foi possível encontrar a fase ou localização atual.
        </ErrorMessage>
      </LoadingScreen>
    );
  }

  // Obter imagem de fundo da localização atual
  const locationId = currentLocation.id;
  const backgroundImage = kingdomImages[locationId] || kingdomImages.default;

  console.log(`Carregando imagem para localização: ${locationId}`);
  console.log(
    `Imagem de fundo: ${backgroundImage ? "Encontrada" : "Não encontrada"}`
  );
  console.log(`URL da imagem: ${backgroundImage}`);

  return (
    <GameContainer backgroundImage={backgroundImage}>
      <MainContent>
        {showInventory ? (
          <Inventory />
        ) : showQuestLog ? (
          <QuestLog />
        ) : (
          <LocationScreen location={enhancedLocation} />
        )}
      </MainContent>

      <SidebarContent>
        <PlayerInfo player={player} />
        <div>
          <Button onClick={toggleInventory}>
            {showInventory ? "Fechar Inventário" : "Inventário"}
          </Button>
          <Button onClick={toggleQuestLog}>
            {showQuestLog ? "Fechar Missões" : "Missões"}
          </Button>
        </div>
      </SidebarContent>

      <DialogContent ref={dialogRef}>
        <DialogBox dialogHistory={gameState.dialogHistory} />
      </DialogContent>

      <ActionsContent>
        <ActionMenu
          location={enhancedLocation}
          onStartCombat={handleStartCombat}
        />
      </ActionsContent>
    </GameContainer>
  );
};

export default GameScreen;
