import React, { useState, useEffect } from "react";
import { useGame } from "../../context/GameContext";
import { enemies } from "../../data/enemies";

const ActionMenuFixed = ({ location, onStartCombat }) => {
  const {
    player,
    gameState,
    phases,
    changeLocation,
    addDialog,
    completeMission,
    addMission,
    addToInventory,
    updateGold,
    gainExperience,
    updateLocationConnections,
    setGameState,
    validateGameState,
    npcs,
  } = useGame();

  // Estado para controlar se está em diálogo com um NPC
  const [inDialog, setInDialog] = useState(false);
  const [currentNpcId, setCurrentNpcId] = useState(null);
  const [talkedToNpcs, setTalkedToNpcs] = useState([]);

  // Obter a fase atual
  const currentPhase = phases[gameState.currentPhase];

  // Hook useEffect para validar o estado do jogo quando necessário
  useEffect(() => {
    // Verificar se estamos nos arredores da vila e se a missão foi completada
    if (location && location.id === "village_outskirts") {
      const isMissionComplete = gameState.questLog.some(
        (q) => q.id === "mission1_2" && q.completed
      );

      if (isMissionComplete) {
        console.log(
          "ActionMenu - Missão de bandidos completa, validando estado da localização"
        );
        validateGameState();
      }
    }
  }, [location, gameState.questLog, validateGameState]);

  // Se a localização não for fornecida, não renderizar nada
  if (!location) {
    console.error("Localização não fornecida para ActionMenu");
    return (
      <div className="bg-black/70 border border-[#8b4513] rounded-lg p-4 h-full">
        <p className="text-red-500">Erro: Localização não encontrada</p>
      </div>
    );
  }

  // Propriedades da localização
  const hasNPCs = location.npcs && location.npcs.length > 0;
  const hasEnemies = location.enemies && location.enemies.length > 0;
  const hasConnectedLocations =
    location.connectedLocations && location.connectedLocations.length > 0;
  const hasItems = false; // Temporariamente desativado

  // Flags para tipos de localização
  const isVillageOutskirts = location.id === "village_outskirts";
  const isVillageSquare = location.id === "village_square";
  const isVillage =
    location.id === "village" || location.id === "village_square";

  // Verificar se todos os bandidos foram derrotados
  const allBanditsDefeated = () => {
    // Verificar se a missão foi completada
    if (gameState.questLog.some((q) => q.id === "mission1_2" && q.completed)) {
      return true;
    }

    // Caso a missão não tenha sido completada, verificar se todos os bandidos foram derrotados
    const questProgress = gameState.questProgress?.mission1_2;
    if (questProgress) {
      // Verificar se atingimos o total necessário
      return questProgress.totalDefeated >= questProgress.requiredDefeats;
    }

    // Se não houver progresso registrado, verificar da maneira antiga
    return (
      !location?.enemies ||
      !location.enemies.some((enemy) => {
        const enemyId = typeof enemy === "object" ? enemy.id : enemy;
        return enemyId === "bandit" || enemyId === "bandit_archer";
      })
    );
  };

  // Ações de movimento
  const handleMove = (locationId) => {
    // Verificar se não podemos sair dos arredores da vila
    if (
      isVillageOutskirts &&
      hasEnemies &&
      !allBanditsDefeated() &&
      locationId === "village_square"
    ) {
      addDialog(
        "Sistema",
        "Você não pode fugir enquanto houverem bandidos na área!"
      );
      return;
    }

    // Mover para a nova localização
    console.log("Movendo para localização:", locationId);
    changeLocation(locationId);
  };

  // Finalizar diálogo com NPC
  const finishDialog = () => {
    setInDialog(false);
    setCurrentNpcId(null);
  };

  // Falar com um NPC
  const handleTalk = (npcId) => {
    console.log("Iniciando diálogo com NPC:", npcId);
    setInDialog(true);
    setCurrentNpcId(npcId);

    // Marcar que falou com o NPC
    if (!talkedToNpcs.includes(npcId)) {
      setTalkedToNpcs([...talkedToNpcs, npcId]);
    }

    // Adicionar diálogo inicial do NPC
    // Implementação específica de diálogos com NPC omitida para brevidade
  };

  // Função para lidar com o combate
  const handleCombat = (enemyId) => {
    console.log(
      "Solicitando início de combate com:",
      typeof enemyId === "object" ? enemyId.id : enemyId
    );

    // Chamar a função onStartCombat passando o ID do inimigo
    onStartCombat(enemyId);
  };

  // Renderizar botões de inimigo
  const renderEnemyButtons = () => {
    if (!location || !location.enemies || location.enemies.length === 0) {
      return null;
    }

    // Para debugging - vamos exibir os contadores atuais no console
    const questProgress = gameState.questProgress?.mission1_2;
    if (isVillageOutskirts && questProgress) {
      console.log("🔢 Contadores de bandidos:", questProgress);
    }

    const buttons = [];

    // Verificar se temos bandidos na localização
    const hasBandits = location.enemies.some((enemy) => {
      const enemyId = typeof enemy === "string" ? enemy : enemy.id;
      return enemyId === "bandit";
    });

    // Verificar se temos arqueiros na localização
    const hasArchers = location.enemies.some((enemy) => {
      const enemyId = typeof enemy === "string" ? enemy : enemy.id;
      return enemyId === "bandit_archer";
    });

    // Se estamos nos arredores da vila e não temos contadores inicializados, inicializar
    if (isVillageOutskirts && !questProgress && (hasBandits || hasArchers)) {
      console.log(
        "📊 Inicializando contadores de bandidos no renderEnemyButtons"
      );
      setGameState((prev) => ({
        ...prev,
        questProgress: {
          ...prev.questProgress,
          mission1_2: {
            banditsDefeated: 0,
            banditArchersDefeated: 0,
            totalDefeated: 0,
            requiredDefeats: 5,
            banditsRemaining: 3,
            banditArchersRemaining: 2,
          },
        },
      }));

      // Adicionar botões para bandidos e arqueiros
      if (hasBandits) {
        const enemyDetails = enemies.find((e) => e.id === "bandit");
        if (enemyDetails) {
          buttons.push(
            <button
              key="bandit"
              onClick={() => handleCombat(enemyDetails)}
              className="bg-[#8b4513]/70 text-[#d4af37] border border-[#8b4513] rounded py-2 px-4 cursor-pointer transition-all duration-300 text-sm text-left hover:bg-[#8b4513]/90 hover:-translate-y-0.5"
            >
              Combater {enemyDetails.name} {enemyDetails.emoji || ""} (Total: 3)
            </button>
          );
        }
      }

      if (hasArchers) {
        const enemyDetails = enemies.find((e) => e.id === "bandit_archer");
        if (enemyDetails) {
          buttons.push(
            <button
              key="bandit_archer"
              onClick={() => handleCombat(enemyDetails)}
              className="bg-[#8b4513]/70 text-[#d4af37] border border-[#8b4513] rounded py-2 px-4 cursor-pointer transition-all duration-300 text-sm text-left hover:bg-[#8b4513]/90 hover:-translate-y-0.5"
            >
              Combater {enemyDetails.name} {enemyDetails.emoji || ""} (Total: 2)
            </button>
          );
        }
      }
    }
    // Se temos contadores, mostrar botões com base nos valores dos contadores
    else if (questProgress) {
      // Mostrar botão para bandidos se ainda houver restantes
      if (questProgress.banditsRemaining > 0 && hasBandits) {
        const enemyDetails = enemies.find((e) => e.id === "bandit");
        if (enemyDetails) {
          buttons.push(
            <button
              key="bandit"
              onClick={() => handleCombat(enemyDetails)}
              className="bg-[#8b4513]/70 text-[#d4af37] border border-[#8b4513] rounded py-2 px-4 cursor-pointer transition-all duration-300 text-sm text-left hover:bg-[#8b4513]/90 hover:-translate-y-0.5"
            >
              Combater {enemyDetails.name} {enemyDetails.emoji || ""}{" "}
              (Restantes: {questProgress.banditsRemaining})
            </button>
          );
        }
      }

      // Mostrar botão para arqueiros se ainda houver restantes
      if (questProgress.banditArchersRemaining > 0 && hasArchers) {
        const enemyDetails = enemies.find((e) => e.id === "bandit_archer");
        if (enemyDetails) {
          buttons.push(
            <button
              key="bandit_archer"
              onClick={() => handleCombat(enemyDetails)}
              className="bg-[#8b4513]/70 text-[#d4af37] border border-[#8b4513] rounded py-2 px-4 cursor-pointer transition-all duration-300 text-sm text-left hover:bg-[#8b4513]/90 hover:-translate-y-0.5"
            >
              Combater {enemyDetails.name} {enemyDetails.emoji || ""}{" "}
              (Restantes: {questProgress.banditArchersRemaining})
            </button>
          );
        }
      }
    }
    // Para outras localizações ou se não temos bandidos/arqueiros, mostrar botões normais
    else {
      // Adicionar todos os outros inimigos
      location.enemies.forEach((enemy) => {
        if (!enemy) return;

        const enemyId = typeof enemy === "string" ? enemy : enemy.id;
        if (!enemyId) return;

        const enemyDetails = enemies.find((e) => e.id === enemyId);
        if (!enemyDetails) return;

        buttons.push(
          <button
            key={enemyId}
            onClick={() => handleCombat(enemyDetails)}
            className="bg-[#8b4513]/70 text-[#d4af37] border border-[#8b4513] rounded py-2 px-4 cursor-pointer transition-all duration-300 text-sm text-left hover:bg-[#8b4513]/90 hover:-translate-y-0.5"
          >
            Combater {enemyDetails.name} {enemyDetails.emoji || ""}
          </button>
        );
      });
    }

    // Adicionar outros inimigos que não são bandidos ou arqueiros
    if (questProgress) {
      location.enemies.forEach((enemy) => {
        if (!enemy) return;

        const enemyId = typeof enemy === "string" ? enemy : enemy.id;
        if (!enemyId || enemyId === "bandit" || enemyId === "bandit_archer")
          return;

        const enemyDetails = enemies.find((e) => e.id === enemyId);
        if (!enemyDetails) return;

        buttons.push(
          <button
            key={enemyId}
            onClick={() => handleCombat(enemyDetails)}
            className="bg-[#8b4513]/70 text-[#d4af37] border border-[#8b4513] rounded py-2 px-4 cursor-pointer transition-all duration-300 text-sm text-left hover:bg-[#8b4513]/90 hover:-translate-y-0.5"
          >
            Combater {enemyDetails.name} {enemyDetails.emoji || ""}
          </button>
        );
      });
    }

    // Verificar se existe um boss nesta localização e mostrar botão especial
    if (location.boss) {
      console.log("🔍 Boss encontrado na localização:", location.boss);
      const bossId = location.boss;
      const bossDetails = enemies.find((e) => e.id === bossId);

      if (bossDetails) {
        console.log("📊 Detalhes do boss:", bossDetails);

        // Se for Garrick, verificar se a missão de bandidos foi completada
        if (bossId === "garrick") {
          const isMissionComplete =
            questProgress &&
            questProgress.totalDefeated >= questProgress.requiredDefeats;

          if (isMissionComplete) {
            console.log(
              "🎯 Missão de bandidos completa, exibindo Garrick como opção de combate"
            );
            buttons.push(
              <button
                key={bossId}
                onClick={() => handleCombat(bossDetails)}
                className="bg-[#993333]/70 text-[#d4af37] border-2 border-[#d4af37] rounded py-2 px-4 cursor-pointer transition-all duration-300 text-sm text-left hover:bg-[#993333]/90 hover:-translate-y-0.5 font-bold"
              >
                ⚔️ Enfrentar Boss: {bossDetails.name} {bossDetails.emoji || ""}
              </button>
            );
          }
        } else {
          // Para outros bosses, mostrar normalmente
          buttons.push(
            <button
              key={bossId}
              onClick={() => handleCombat(bossDetails)}
              className="bg-[#993333]/70 text-[#d4af37] border-2 border-[#d4af37] rounded py-2 px-4 cursor-pointer transition-all duration-300 text-sm text-left hover:bg-[#993333]/90 hover:-translate-y-0.5 font-bold"
            >
              ⚔️ Enfrentar Boss: {bossDetails.name} {bossDetails.emoji || ""}
            </button>
          );
        }
      }
    }

    // Adicionar informação de progresso da missão
    if (isVillageOutskirts && questProgress) {
      buttons.push(
        <div
          key="mission-progress"
          className="bg-[#8b4513]/50 text-[#d4af37] border border-[#8b4513] rounded py-2 px-4 text-sm mt-2"
        >
          Progresso da missão: {questProgress.totalDefeated}/
          {questProgress.requiredDefeats} bandidos derrotados
        </div>
      );
    }

    return buttons;
  };

  // Renderizar botões de NPC
  const renderNpcButtons = () => {
    if (!hasNPCs) {
      return null;
    }

    return location.npcs.map((npcId) => {
      const npcData = npcs.find((npc) => npc.id === npcId);
      if (!npcData) return null;

      return (
        <button
          key={npcId}
          onClick={() => handleTalk(npcId)}
          className="bg-[#8b4513]/70 text-[#d4af37] border border-[#8b4513] rounded py-2 px-4 cursor-pointer transition-all duration-300 text-sm text-left hover:bg-[#8b4513]/90 hover:-translate-y-0.5"
        >
          Falar com {npcData.name}
        </button>
      );
    });
  };

  // Renderizar botões de localização
  const renderLocationButtons = () => {
    if (!hasConnectedLocations) {
      return null;
    }

    // Filtrar localizações conectadas (não permitir sair dos arredores da vila se houver bandidos)
    const filteredLocations = location.connectedLocations.filter((loc) => {
      if (
        isVillageOutskirts &&
        hasEnemies &&
        !allBanditsDefeated() &&
        loc.id === "village_square"
      ) {
        return false;
      }
      return true;
    });

    if (filteredLocations.length === 0) {
      return null;
    }

    return filteredLocations.map((loc) => (
      <button
        key={loc.id}
        onClick={() => handleMove(loc.id)}
        className="bg-[#8b4513]/70 text-[#d4af37] border border-[#8b4513] rounded py-2 px-4 cursor-pointer transition-all duration-300 text-sm text-left hover:bg-[#8b4513]/90 hover:-translate-y-0.5"
      >
        {loc.name}
      </button>
    ));
  };

  // Modificar o componente para ser responsivo
  return (
    <div className="bg-black/70 border border-[#8b4513] rounded-lg p-4 h-full flex flex-col gap-4 overflow-y-auto">
      {/* Renderizar diálogo com NPC se estiver em diálogo */}
      {inDialog && currentNpcId && (
        <div className="flex flex-col gap-2">
          <h4 className="text-[#d4af37] text-base border-b border-[#8b4513] pb-1">
            Diálogo:
          </h4>
          <button
            onClick={finishDialog}
            className="bg-[#8b4513]/70 text-[#d4af37] border border-[#8b4513] rounded py-2 px-4 cursor-pointer transition-all duration-300 text-sm hover:bg-[#8b4513]/90 hover:-translate-y-0.5 w-full md:w-auto"
          >
            Finalizar Conversa
          </button>
        </div>
      )}

      {/* Renderizar botões de movimento se não estiver em diálogo */}
      {!inDialog && hasConnectedLocations && (
        <div className="flex flex-col gap-1.5">
          <h4 className="text-[#d4af37] text-base m-1 border-b border-[#8b4513] pb-1">
            Viajar para:
          </h4>

          {/* Mostrar aviso quando estiver nos arredores da vila e houver inimigos */}
          {isVillageOutskirts && hasEnemies && !allBanditsDefeated() && (
            <p className="text-red-500 text-sm mb-2 italic">
              Você não pode fugir desse local enquanto houverem bandidos
            </p>
          )}

          <div className="grid grid-cols-1 gap-1.5">
            {renderLocationButtons()}
          </div>
        </div>
      )}

      {/* Renderizar botões de combate se não estiver em diálogo */}
      {!inDialog && hasEnemies && (
        <div className="flex flex-col gap-1.5">
          <h4 className="text-[#d4af37] text-base m-1 border-b border-[#8b4513] pb-1">
            Combater:
          </h4>
          <div className="grid grid-cols-1 gap-1.5">{renderEnemyButtons()}</div>
        </div>
      )}

      {/* Renderizar botões de conversa se não estiver em diálogo */}
      {!inDialog && hasNPCs && (
        <div className="flex flex-col gap-1.5">
          <h4 className="text-[#d4af37] text-base m-1 border-b border-[#8b4513] pb-1">
            Conversar:
          </h4>
          <div className="grid grid-cols-1 gap-1.5">{renderNpcButtons()}</div>
        </div>
      )}
    </div>
  );
};

export default ActionMenuFixed;
