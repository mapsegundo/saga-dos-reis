import React, { createContext, useState, useContext, useEffect } from "react";

// Dados do jogo
import { phases as gamePhases } from "../data/phases";
import { classes } from "../data/classes";
import { locations } from "../data/locations";
import { quests } from "../data/quests";
import { enemies } from "../data/enemies";
import { getClassName, getClassEmoji } from "../utils/translations";

// Criando o contexto
const GameContext = createContext();

// Hook personalizado para usar o contexto
export const useGame = () => useContext(GameContext);

// Provedor do contexto
export const GameProvider = ({ children }) => {
  // Estados do jogo
  const [player, setPlayer] = useState({
    name: "",
    class: "",
    level: 1,
    experience: 0,
    health: 100,
    maxHealth: 100,
    mana: 50,
    maxMana: 50,
    strength: 10,
    intelligence: 10,
    dexterity: 10,
    constitution: 10,
    gold: 10,
    inventory: [],
    equipment: {
      weapon: null,
      armor: null,
      accessory: null,
    },
    skills: [],
  });

  // Estado para as fases do jogo
  const [phases, setPhases] = useState(gamePhases);

  // Estado do jogo
  const [gameState, setGameState] = useState({
    currentPhase: 0,
    currentMission: null,
    gameStarted: false,
    gameOver: false,
    victory: false,
    currentLocation: "village_square",
    dialogHistory: [],
    questLog: [],
    introductionShown: false,
  });

  // Funções para manipular o estado do jogador
  const updatePlayer = (newPlayerData) => {
    setPlayer((prev) => ({ ...prev, ...newPlayerData }));
  };

  // Iniciar um novo jogo
  const startNewGame = (name, characterClass) => {
    // Encontrar a classe selecionada no array de classes
    const selectedClass = classes.find((c) => c.id === characterClass);

    if (!selectedClass) {
      console.error(`Classe não encontrada: ${characterClass}`);
      return;
    }

    // Inicializar o jogador com os dados da classe selecionada
    const newPlayer = {
      name,
      class: characterClass,
      className: getClassName(characterClass),
      classEmoji: getClassEmoji(characterClass),
      classData: selectedClass,
      level: 1,
      health: selectedClass.baseHealth,
      maxHealth: selectedClass.baseHealth,
      mana: selectedClass.baseMana,
      maxMana: selectedClass.baseMana,
      experience: 0,
      gold: 10,
      inventory: [...(selectedClass.startingItems || [])],
      equipment: {
        weapon: selectedClass.startingWeapon || null,
        armor: selectedClass.startingArmor || null,
        accessory: null,
      },
      skills: [...(selectedClass.startingSkills || [])],
    };

    // Atualizar o estado do jogador
    setPlayer(newPlayer);

    // Verificar se phases[0] existe antes de acessar suas propriedades
    const firstPhase = phases[0];

    // Verificar se a localização inicial existe
    const startLocation = firstPhase?.startLocation || "village";

    // Verificar se a missão inicial existe
    const firstMission = firstPhase?.missions?.[0];

    // Inicializar o estado do jogo
    const newGameState = {
      currentPhase: 0,
      currentMission: firstMission || null,
      gameStarted: true,
      gameOver: false,
      victory: false,
      currentLocation: startLocation,
      dialogHistory: [
        {
          speaker: "Mestre",
          text: `Bem-vindo a Elbion, ${name}. Sua jornada começa agora.`,
        },
      ],
      questLog: firstMission ? [firstMission] : [],
      introductionShown: false,
    };

    // Atualizar o estado do jogo
    setGameState(newGameState);

    // Adiciona a introdução apenas uma vez após o carregamento
    setTimeout(() => {
      addDialog(
        "Narrador",
        firstPhase?.introduction || "Sua aventura começa agora..."
      );
    }, 500);

    console.log("Novo jogo iniciado:", {
      player: newPlayer,
      gameState: newGameState,
    });
  };

  // Avançar para a próxima fase
  const advancePhase = () => {
    const nextPhase = gameState.currentPhase + 1;

    if (nextPhase < phases.length) {
      setGameState((prev) => ({
        ...prev,
        currentPhase: nextPhase,
        currentMission: phases[nextPhase].missions[0],
        currentLocation: phases[nextPhase].startLocation,
        dialogHistory: [
          ...prev.dialogHistory,
          { speaker: "Narrador", text: phases[nextPhase].introduction },
        ],
        questLog: [...prev.questLog, phases[nextPhase].missions[0]],
      }));

      // Level up do jogador ao avançar de fase
      setPlayer((prev) => ({
        ...prev,
        level: prev.level + 1,
        maxHealth: prev.maxHealth + 20,
        health: prev.maxHealth + 20,
        maxMana: prev.maxMana + 10,
        mana: prev.maxMana + 10,
      }));
    } else {
      // Vitória do jogo
      setGameState((prev) => ({
        ...prev,
        gameOver: true,
        victory: true,
        dialogHistory: [
          ...prev.dialogHistory,
          {
            speaker: "Narrador",
            text: "Parabéns! Você completou todas as fases e se tornou o novo rei de Elbion!",
          },
        ],
      }));
    }
  };

  // Finalizar o jogo (derrota)
  const endGame = () => {
    setGameState((prev) => ({
      ...prev,
      gameOver: true,
      victory: false,
    }));
  };

  // Adicionar diálogo
  const addDialog = (speaker, text) => {
    setGameState((prev) => ({
      ...prev,
      dialogHistory: [...prev.dialogHistory, { speaker, text }],
    }));
  };

  // Adicionar item ao inventário
  const addToInventory = (itemId, quantity = 1) => {
    setPlayer((prev) => {
      // Verificar se o item já existe no inventário
      const existingItemIndex = prev.inventory.findIndex(
        (item) => item && item.id === itemId
      );

      if (existingItemIndex >= 0) {
        // Se o item já existe, aumentar a quantidade
        const updatedInventory = [...prev.inventory];
        updatedInventory[existingItemIndex] = {
          ...updatedInventory[existingItemIndex],
          quantity:
            (updatedInventory[existingItemIndex].quantity || 1) + quantity,
        };
        return {
          ...prev,
          inventory: updatedInventory,
        };
      } else {
        // Se o item não existe, adicionar ao inventário
        return {
          ...prev,
          inventory: [...prev.inventory, { id: itemId, quantity }],
        };
      }
    });
  };

  // Remover item do inventário
  const removeFromInventory = (itemId, quantity = 1) => {
    setPlayer((prev) => {
      // Encontrar o item no inventário
      const existingItemIndex = prev.inventory.findIndex(
        (item) => item && item.id === itemId
      );

      if (existingItemIndex >= 0) {
        const updatedInventory = [...prev.inventory];
        const currentQuantity =
          updatedInventory[existingItemIndex].quantity || 1;

        if (currentQuantity <= quantity) {
          // Se a quantidade a ser removida for maior ou igual à quantidade atual, remover o item
          updatedInventory.splice(existingItemIndex, 1);
        } else {
          // Caso contrário, diminuir a quantidade
          updatedInventory[existingItemIndex] = {
            ...updatedInventory[existingItemIndex],
            quantity: currentQuantity - quantity,
          };
        }

        return {
          ...prev,
          inventory: updatedInventory,
        };
      }

      // Se o item não foi encontrado, retornar o inventário sem alterações
      return prev;
    });
  };

  // Equipar item
  const equipItem = (item) => {
    setPlayer((prev) => ({
      ...prev,
      equipment: {
        ...prev.equipment,
        [item.type]: item,
      },
      inventory: prev.inventory.filter((i) => i.id !== item.id),
    }));
  };

  // Descartar item equipado
  const unequipItem = (slot) => {
    const item = player.equipment[slot];

    if (item) {
      setPlayer((prev) => ({
        ...prev,
        equipment: {
          ...prev.equipment,
          [slot]: null,
        },
        inventory: [...prev.inventory, item],
      }));
    }
  };

  // Ganhar experiência
  const gainExperience = (amount) => {
    const newExperience = player.experience + amount;
    const experienceToLevelUp = player.level * 100;

    if (newExperience >= experienceToLevelUp) {
      // Level up
      const newLevel = player.level + 1;
      const remainingExp = newExperience - experienceToLevelUp;

      setPlayer((prev) => ({
        ...prev,
        level: newLevel,
        experience: remainingExp,
        maxHealth: prev.maxHealth + 10,
        health: prev.maxHealth + 10,
        maxMana: prev.maxMana + 5,
        mana: prev.maxMana + 5,
      }));

      addDialog("Sistema", `Parabéns! Você subiu para o nível ${newLevel}!`);
    } else {
      setPlayer((prev) => ({
        ...prev,
        experience: newExperience,
      }));
    }

    // Adicionar diálogo informando sobre a experiência ganha
    addDialog("Sistema", `Você ganhou ${amount} pontos de experiência.`);
  };

  // Ganhar ou perder ouro
  const updateGold = (amount) => {
    setPlayer((prev) => ({
      ...prev,
      gold: Math.max(0, prev.gold + amount),
    }));
  };

  // Tomar dano
  const takeDamage = (amount) => {
    const newHealth = Math.max(0, player.health - amount);

    setPlayer((prev) => ({
      ...prev,
      health: newHealth,
    }));

    if (newHealth === 0) {
      endGame();
    }
  };

  // Curar
  const heal = (amount) => {
    setPlayer((prev) => ({
      ...prev,
      health: Math.min(prev.maxHealth, prev.health + amount),
    }));
  };

  // Usar mana
  const useMana = (amount) => {
    const newMana = Math.max(0, player.mana - amount);

    setPlayer((prev) => ({
      ...prev,
      mana: newMana,
    }));

    return newMana >= 0;
  };

  // Recuperar mana
  const recoverMana = (amount) => {
    if (amount <= 0) return;

    setPlayer((prevPlayer) => {
      const newMana = Math.min(prevPlayer.mana + amount, prevPlayer.maxMana);
      return {
        ...prevPlayer,
        mana: newMana,
      };
    });
  };

  // Atualizar mana (função adicional para compatibilidade)
  const updateMana = (newMana) => {
    setPlayer((prevPlayer) => {
      return {
        ...prevPlayer,
        mana: Math.max(0, Math.min(newMana, prevPlayer.maxMana)),
      };
    });
  };

  // Completar missão
  const completeMission = (missionId) => {
    const currentPhaseData = phases[gameState.currentPhase];
    const mission = currentPhaseData.missions.find((m) => m.id === missionId);

    if (mission) {
      setGameState((prev) => ({
        ...prev,
        questLog: prev.questLog.map((q) =>
          q.id === missionId ? { ...q, completed: true } : q
        ),
      }));

      // Verificar se todas as missões da fase foram completadas
      const allMissionsCompleted = currentPhaseData.missions.every(
        (m) => gameState.questLog.find((q) => q.id === m.id)?.completed || false
      );

      // Se todas as missões foram completadas, avançar para a próxima fase
      if (allMissionsCompleted) {
        // Implementar lógica para avançar para a próxima fase
        console.log("Todas as missões da fase foram completadas!");
      }
    }
  };

  // Adicionar missão ao registro de missões
  const addMission = (missionId) => {
    const currentPhaseData = phases[gameState.currentPhase];
    const mission = currentPhaseData.missions.find((m) => m.id === missionId);

    if (mission) {
      // Verificar se a missão já existe no registro
      const missionExists = gameState.questLog.some((q) => q.id === missionId);

      if (!missionExists) {
        setGameState((prev) => ({
          ...prev,
          questLog: [...prev.questLog, { ...mission, completed: false }],
        }));
        return true;
      }
    }
    return false;
  };

  // Mudar para uma nova localização
  const changeLocation = (locationId) => {
    // Verificar se a localização existe nos dados de localização
    const locationExists =
      locations.some((loc) => loc.id === locationId) ||
      phases[gameState.currentPhase]?.locations?.some(
        (loc) => loc.id === locationId
      );

    if (locationExists) {
      setGameState((prev) => ({
        ...prev,
        currentLocation: locationId,
      }));

      // Verificar se há missões relacionadas a esta localização
      const relatedMission = phases[gameState.currentPhase]?.missions?.find(
        (mission) =>
          mission.type === "visit_location" &&
          mission.targetId === locationId &&
          !mission.completed
      );

      if (relatedMission) {
        completeMission(relatedMission.id);
        addDialog(
          "Sistema",
          `Missão completada: ${relatedMission.name}. Você ganhou ${relatedMission.reward.experience} de experiência.`
        );
      }
    }
  };

  // Atualizar conexões de localização
  const updateLocationConnections = (locationId, newConnections) => {
    // Primeiro, atualizamos as conexões na memória
    // Procurar a localização atual para atualizar
    const currentLocation = locations.find((loc) => loc.id === locationId);
    if (currentLocation) {
      // Atualizar diretamente o objeto
      currentLocation.connectedLocations = [...newConnections];
    }

    // Em seguida, vamos armazenar no gameState as conexões que nós atualizamos
    // para que elas persistam entre renderizações
    setGameState((prevState) => {
      // Criar uma versão modificada do estado atual
      return {
        ...prevState,
        // Adicionar ou atualizar mapa de conexões de localização
        locationConnections: {
          ...(prevState.locationConnections || {}),
          [locationId]: newConnections,
        },
        // Forçar atualização da UI definindo timestamp
        lastLocationUpdate: Date.now(),
      };
    });

    // Apenas para garantir que o jogador saiba que um novo local foi descoberto
    // Removendo a mensagem sobre as Ruínas Antigas, pois elas não devem ser liberadas ainda
    // addDialog(
    //   "Sistema",
    //   `Novo local descoberto: Ruínas Antigas. Você pode viajar para lá a partir da sua localização atual.`
    // );
  };

  // Valor do contexto
  const contextValue = {
    player,
    gameState,
    phases,
    setPlayer,
    setGameState,
    setPhases,
    startNewGame,
    advancePhase,
    endGame,
    addDialog,
    addToInventory,
    removeFromInventory,
    equipItem,
    unequipItem,
    gainExperience,
    updateGold,
    takeDamage,
    heal,
    useMana,
    recoverMana,
    updateMana,
    completeMission,
    changeLocation,
    classes,
    updateLocationConnections,
    addMission,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export default GameContext;
