import React, { useState, useEffect } from "react";
import { useGame } from "../../context/GameContext";
import { locations } from "../../data/locations";
import { npcs } from "../../data/npcs";
import { enemies } from "../../data/enemies";
import { items } from "../../data/items";

const ActionMenu = ({ location, onStartCombat }) => {
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
  } = useGame();

  // Estado para controlar se está em diálogo com um NPC
  const [inDialog, setInDialog] = useState(false);
  const [currentNpcId, setCurrentNpcId] = useState(null);

  // Estado para rastrear NPCs com quem já conversou na sessão atual para uso interno
  const [talkedToNpcs, setTalkedToNpcs] = useState([]);

  // Estado para controlar erro de localização
  const [locationError, setLocationError] = useState(false);

  // Obter a fase atual
  const currentPhase = phases[gameState.currentPhase];

  // Verificar se location é válido - sem early return para evitar problemas com hooks
  const locationValid = !!location;

  // Todas as verificações de localização precisam usar operador opcional (?) para segurança
  // Verificar se a localização atual tem NPCs
  const hasNPCs = locationValid && location?.npcs && location.npcs.length > 0;

  // Verificar se a localização atual tem inimigos
  const hasEnemies =
    locationValid && location?.enemies && location.enemies.length > 0;

  // Verificar se a localização atual tem locais conectados
  const hasConnectedLocations =
    locationValid &&
    location?.connectedLocations &&
    location.connectedLocations.length > 0;

  // Log para debug - verificar NPCs disponíveis (só se location for válido)
  if (locationValid) {
    console.log("NPCs na localização atual:", location?.npcs || []);
    console.log("Localização atual:", location?.id || "desconhecida");
  } else {
    console.error("Location é null ou undefined em ActionMenu!");
    setLocationError(true);
  }

  // Verificar se a localização atual tem itens para coletar
  const hasItems = false; // Temporariamente desativado conforme solicitado

  // Verificar se estamos nos arredores da vila
  const isVillageOutskirts =
    locationValid && location?.id === "village_outskirts";

  // Verificar se estamos na praça da vila
  const isVillageSquare = locationValid && location?.id === "village_square";

  // Verificar se estamos na Vila de Ravenwood (village ou village_square)
  const isVillage =
    locationValid &&
    (location?.id === "village" || location?.id === "village_square");

  // Verificar se todos os bandidos foram derrotados
  const allBanditsDefeated = () => {
    // Verificar se a missão de derrotar bandidos está completa
    return gameState.questLog.some((q) => q.id === "mission1_2" && q.completed);
  };

  // Efeito para verificar e adicionar Garrick quando os bandidos forem derrotados
  useEffect(() => {
    // Não precisamos mais fazer nada aqui, pois a lógica foi simplificada no renderEnemyButtons
    // O código antigo estava causando problemas com o estado do jogo
  }, []);

  // Se temos erro de localização, mostrar mensagem de erro
  if (locationError) {
    return <div className="text-red-500">Erro ao carregar o menu de ações</div>;
  }

  // Ações de movimento
  const handleMove = (locationId) => {
    // Verificar se o jogador está tentando sair dos arredores da vila enquanto há bandidos
    if (isVillageOutskirts && hasEnemies) {
      addDialog(
        "Sistema",
        "Você não pode fugir desse local enquanto houverem bandidos. Derrote-os primeiro!"
      );
      return;
    }

    // Limpar diálogos anteriores
    setGameState((prev) => ({
      ...prev,
      dialogHistory: [],
    }));

    // Implementar lógica de movimento
    changeLocation(locationId);

    // Se estiver indo para os arredores da vila, adicionar descrição sem imagem
    if (locationId === "village_outskirts") {
      setTimeout(() => {
        addDialog(
          "Narrador",
          "Ao chegar nos arredores da vila, você se depara com uma cena devastadora. Casas estão em chamas, moradores correm desesperados enquanto bandidos saqueiam o que resta."
        );

        // Adicionar mais detalhes para criar atmosfera
        setTimeout(() => {
          addDialog(
            "Narrador",
            "Gritos de socorro ecoam pelo ar. Você vê bandidos armados ameaçando os moradores e roubando seus pertences. A situação é crítica e exige ação imediata."
          );
        }, 1000);
      }, 500);
    }
    // Se estiver indo para a Vila de Ravenwood, adicionar descrição
    else if (locationId === "village_square") {
      setTimeout(() => {
        addDialog(
          "Narrador",
          "Você chega à Vila de Ravenwood, uma pequena vila pacífica nos confins do reino. O centro da vila tem uma fonte de pedra e bancos onde os moradores costumam se reunir."
        );

        // Adicionar mais detalhes para criar atmosfera
        setTimeout(() => {
          addDialog(
            "Narrador",
            "Você vê algumas casas simples, uma taverna chamada Javali Dourado e a cabana do Mestre Thorne. O ar está fresco e o sol brilha sobre os telhados das casas."
          );
        }, 1000);
      }, 500);
    }
  };

  // Finalizar diálogo
  const finishDialog = () => {
    setInDialog(false);
    setCurrentNpcId(null);
  };

  // Ações de interação com NPCs
  const handleTalk = (npc) => {
    // Se npc for uma string (ID), encontrar o objeto NPC correspondente
    if (typeof npc === "string") {
      const npcDetails = npcs.find((n) => n.id === npc);
      if (!npcDetails) {
        console.error(`NPC não encontrado: ${npc}`);
        return;
      }
      npc = npcDetails;
    }

    // Marcar que está em diálogo
    setInDialog(true);
    setCurrentNpcId(npc.id);

    // Registrar que conversou com este NPC (para uso interno)
    if (!talkedToNpcs.includes(npc.id)) {
      setTalkedToNpcs([...talkedToNpcs, npc.id]);
    }

    // Implementar lógica de diálogo com NPCs
    const npcName = npc.name.replace(/_/g, " ");

    // Formatar o nome do NPC para exibição
    const formattedName = npcName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Adicionar diálogo inicial
    addDialog(formattedName, `Olá, aventureiro! Como posso ajudá-lo?`);

    // Adicionar diálogo específico do NPC
    if (npc.id === "mestre_thorne") {
      // Verificar se a missão 1 já foi completada
      const mission1Completed = gameState.questLog.some(
        (q) => q.id === "mission1_1" && q.completed
      );

      // Verificar se a missão 2 já foi completada
      const mission2Completed = gameState.questLog.some(
        (q) => q.id === "mission1_2" && q.completed
      );

      // Verificar se a missão 2 já foi aceita mas não completada
      const mission2Active = gameState.questLog.some(
        (q) => q.id === "mission1_2" && !q.completed
      );

      if (!mission1Completed) {
        // Primeira conversa - Missão 1
        addDialog(
          "Mestre Thorne",
          "Ah, meu jovem aprendiz! O destino finalmente o chama para a aventura."
        );

        setTimeout(() => {
          addDialog(
            "Mestre Thorne",
            "Os sinais estão claros. Você tem a marca do herói que salvará nosso reino de Elbion da escuridão que se aproxima."
          );
        }, 1000);

        setTimeout(() => {
          addDialog(
            "Mestre Thorne",
            "Mas antes de partir em sua jornada, você deve provar seu valor aqui em Ravenwood. Os bandidos têm atacado nossa vila com frequência."
          );
        }, 2000);

        // Verificar se há uma missão relacionada a este NPC e se ela já foi completada
        // Verificar tanto na fase atual quanto no estado do jogo
        const missionCompleted = gameState.questLog.some(
          (q) => q.id === "mission1_1" && q.completed
        );

        const relatedMission = currentPhase?.missions?.find(
          (mission) =>
            mission.id === "mission1_1" &&
            !mission.completed &&
            !missionCompleted
        );

        if (relatedMission && !missionCompleted) {
          setTimeout(() => {
            addDialog(
              "Mestre Thorne",
              "Derrote os bandidos que estão nos arredores da vila. Seu líder, Garrick, deve ser encontrado e derrotado para garantir a segurança de nossa vila."
            );

            // Completar a missão 1
            completeMission("mission1_1");

            // Adicionar experiência ao jogador (50 XP conforme mencionado no diálogo)
            gainExperience(50);

            addDialog(
              "Sistema",
              `Missão completada: ${relatedMission.name}. Você ganhou 50 de experiência.`
            );

            // Adicionar a próxima missão (missão dos bandidos)
            setTimeout(() => {
              // Verificar se a missão 2 já existe no registro de missões
              const mission2Exists = gameState.questLog.some(
                (q) => q.id === "mission1_2"
              );

              if (!mission2Exists) {
                // Adicionar a missão 2 ao registro de missões
                const mission2 = currentPhase?.missions?.find(
                  (m) => m.id === "mission1_2"
                );

                if (mission2) {
                  // Usar a nova função addMission
                  const added = addMission("mission1_2");

                  if (added) {
                    addDialog(
                      "Sistema",
                      `Nova missão: ${mission2.name} - ${mission2.description}`
                    );

                    // Aqui seria ideal ter uma função para adicionar missão ao questLog
                    // Como não temos acesso direto, vamos apenas informar ao jogador
                    addDialog(
                      "Mestre Thorne",
                      "Esta é sua primeira missão real: elimine os bandidos que estão atacando nossa vila. Eles estão nos arredores, e seu líder, Garrick, deve ser encontrado e derrotado."
                    );
                  }
                }
              }
            }, 1000);

            // Garantir que os arredores da vila estejam conectados à localização atual
            const hasVillageOutskirts = location.connectedLocations.some(
              (loc) => loc.id === "village_outskirts"
            );

            if (!hasVillageOutskirts) {
              addDialog(
                "Sistema",
                "Novo local descoberto: Arredores da Vila. Você pode viajar para lá a partir da vila."
              );

              // Adicionar APENAS os arredores da vila como local conectado
              // Remover todas as conexões existentes e adicionar apenas a que queremos
              const newConnections = [
                {
                  id: "village_outskirts",
                  name: "Arredores da Vila 🌄",
                  description:
                    "Os arredores da vila, onde campos cultivados encontram a floresta. Recentemente, bandidos têm sido vistos nesta área.",
                },
              ];

              // Forçar uma atualização da interface
              if (typeof updateLocationConnections === "function") {
                updateLocationConnections(location.id, newConnections);
              }
            }

            setTimeout(() => {
              addDialog(
                "Mestre Thorne",
                "Quando estiver pronto, visite os arredores da vila para enfrentar os bandidos. Boa sorte, jovem herói!"
              );

              // Sugerir ao jogador que vá para os arredores da vila
              setTimeout(() => {
                addDialog(
                  "Sistema",
                  "Dica: Vá para os Arredores da Vila para enfrentar os bandidos."
                );

                // Finalizar o diálogo após 1 segundo
                setTimeout(() => {
                  finishDialog();
                }, 1000);
              }, 1000);
            }, 1000);
          }, 3000);
        } else {
          setTimeout(() => {
            addDialog(
              "Mestre Thorne",
              "Continue sua jornada, jovem herói. Lembre-se de que o destino de Elbion pode depender de suas ações."
            );

            // Finalizar o diálogo após 1 segundo
            setTimeout(() => {
              finishDialog();
            }, 1000);
          }, 3000);
        }
      } else if (mission1Completed && !mission2Completed && !mission2Active) {
        // Missão 1 completada, dar a missão 2
        addDialog(
          "Mestre Thorne",
          "Ah, você voltou! Está pronto para sua primeira missão real?"
        );

        setTimeout(() => {
          addDialog(
            "Mestre Thorne",
            "Os bandidos têm atacado nossa vila com frequência. Precisamos que você os derrote e encontre seu líder, Garrick."
          );
        }, 1000);

        setTimeout(() => {
          addDialog(
            "Mestre Thorne",
            "Elimine os bandidos nos arredores da vila. Quando derrotar todos eles, poderemos descobrir onde seu líder se esconde."
          );

          // Adicionar a missão 2 ao registro de missões
          const mission2 = currentPhase?.missions?.find(
            (m) => m.id === "mission1_2"
          );

          if (mission2) {
            // Usar a nova função addMission
            const added = addMission("mission1_2");

            if (added) {
              setTimeout(() => {
                addDialog(
                  "Sistema",
                  `Nova missão: ${mission2.name} - ${mission2.description}`
                );

                // Sugerir ao jogador que vá para os arredores da vila
                setTimeout(() => {
                  addDialog(
                    "Sistema",
                    "Dica: Vá para os Arredores da Vila para enfrentar os bandidos."
                  );

                  // Finalizar o diálogo após 1 segundo
                  setTimeout(() => {
                    finishDialog();
                  }, 1000);
                }, 1000);
              }, 1000);
            } else {
              // Finalizar o diálogo após 1 segundo
              setTimeout(() => {
                finishDialog();
              }, 1000);
            }
          }
        }, 2000);
      } else if (mission2Active) {
        // Missão 2 em andamento
        addDialog(
          "Mestre Thorne",
          "Você ainda não eliminou todos os bandidos? A vila continua em perigo enquanto eles estiverem por perto."
        );

        setTimeout(() => {
          addDialog(
            "Mestre Thorne",
            "Lembre-se, você precisa derrotar os bandidos nos arredores da vila e depois encontrar e eliminar seu líder, Garrick."
          );

          // Finalizar o diálogo após 1 segundo
          setTimeout(() => {
            finishDialog();
          }, 1000);
        }, 1000);
      } else {
        // Missão 2 completada
        addDialog(
          "Mestre Thorne",
          "Excelente trabalho eliminando os bandidos! Você provou seu valor como um verdadeiro herói."
        );

        setTimeout(() => {
          addDialog(
            "Mestre Thorne",
            "Continue sua jornada, jovem herói. Lembre-se de que o destino de Elbion pode depender de suas ações."
          );

          // Finalizar o diálogo após 1 segundo
          setTimeout(() => {
            finishDialog();
          }, 1000);
        }, 1000);
      }
    } else if (npc.id === "comerciante_gorn") {
      // Temporariamente desabilitado conforme solicitado
      addDialog(
        "Comerciante Gorn",
        "Estou ocupado no momento. Volte depois de falar com o Mestre Thorne."
      );

      // Finalizar o diálogo após 1 segundo
      setTimeout(() => {
        finishDialog();
      }, 1000);
    } else if (npc.id === "estalajadeiro_bram") {
      // Temporariamente desabilitado conforme solicitado
      addDialog(
        "Estalajadeiro Bram",
        "Estou ocupado no momento. Volte depois de falar com o Mestre Thorne."
      );

      // Finalizar o diálogo após 1 segundo
      setTimeout(() => {
        finishDialog();
      }, 1000);
    } else if (npc.id === "historiador_anzu") {
      // Diálogo específico para o Historiador Anzu
      addDialog(
        "Historiador Anzu",
        "Hah! Vocês acham que qualquer um pode simplesmente ouvir essa história? Vá falar com Throne... quem sabe um dia eu conto a história dos lendários heróis de Iphanewa, há muito tempo esquecidos."
      );

      // Finalizar o diálogo após 2 segundos
      setTimeout(() => {
        finishDialog();
      }, 2000);
    } else {
      addDialog(formattedName, "Olá, aventureiro! Como posso ajudá-lo?");

      setTimeout(() => {
        addDialog(
          formattedName,
          "Tenha cuidado em suas aventuras. Os tempos estão perigosos e há rumores de guerra no horizonte."
        );

        // Finalizar o diálogo após 1 segundo
        setTimeout(() => {
          finishDialog();
        }, 1000);
      }, 1000);
    }
  };

  // Função para lidar com o combate
  const handleCombat = (enemyId) => {
    console.log(
      "Solicitando início de combate com:",
      typeof enemyId === "object" ? enemyId.id : enemyId
    );

    // Identificar especificamente se estamos iniciando combate com Garrick
    const isGarrick =
      typeof enemyId === "object"
        ? enemyId.id === "garrick"
        : enemyId === "garrick";

    if (isGarrick) {
      console.log("👹 Iniciando combate com Garrick, líder dos bandidos!");

      // Mensagem especial para o início do combate com Garrick
      addDialog(
        "Garrick",
        "Então você é o tolo que está derrotando meus homens? Vamos ver se consegue sobreviver ao meu ataque!"
      );

      setTimeout(() => {
        // Chamar a função onStartCombat passando o ID do inimigo após a mensagem
        onStartCombat(enemyId);
      }, 1500);
    } else {
      // Para outros inimigos, iniciar o combate normalmente
      onStartCombat(enemyId);
    }
  };

  // Ações de coleta
  const handlePickup = (item) => {
    // Adicionar item ao inventário
    addToInventory(item);

    // Remover item da localização
    if (location.items) {
      location.items = location.items.filter((i) =>
        typeof i === "object" ? i.id !== item.id : i !== item.id
      );
    }

    // Adicionar diálogo
    const itemName =
      typeof item === "object"
        ? item.name
        : item
            .replace(/_/g, " ")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

    addDialog("Narrador", `Você coletou ${itemName}.`);

    // Verificar se há missões relacionadas a este item
    const relatedMission = currentPhase?.missions?.find(
      (mission) =>
        mission.type === "collect_item" &&
        mission.targetId === (typeof item === "object" ? item.id : item) &&
        !mission.completed
    );

    if (relatedMission) {
      completeMission(relatedMission.id);
      addDialog(
        "Sistema",
        `Missão completada: ${relatedMission.name}. Você ganhou ${relatedMission.reward.experience} de experiência.`
      );

      // Dar recompensa
      if (relatedMission.reward.gold) {
        updateGold(relatedMission.reward.gold);
        addDialog(
          "Sistema",
          `Você recebeu ${relatedMission.reward.gold} de ouro como recompensa.`
        );
      }
    }
  };

  // Renderizar botões de inimigo
  const renderEnemyButtons = () => {
    // Verificação de segurança - se location for null/undefined ou location.enemies não existir, retornar null
    if (!location || !Array.isArray(location.enemies)) {
      console.log(
        "⚠️ location ou location.enemies inválido em renderEnemyButtons"
      );
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

      // Adicionar botões para bandidos e arqueiros sem contadores, para evitar recarregar
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
    else if (isVillageOutskirts && questProgress) {
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

      // Verificar se todos os bandidos foram derrotados para mostrar Garrick
      if (questProgress.totalDefeated >= questProgress.requiredDefeats) {
        console.log(
          "🏆 Todos os bandidos foram derrotados! Verificando se Garrick deve aparecer..."
        );

        // Verificar se Garrick já está na lista de inimigos da localização
        const hasGarrick = location.enemies?.some((enemy) =>
          typeof enemy === "string"
            ? enemy === "garrick"
            : enemy.id === "garrick"
        );

        // Verificar se Garrick existe especificamente na lista ou se já foi adicionado manualmente
        const garrickDetails = enemies.find((e) => e.id === "garrick");

        if (!hasGarrick && garrickDetails) {
          console.log(
            "👹 Garrick não encontrado! Adicionando manualmente no ActionMenu!"
          );

          // SOLUÇÃO SIMPLIFICADA: Adicionamos diretamente o botão de combate para Garrick
          buttons.push(
            <button
              key="garrick"
              onClick={() => handleCombat(garrickDetails)}
              className="bg-[#d4af37] text-[#8b4513] border-2 border-[#8b4513] rounded py-3 px-4 cursor-pointer transition-all duration-300 text-sm text-left font-bold hover:bg-[#d4af37]/80 hover:-translate-y-0.5 animate-pulse shadow-md shadow-amber-700/50 my-2"
            >
              <div className="flex items-center justify-between">
                <span className="flex-1">
                  ⚔️ Combater {garrickDetails.name} {garrickDetails.emoji || ""}
                </span>
                <span className="text-red-700 font-bold text-xs bg-amber-200 px-2 py-1 rounded animate-bounce">
                  NOVO!
                </span>
              </div>
            </button>
          );

          // Se é a primeira vez que Garrick aparece, exibir uma mensagem dramática
          if (!localStorage.getItem("garrick_appeared")) {
            localStorage.setItem("garrick_appeared", "true");

            // Adicionar mensagem após um pequeno atraso
            setTimeout(() => {
              addDialog(
                "Narrador",
                "Após derrotar o último bandido, você ouve uma risada maligna ecoando. Garrick, o líder dos bandidos, aparece ao longe. 'Então você é o herói que está matando meus homens? Vamos ver do que você é capaz!'"
              );

              setTimeout(() => {
                addDialog(
                  "Sistema",
                  "Garrick, o líder dos bandidos, apareceu! Derrote-o para completar a missão."
                );
              }, 1000);
            }, 500);
          }
        }
      }
    }
    // Para outras localizações ou se não estamos nos arredores da vila, mostrar os inimigos normalmente
    else {
      location.enemies.forEach((enemy) => {
        if (!enemy) return;

        const enemyId = typeof enemy === "string" ? enemy : enemy.id;
        if (!enemyId) return;

        // Encontrar os detalhes do inimigo
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

    return buttons;
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
          {isVillageOutskirts && hasEnemies && (
            <p className="text-red-500 text-sm mb-2 italic">
              Você não pode fugir desse local enquanto houverem bandidos
            </p>
          )}

          <div className="grid grid-cols-1 gap-1.5">
            {location.connectedLocations
              .filter((loc) => {
                // Se estamos nos arredores da vila, não mostrar a opção de ir para a Praça da Vila
                if (
                  location.id === "village_outskirts" &&
                  loc.id === "village_square"
                ) {
                  return false;
                }
                return true;
              })
              .map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => handleMove(loc.id)}
                  className={`bg-[#8b4513]/70 text-[#d4af37] border border-[#8b4513] rounded py-2 px-4 cursor-pointer transition-all duration-300 text-sm text-left hover:bg-[#8b4513]/90 hover:-translate-y-0.5 ${
                    isVillageOutskirts && hasEnemies
                      ? "opacity-50 cursor-not-allowed hover:bg-[#8b4513]/70 hover:translate-y-0"
                      : ""
                  }`}
                  title={loc.description || ""}
                  disabled={isVillageOutskirts && hasEnemies}
                >
                  {loc.name}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Renderizar botões de NPC se não estiver em diálogo */}
      {!inDialog && (hasNPCs || isVillage) && (
        <div className="flex flex-col gap-1.5">
          <h4 className="text-[#d4af37] text-base m-1 border-b border-[#8b4513] pb-1">
            Falar com:
          </h4>
          <div className="grid grid-cols-1 gap-1.5">
            {/* Adicionar Historiador Anzu manualmente se estamos na Vila de Ravenwood */}
            {isVillage && (
              <button
                key="historiador_anzu"
                onClick={() => handleTalk("historiador_anzu")}
                className="bg-[#8b4513]/70 text-[#d4af37] border border-[#8b4513] rounded py-2 px-4 cursor-pointer transition-all duration-300 text-sm text-left hover:bg-[#8b4513]/90 hover:-translate-y-0.5"
              >
                Historiador Anzu
              </button>
            )}

            {location.npcs &&
              location.npcs.map((npc) => (
                <button
                  key={typeof npc === "object" ? npc.id : npc}
                  onClick={() => handleTalk(npc)}
                  className="bg-[#8b4513]/70 text-[#d4af37] border border-[#8b4513] rounded py-2 px-4 cursor-pointer transition-all duration-300 text-sm text-left hover:bg-[#8b4513]/90 hover:-translate-y-0.5"
                >
                  {typeof npc === "object"
                    ? npc.name
                    : npc
                        .replace(/_/g, " ")
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Renderizar botões de inimigo se não estiver em diálogo */}
      {!inDialog && hasEnemies && (
        <div className="flex flex-col gap-1.5">
          <h4 className="text-[#d4af37] text-base m-1 border-b border-[#8b4513] pb-1">
            Combater:
          </h4>
          <div className="grid grid-cols-1 gap-1.5">{renderEnemyButtons()}</div>
        </div>
      )}

      {/* Removido completamente conforme solicitado */}
    </div>
  );
};

export default ActionMenu;
