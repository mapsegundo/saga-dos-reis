import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useGame } from "../context/GameContext";
import CombatScreen from "./game/CombatScreen";

// Importar dados
import { enemies as enemiesData } from "../data/enemies";

// Importar imagens
import enemyImages from "../assets/images/enemies";
import classImages from "../assets/images/classes";

const CombatPageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 40px;
  background-color: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  z-index: 100;
  overflow: auto;
`;

const CombatWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  height: 90%;
  background-color: rgba(0, 0, 0, 0.8);
  border: 2px solid #8b4513;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(139, 69, 19, 0.7);
  overflow: auto;
  max-height: 100%;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    height: 95%;
  }
`;

const LoadingMessage = styled.h2`
  color: #d4af37;
  text-align: center;
  margin-top: 50px;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  text-align: center;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReturnButton = styled.button`
  padding: 10px 20px;
  background-color: #8b4513;
  color: #d4af37;
  border: 1px solid #d4af37;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #a0522d;
  }
`;

const CombatPage = () => {
  const navigate = useNavigate();
  const { id: enemyId } = useParams();
  const {
    gameState,
    setGameState,
    player,
    updateMana,
    setHealth,
    gainExperience,
    updateGold,
    addToInventory,
    completeMission,
    endGame,
  } = useGame();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentEnemy, setCurrentEnemy] = useState(null);
  const [processedEnemy, setProcessedEnemy] = useState(null);

  // Usar useRef para controlar o estado de conclusão do combate
  const combatFinished = useRef(false);

  // Gerar um ID único para este combate
  const combatId = useRef(
    `combat_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  ).current;

  // Referência para controlar se o componente está montado
  const isMounted = useRef(true);

  // Efeito para limpar a referência quando o componente for desmontado
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Efeito para processar o inimigo
  useEffect(() => {
    console.log("CombatPage - Verificando inimigo:", currentEnemy);

    // Se o componente já foi desmontado, não fazer nada
    if (!isMounted.current) {
      return;
    }

    if (!currentEnemy) {
      console.log(
        "CombatPage - Nenhum inimigo encontrado, redirecionando para o jogo"
      );
      setError(true);
      return;
    }

    try {
      // Processar o inimigo
      let enemyObject = null;

      if (typeof currentEnemy === "string") {
        // Se for uma string, buscar o objeto do inimigo
        console.log("CombatPage - Buscando inimigo por ID:", currentEnemy);
        enemyObject = enemiesData.find((e) => e.id === currentEnemy);

        if (!enemyObject) {
          console.error(`Inimigo não encontrado: ${currentEnemy}`);
          setError(true);
          return;
        }

        // Atualizar o estado do jogo com o objeto do inimigo
        console.log(
          "CombatPage - Atualizando inimigo de string para objeto:",
          enemyObject
        );
        setGameState((prev) => ({
          ...prev,
          currentEnemy: enemyObject,
        }));
      } else {
        // Se já for um objeto, usar diretamente
        enemyObject = currentEnemy;
      }

      // Garantir que o objeto do inimigo tenha todas as propriedades necessárias
      if (!enemyObject.health) {
        console.error("Inimigo sem propriedade health:", enemyObject);

        // Tentar buscar o template do inimigo
        const enemyTemplate = enemiesData.find((e) => e.id === enemyObject.id);

        if (enemyTemplate && enemyTemplate.health) {
          // Usar o template para completar as propriedades ausentes
          enemyObject = {
            ...enemyTemplate,
            ...enemyObject,
          };
          console.log(
            "CombatPage - Inimigo corrigido com template:",
            enemyObject
          );
        } else {
          setError(true);
          return;
        }
      }

      // Garantir que o inimigo tenha uma propriedade rewards para manter consistência
      if (!enemyObject.rewards) {
        console.log("Criando objeto rewards para o inimigo:", enemyObject.id);
        enemyObject.rewards = {
          exp: enemyObject.experience || 0,
          gold: enemyObject.gold || 0,
          items: enemyObject.items || [],
        };
      }

      // Verificar se as recompensas estão presentes
      console.log("Verificando recompensas do inimigo:");
      console.log(
        "- Experiência:",
        enemyObject.rewards?.exp || enemyObject.experience
      );
      console.log("- Ouro:", enemyObject.rewards?.gold || enemyObject.gold);
      console.log("- Itens:", enemyObject.rewards?.items || enemyObject.items);

      // Definir o inimigo processado apenas se o componente ainda estiver montado
      if (isMounted.current) {
        setProcessedEnemy(enemyObject);
        console.log(
          "CombatPage - Inimigo processado com sucesso:",
          enemyObject
        );
      }
    } catch (error) {
      console.error("Erro ao processar inimigo:", error);
      if (isMounted.current) {
        setError(true);
      }
    }
  }, [currentEnemy, setGameState]);

  // Efeito para limpar o inimigo quando o componente for desmontado
  useEffect(() => {
    return () => {
      if (!combatFinished.current && currentEnemy) {
        console.log("Componente CombatPage desmontado sem finalizar o combate");
        // Limpar o inimigo atual para evitar problemas
        setGameState((prev) => ({
          ...prev,
          currentEnemy: null,
        }));
      }
    };
  }, [combatFinished, currentEnemy, setGameState]);

  // Função para lidar com o fim do combate
  const handleCombatEnd = (victory) => {
    // Forçar o tipo para boolean para evitar problemas
    const resultadoFinal = victory === true;

    // Evitar múltiplas chamadas usando useRef em vez de estado
    if (combatFinished.current) {
      console.log("Combate já foi finalizado, redirecionando para o jogo");
      // Mesmo que o combate já tenha sido finalizado, ainda precisamos redirecionar
      navigate("/game");
      return;
    }

    // Marcar o combate como finalizado imediatamente
    combatFinished.current = true;

    console.log(
      "Combate finalizado com resultado:",
      resultadoFinal ? "vitória" : "derrota",
      "ID do combate:",
      combatId
    );

    if (resultadoFinal && processedEnemy) {
      console.log(
        "⚠️ PROCESSANDO VITÓRIA - Garantindo que não ocorra game over"
      );

      // =========== SISTEMA DE RECOMPENSAS AJUSTADO ===========

      // 1. EXPERIÊNCIA - Sempre ganha baseado no nível e dificuldade do inimigo
      // Garantir sempre uma recompensa mínima de experiência
      const baseExp = processedEnemy.level ? processedEnemy.level * 15 : 15;
      // Verificar se há recompensa definida ou usar valor calculado
      const expReward =
        processedEnemy.rewards?.exp || processedEnemy.experience || baseExp;

      console.log("Concedendo experiência:", expReward);
      // A função gainExperience já adiciona a mensagem de experiência ao diálogo
      gainExperience(expReward);

      // 2. OURO - 70% de chance de ganhar ouro
      if (Math.random() < 0.7) {
        // Garantir sempre uma recompensa mínima de ouro
        const baseGold = processedEnemy.level ? processedEnemy.level * 5 : 5;
        // Verificar se há recompensa definida ou usar valor calculado
        const goldReward =
          processedEnemy.rewards?.gold || processedEnemy.gold || baseGold;

        console.log("Concedendo ouro:", goldReward);
        updateGold(goldReward);

        // Adicionar mensagem ao diálogo
        setGameState((prev) => ({
          ...prev,
          dialogHistory: [
            ...prev.dialogHistory,
            {
              speaker: "Sistema",
              text: `Você ganhou ${goldReward} moedas de ouro!`,
            },
          ],
        }));
      }

      // 3. POÇÕES - Usando sistema de chance baseado no nível do inimigo
      // Chance de poção de cura (30% base + 5% por nível do inimigo, máximo 50%)
      const healthPotionChance = Math.min(
        0.3 + (processedEnemy.level || 1) * 0.05,
        0.5
      );
      if (Math.random() < healthPotionChance) {
        console.log("Concedendo poção de cura");
        addToInventory("health_potion", 1);

        setGameState((prev) => ({
          ...prev,
          dialogHistory: [
            ...prev.dialogHistory,
            {
              speaker: "Sistema",
              text: "Você encontrou uma Poção de Cura 🧪!",
            },
          ],
        }));
      }

      // Chance de poção de mana (20% base + 3% por nível do inimigo, máximo 35%)
      const manaPotionChance = Math.min(
        0.2 + (processedEnemy.level || 1) * 0.03,
        0.35
      );
      if (Math.random() < manaPotionChance) {
        console.log("Concedendo poção de mana");
        addToInventory("mana_potion", 1);

        setGameState((prev) => ({
          ...prev,
          dialogHistory: [
            ...prev.dialogHistory,
            {
              speaker: "Sistema",
              text: "Você encontrou uma Poção de Mana ✨!",
            },
          ],
        }));
      }

      // 4. ITENS ESPECÍFICOS DO INIMIGO - Manter o processamento original para itens especiais
      const rewardItems = processedEnemy.rewards?.items || processedEnemy.items;

      // TEMPORARIAMENTE DESATIVADO: Recompensas de itens de equipamento
      // Conforme solicitado pelo jogador, por enquanto só trabalhamos com experiência, poções e ouro
      console.log("Itens de equipamento desativados temporariamente");

      /* Código original comentado:
      if (rewardItems && Array.isArray(rewardItems)) {
        console.log("Processando itens especiais de recompensa:", rewardItems);
        rewardItems.forEach((item) => {
          // Se o item for uma string (ID) ou um objeto com ID
          const itemId = typeof item === "object" ? item.id : item;

          // Ignorar poções comuns que já tratamos acima
          if (
            itemId &&
            itemId !== "health_potion" &&
            itemId !== "mana_potion" &&
            Math.random() < (item.chance || 0.2)
          ) {
            addToInventory(itemId, 1);
            console.log("Item especial adicionado ao inventário:", itemId);

            // Adicionar mensagem ao diálogo
            const itemName = typeof item === "object" ? item.name : itemId;
            setGameState((prev) => ({
              ...prev,
              dialogHistory: [
                ...prev.dialogHistory,
                {
                  speaker: "Sistema",
                  text: `Você obteve: ${itemName}`,
                },
              ],
            }));
          }
        });
      }
      */

      // =========== FIM DO SISTEMA DE RECOMPENSAS AJUSTADO ===========

      // Remover o inimigo derrotado da localização atual
      const currentLocation = gameState.currentLocation;

      if (currentLocation && currentLocation.enemies) {
        // Filtrar o inimigo derrotado da lista de inimigos
        const updatedEnemies = currentLocation.enemies.filter((enemy) => {
          const enemyId = typeof enemy === "object" ? enemy.id : enemy;
          const currentEnemyId = processedEnemy.id;
          return enemyId !== currentEnemyId;
        });

        // Atualizar a localização com a nova lista de inimigos
        setGameState((prev) => ({
          ...prev,
          locations: {
            ...prev.locations,
            [currentLocation.id]: {
              ...prev.locations[currentLocation.id],
              enemies: updatedEnemies,
            },
          },
        }));

        // Adicionar mensagem de vitória ao diálogo
        setGameState((prev) => ({
          ...prev,
          dialogHistory: [
            ...prev.dialogHistory,
            {
              speaker: "Sistema",
              text: `Você derrotou ${processedEnemy.name}!`,
            },
          ],
        }));

        // Verificar se era um bandido e se a missão está ativa
        if (processedEnemy.id === "bandit") {
          const banditMission = gameState.questLog.find(
            (q) => q.id === "mission1_2" && !q.completed
          );

          if (banditMission) {
            // Verificar se todos os bandidos foram derrotados
            const allBanditsDefeated =
              !gameState.currentLocation.enemies ||
              !gameState.currentLocation.enemies.some((enemy) => {
                const enemyId = typeof enemy === "object" ? enemy.id : enemy;
                return enemyId === "bandit";
              });

            if (allBanditsDefeated) {
              // DEBUG - Verificando missão completada de bandidos
              console.log(
                "MISSÃO DE BANDIDOS COMPLETADA - Verificar se advancePhase é chamado após isso"
              );

              // Completar a missão
              completeMission("mission1_2");

              // Adicionar mensagem ao diálogo
              setGameState((prev) => ({
                ...prev,
                dialogHistory: [
                  ...prev.dialogHistory,
                  {
                    speaker: "Sistema",
                    text: "Você derrotou todos os bandidos! Missão completada.",
                  },
                ],
              }));
            }
          }
        }
      }
    } else {
      // Em caso de DERROTA
      console.log("⚠️ PROCESSANDO DERROTA - Definindo gameOver como true");

      // Adicionar mensagem de derrota ao diálogo
      setGameState((prev) => ({
        ...prev,
        dialogHistory: [
          ...prev.dialogHistory,
          {
            speaker: "Sistema",
            text: "Você foi derrotado em combate!",
          },
        ],
        gameOver: true, // Apenas em caso de derrota o gameOver deve ser true
      }));
    }

    // Limpar o inimigo atual
    setGameState((prev) => ({
      ...prev,
      currentEnemy: null,
    }));

    // DEBUG - Log para verificar os valores do jogador antes de redirecionar
    console.log(
      "CombatPage handleCombatEnd - Valores do jogador antes de redirecionar:"
    );
    console.log(
      `Vida: ${player.health}/${player.maxHealth}, Mana: ${player.mana}/${player.maxMana}`
    );

    // Redirecionar para o jogo imediatamente
    console.log("Redirecionando para o jogo após o combate");
    navigate("/game");
  };

  // Função para retornar ao jogo em caso de erro
  const handleReturnToGame = () => {
    // Limpar o inimigo atual
    setGameState((prev) => ({
      ...prev,
      currentEnemy: null,
    }));

    // Redirecionar para o jogo
    navigate("/game");
  };

  // Se houver erro ao carregar o inimigo
  if (error) {
    return (
      <CombatPageContainer>
        <CombatWrapper>
          <ErrorMessage>
            <h2>Erro ao iniciar o combate</h2>
            <p>Não foi possível carregar o inimigo corretamente.</p>
            <ReturnButton onClick={handleReturnToGame}>
              Voltar ao jogo
            </ReturnButton>
          </ErrorMessage>
        </CombatWrapper>
      </CombatPageContainer>
    );
  }

  // Se o inimigo ainda não foi processado, mostrar mensagem de carregamento
  if (!processedEnemy) {
    return (
      <CombatPageContainer>
        <CombatWrapper>
          <LoadingMessage>Carregando combate...</LoadingMessage>
        </CombatWrapper>
      </CombatPageContainer>
    );
  }

  return (
    <CombatPageContainer>
      <CombatWrapper>
        <CombatScreen
          key={`combat-${processedEnemy.id}-${combatId}`}
          enemy={processedEnemy}
          onCombatEnd={handleCombatEnd}
        />
      </CombatWrapper>
    </CombatPageContainer>
  );
};

export default CombatPage;
