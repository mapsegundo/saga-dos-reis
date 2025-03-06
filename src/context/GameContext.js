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
    questProgress: {
      mission1_2: {
        banditsDefeated: 0,
        banditArchersDefeated: 0,
        totalDefeated: 0,
        requiredDefeats: 5,
        banditsRemaining: 3,
        banditArchersRemaining: 2,
      },
    },
    updatedEnemies: {},
  });

  // DEBUG - Monitorar mudanças na vida e mana do jogador
  useEffect(() => {
    // Verificar se o jogador está inicializado para evitar logs desnecessários na inicialização
    if (player.name && (player.health > 0 || player.mana > 0)) {
      // Logs mais limpos para informações do jogador
      console.log(
        `GameContext - Jogador atualizado: Vida: ${player.health}/${player.maxHealth}, Mana: ${player.mana}/${player.maxMana}`
      );
    }
  }, [
    player.health,
    player.mana,
    player.name,
    player.maxHealth,
    player.maxMana,
  ]);

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
      inventory: [
        {
          id: "health_potion",
          name: "Poção de Cura 🧪",
          type: "consumable",
          effect: "heal",
          value: 30,
          amount: 3,
          description: "Restaura 30 pontos de vida quando consumida.",
        },
        {
          id: "mana_potion",
          name: "Poção de Mana ✨",
          type: "consumable",
          effect: "mana",
          value: 30,
          amount: 3,
          description: "Restaura 30 pontos de mana quando consumida.",
        },
      ],
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
      updatedEnemies: {},
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
    // Log simples para identificar quando esta função é chamada
    console.log("INFO: Avançando para a próxima fase");

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
          amount: (updatedInventory[existingItemIndex].amount || 1) + quantity,
        };
        return {
          ...prev,
          inventory: updatedInventory,
        };
      } else {
        // Se o item não existe, adicionar ao inventário
        return {
          ...prev,
          inventory: [...prev.inventory, { id: itemId, amount: quantity }],
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
        const currentAmount = updatedInventory[existingItemIndex].amount || 1;

        if (currentAmount <= quantity) {
          // Se a quantidade a ser removida for maior ou igual à quantidade atual, remover o item
          updatedInventory.splice(existingItemIndex, 1);
        } else {
          // Caso contrário, diminuir a quantidade
          updatedInventory[existingItemIndex] = {
            ...updatedInventory[existingItemIndex],
            amount: currentAmount - quantity,
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

  // Função utilitária para calcular a experiência necessária para o próximo nível
  const calculateExpToNextLevel = (currentLevel) => {
    // Fórmula base: nível atual * 100
    return currentLevel * 100;
  };

  // Função para ganhar experiência
  const gainExperience = (amount) => {
    console.log(`INFO: Ganhando ${amount} pontos de experiência`);

    // Calcular nova experiência
    const newExp = player.experience + amount;
    let newLevel = player.level;
    let leveledUp = false;

    // Verificar se o jogador subiu de nível
    const expToNextLevel = calculateExpToNextLevel(player.level);
    if (newExp >= expToNextLevel) {
      newLevel = player.level + 1;
      leveledUp = true;
      console.log(
        `INFO: Level up para nível ${newLevel}! Restaurando vida e mana.`
      );
    }

    // Atualizar o jogador
    setPlayer((prevPlayer) => {
      // Apenas restaurar vida e mana se o jogador subiu de nível
      if (leveledUp) {
        // Calculando novos valores máximos
        const newMaxHealth = Math.floor(prevPlayer.maxHealth * 1.2);
        const newMaxMana = Math.floor(prevPlayer.maxMana * 1.15);

        console.log("Level up! Novos valores máximos calculados:");
        console.log(`Vida máxima: ${prevPlayer.maxHealth} -> ${newMaxHealth}`);
        console.log(`Mana máxima: ${prevPlayer.maxMana} -> ${newMaxMana}`);

        // Ao subir de nível, restauramos completamente a vida e mana
        return {
          ...prevPlayer,
          level: newLevel,
          experience: newExp - expToNextLevel,
          maxHealth: newMaxHealth,
          health: newMaxHealth, // Restaurar vida ao máximo APENAS ao subir de nível
          maxMana: newMaxMana,
          mana: newMaxMana, // Restaurar mana ao máximo APENAS ao subir de nível
          attributePoints: prevPlayer.attributePoints + 3,
        };
      } else {
        // Se não subiu de nível, apenas atualiza a experiência sem restaurar vida/mana
        console.log(
          "Apenas ganhando XP, sem subir de nível. Mantendo vida/mana atuais."
        );
        return {
          ...prevPlayer,
          experience: newExp,
        };
      }
    });

    // Adicionar mensagens informativas após processar a experiência
    if (leveledUp) {
      addDialog("Sistema", `Parabéns! Você subiu para o nível ${newLevel}!`);
      addDialog("Sistema", `Sua vida e mana foram completamente restauradas!`);
    }

    // Sempre adicionar informação sobre a experiência ganha
    addDialog("Sistema", `Você ganhou ${amount} pontos de experiência!`);

    setTimeout(() => {
      console.log("Valores do jogador APÓS gainExperience:");
      console.log(
        `Vida: ${player.health}/${player.maxHealth}, Mana: ${player.mana}/${player.maxMana}`
      );
      console.log(`Subiu de nível: ${leveledUp}`);
    }, 50);
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

  // Definir vida para um valor específico
  const setHealth = (exactValue) => {
    setPlayer((prev) => ({
      ...prev,
      health: Math.max(0, Math.min(exactValue, prev.maxHealth)),
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
    if (typeof newMana !== "number" || isNaN(newMana)) {
      console.error(`updateMana: Valor inválido recebido: ${newMana}`);
      return;
    }

    console.log(`updateMana CHAMADA com valor: ${newMana}`);
    console.log(
      `Mana atual antes da atualização: ${player.mana}/${player.maxMana}`
    );

    const clampedMana = Math.max(0, Math.min(newMana, player.maxMana));
    console.log(`Valor final após ajuste: ${clampedMana}`);

    setPlayer((prevPlayer) => {
      // Registrar para verificar se o estado anterior está correto
      console.log(
        `Estado anterior no setPlayer: ${prevPlayer.mana}/${prevPlayer.maxMana}`
      );

      const updatedPlayer = {
        ...prevPlayer,
        mana: clampedMana,
      };

      // Registrar o novo estado para confirmar
      console.log(
        `Novo estado após atualização: ${updatedPlayer.mana}/${updatedPlayer.maxMana}`
      );

      return updatedPlayer;
    });

    // Verificar após a atualização
    setTimeout(() => {
      console.log(
        `Verificação após updateMana: ${player.mana}/${player.maxMana}`
      );
    }, 50);
  };

  // Completar missão
  const completeMission = (missionId) => {
    // DEBUG - Log para identificar quando completeMission é chamada
    console.log("FUNÇÃO completeMission CHAMADA para missão:", missionId);

    const currentPhaseData = phases[gameState.currentPhase];
    const mission = currentPhaseData.missions.find((m) => m.id === missionId);

    if (mission) {
      console.log("Missão encontrada:", mission.name);
      console.log("Estrutura completa da missão:", mission);

      // Verificar se a missão já está completa
      const isAlreadyCompleted = gameState.questLog.some(
        (q) => q.id === missionId && q.completed
      );

      if (isAlreadyCompleted) {
        console.log("Esta missão já foi completada anteriormente, ignorando.");
        return;
      }

      // Marcar a missão como completa no questLog
      setGameState((prev) => ({
        ...prev,
        questLog: prev.questLog.map((q) =>
          q.id === missionId ? { ...q, completed: true } : q
        ),
      }));

      // Criar mensagem de recompensa
      let rewardMessage = `Missão "${mission.name}" completada!`;

      // Processar recompensas
      if (mission.reward) {
        // Entregar recompensas de experiência
        if (mission.reward.experience) {
          console.log(
            "Entregando recompensa de XP:",
            mission.reward.experience
          );
          gainExperience(mission.reward.experience);
          rewardMessage += ` +${mission.reward.experience} XP.`;
        }

        // Entregar recompensas de ouro
        if (mission.reward.gold) {
          console.log("Entregando recompensa de ouro:", mission.reward.gold);
          updateGold(mission.reward.gold);
          rewardMessage += ` +${mission.reward.gold} ouro.`;
        }

        // Entregar itens de recompensa
        if (mission.reward.items && Array.isArray(mission.reward.items)) {
          console.log("Entregando itens de recompensa:", mission.reward.items);
          mission.reward.items.forEach((item) => {
            const itemId = typeof item === "object" ? item.id : item;
            const itemName = typeof item === "object" ? item.name : itemId;

            if (itemId) {
              addToInventory(itemId, 1);
              console.log("Item adicionado ao inventário:", itemId);
              rewardMessage += ` +1 ${itemName}.`;
            }
          });
        }
      }

      // Mostrar a mensagem de conclusão
      addDialog("Sistema", rewardMessage);

      // Verificar se todas as missões da fase foram completadas
      const allMissionsCompleted = currentPhaseData.missions.every(
        (m) => gameState.questLog.find((q) => q.id === m.id)?.completed || false
      );

      // Se todas as missões foram completadas, mostrar mensagem
      if (allMissionsCompleted) {
        console.log("Todas as missões da fase foram completadas!");

        // Adicionar mensagem ao diálogo
        addDialog(
          "Sistema",
          "Você completou todas as missões desta fase! Fale com o prefeito para avançar para a próxima área."
        );
      }
    } else {
      console.warn(`Missão com ID ${missionId} não encontrada na fase atual.`);
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

  // Estado para inicializar os contadores de bandidos
  const initializeBanditCounters = () => {
    return {
      banditsDefeated: 0,
      banditArchersDefeated: 0,
      totalDefeated: 0,
      requiredDefeats: 5,
      banditsRemaining: 3,
      banditArchersRemaining: 2,
    };
  };

  // Função para registrar a derrota de um bandido ou arqueiro bandido
  const recordEnemyDefeat = (enemyId) => {
    console.log(`🔄 Registrando derrota de inimigo: ${enemyId}`);

    if (enemyId === "bandit" || enemyId === "bandit_archer") {
      setGameState((prev) => {
        // Se o progresso da missão não existir, inicializá-lo
        if (!prev.questProgress?.mission1_2) {
          console.log(
            "⚙️ Inicializando contadores de bandidos na primeira derrota"
          );
          return {
            ...prev,
            questProgress: {
              ...prev.questProgress,
              mission1_2: initializeBanditCounters(),
            },
          };
        }

        // Obter os contadores atuais
        const progress = prev.questProgress.mission1_2;

        // Criar nova versão do progresso
        const updatedProgress = { ...progress };

        // Atualizar contadores com base no tipo de inimigo
        if (enemyId === "bandit") {
          // Verificar se ainda há bandidos para derrotar
          if (updatedProgress.banditsRemaining <= 0) {
            console.log("⚠️ Não há mais bandidos para derrotar");
            return prev; // Retornar estado sem alterações
          }

          // Decrementar contador de bandidos restantes
          updatedProgress.banditsRemaining -= 1;
          // Incrementar contador de bandidos derrotados
          updatedProgress.banditsDefeated += 1;
          // Incrementar contador total
          updatedProgress.totalDefeated += 1;

          console.log(
            `✅ Bandido derrotado! Bandidos restantes: ${updatedProgress.banditsRemaining}, Total: ${updatedProgress.totalDefeated}/5`
          );
        } else if (enemyId === "bandit_archer") {
          // Verificar se ainda há arqueiros para derrotar
          if (updatedProgress.banditArchersRemaining <= 0) {
            console.log("⚠️ Não há mais arqueiros bandidos para derrotar");
            return prev; // Retornar estado sem alterações
          }

          // Decrementar contador de arqueiros restantes
          updatedProgress.banditArchersRemaining -= 1;
          // Incrementar contador de arqueiros derrotados
          updatedProgress.banditArchersDefeated += 1;
          // Incrementar contador total
          updatedProgress.totalDefeated += 1;

          console.log(
            `✅ Arqueiro bandido derrotado! Arqueiros restantes: ${updatedProgress.banditArchersRemaining}, Total: ${updatedProgress.totalDefeated}/5`
          );
        }

        // Verificar se a missão foi completada
        if (updatedProgress.totalDefeated >= updatedProgress.requiredDefeats) {
          console.log(
            "🏆 Meta de 5 bandidos atingida! Missão pronta para ser concluída."
          );

          // Método 1: Atualizar diretamente no currentLocation
          // Isso garante que a mudança seja visível imediatamente na interface
          if (
            prev.currentLocation &&
            prev.currentLocation.id === "village_outskirts"
          ) {
            console.log(
              "🔥 Adicionando Garrick diretamente à localização atual!"
            );

            // IMPORTANTE: Não modificar a estrutura do currentLocation, apenas a lista de inimigos
            // Encontrar a localização atual nos dados de localização para modificar
            const locationsArray = locations || [];
            const currentLocationIndex = locationsArray.findIndex(
              (loc) => loc.id === "village_outskirts"
            );

            if (currentLocationIndex !== -1) {
              // Criar uma cópia segura das localizações
              const updatedLocations = [...locationsArray];

              // Modificar a lista de inimigos da localização village_outskirts
              if (!updatedLocations[currentLocationIndex].enemies) {
                updatedLocations[currentLocationIndex].enemies = [];
              }

              // Verificar se Garrick já está na lista
              const hasGarrick = updatedLocations[
                currentLocationIndex
              ].enemies.some((enemy) =>
                typeof enemy === "string"
                  ? enemy === "garrick"
                  : enemy.id === "garrick"
              );

              // Adicionar Garrick se ele ainda não estiver na lista
              if (!hasGarrick) {
                console.log(
                  "👹 Adicionando Garrick à lista de inimigos global!"
                );
                updatedLocations[currentLocationIndex].enemies.push("garrick");

                // Mostrar as mensagens imediatamente para garantir que o jogador veja Garrick
                // Marcamos que Garrick apareceu
                localStorage.setItem("garrick_appeared", "true");

                // Retornar estado atualizado com diálogo incluído para garantir que ele apareça
                return {
                  ...prev,
                  questProgress: {
                    ...prev.questProgress,
                    mission1_2: updatedProgress,
                  },
                  // Manter o ID como valor de currentLocation, não mudar para objeto
                  updatedEnemies: {
                    ...prev.updatedEnemies,
                    village_outskirts: [
                      ...updatedLocations[currentLocationIndex].enemies,
                    ],
                  },
                  // Adicionar os diálogos diretamente aqui para garantir que apareçam imediatamente
                  dialogHistory: [
                    ...prev.dialogHistory,
                    {
                      speaker: "Narrador",
                      text: "Após derrotar o último bandido, você ouve uma risada maligna. De repente, Garrick, o líder dos bandidos, aparece ao longe. 'Então você é o herói que está matando meus homens? Vamos ver do que você é capaz!'",
                    },
                    {
                      speaker: "Sistema",
                      text: "Garrick, o líder dos bandidos, apareceu nos arredores da vila! Derrote-o para completar a missão.",
                    },
                  ],
                };
              }
            }
          }
        }

        // Retornar estado atualizado sem modificar localizações
        return {
          ...prev,
          questProgress: {
            ...prev.questProgress,
            mission1_2: updatedProgress,
          },
        };
      });
    }
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
    setHealth,
    useMana,
    recoverMana,
    updateMana,
    completeMission,
    changeLocation,
    classes,
    updateLocationConnections,
    addMission,
    recordEnemyDefeat,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export default GameContext;
