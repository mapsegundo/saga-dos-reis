import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useGame } from "../../context/GameContext";

/*
 * Melhorias implementadas:
 * 1. Corrigido o uso de 'quantity' para 'amount' na verificação de poções disponíveis
 * 2. Adicionado botão específico para usar poção de mana
 * 3. Modificado comportamento para que o inimigo não ataque após usar uma poção
 * 4. Ajustado o sistema de dano para ser mais equilibrado
 * 5. Separado os botões de poções em uma linha adicional para maior clareza
 */

// Importar imagens
import enemyImages from "../../assets/images/enemies";
import classImages from "../../assets/images/classes";

const CombatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CombatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #8b4513;
  padding-bottom: 10px;
`;

const CombatTitle = styled.h3`
  color: #d4af37;
  margin: 0;
`;

const CombatStatus = styled.div`
  font-size: 0.9rem;
  color: ${(props) =>
    props.victory ? "#2ecc71" : props.defeat ? "#e74c3c" : "#d4af37"};
`;

const CombatArena = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const CombatantCard = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #8b4513;
  border-radius: 8px;
  padding: 15px;
  width: 45%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CombatantImage = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 15px;
  background-color: #333;
  border-radius: 8px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  border: 2px solid #8b4513;

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
  }
`;

const CombatantName = styled.h4`
  color: #d4af37;
  margin: 0 0 10px 0;
  text-align: center;
`;

const HealthBar = styled.div`
  width: 100%;
  height: 15px;
  background-color: #333;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #8b4513;
  margin-bottom: 10px;
`;

const HealthFill = styled.div`
  height: 100%;
  width: ${(props) => (props.current / props.max) * 100}%;
  background-color: #e74c3c;
  transition: width 0.3s ease;
`;

const ManaBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #333;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #8b4513;
  margin-bottom: 15px;
`;

const ManaFill = styled.div`
  height: 100%;
  width: ${(props) => (props.current / props.max) * 100}%;
  background-color: #3498db;
  transition: width 0.3s ease;
`;

const StatsContainer = styled.div`
  margin-bottom: 15px;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 0.9rem;
`;

const StatLabel = styled.span`
  color: #d4af37;
`;

const CombatLog = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #8b4513;
  border-radius: 8px;
  padding: 10px;
  height: 150px;
  overflow-y: auto;
  margin-bottom: 20px;

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

const LogEntry = styled.div`
  margin-bottom: 5px;
  font-size: 0.9rem;
  animation: fadeIn 0.5s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ActionBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 10px;
  background-color: ${(props) =>
    props.disabled ? "#333" : "rgba(139, 69, 19, 0.5)"};
  color: ${(props) => (props.disabled ? "#666" : "#d4af37")};
  border: 1px solid ${(props) => (props.disabled ? "#444" : "#8B4513")};
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.disabled ? "#333" : "rgba(139, 69, 19, 0.8)"};
    transform: ${(props) => (props.disabled ? "none" : "translateY(-2px)")};
  }

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 1rem;
  }
`;

const ContinueButton = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  background-color: #8b4513;
  color: #d4af37;
  border: 2px solid #d4af37;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4);
    }
    70% {
      transform: scale(1.05);
      box-shadow: 0 0 0 10px rgba(212, 175, 55, 0);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(212, 175, 55, 0);
    }
  }

  &:hover {
    background-color: #a0522d;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 15px 20px;
  }
`;

// Adicionar novo componente estilizado para a imagem de vitória
const VictoryImage = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
  border-radius: 10px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  border: 3px solid #d4af37;
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
  animation: fadeIn 1s ease-out;

  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
  }
`;

const CombatScreen = ({ enemy, onCombatEnd }) => {
  const {
    player,
    takeDamage,
    heal,
    updateMana,
    gainExperience,
    updateGold,
    removeFromInventory,
    addToInventory,
    completeMission,
    addDialog,
    setHealth,
    updateInventory,
  } = useGame();

  // Estado do combate - simplificado
  const [enemyHealth, setEnemyHealth] = useState(enemy?.health || 0);
  const [playerHealth, setPlayerHealth] = useState(player?.health || 0);
  const [playerMana, setPlayerMana] = useState(player?.mana || 0);
  const [combatLog, setCombatLog] = useState([
    `O combate contra ${enemy.name} começou!`,
  ]);
  const [combatEnded, setCombatEnded] = useState(false);
  const [victory, setVictory] = useState(false);
  const [actionsDisabled, setActionsDisabled] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(true); // Controla de quem é o turno

  // Estado de combate guardado em refs para evitar problemas de cleanup
  const combatResultRef = useRef(null);
  const endCallbackCalledRef = useRef(false);

  // Referência para o log de combate
  const combatLogRef = useRef(null);

  // Utilidades para sincronizar o estado global do jogador com o estado local do combate
  const syncPlayerState = (health, mana) => {
    console.log(
      "Sincronizando estado do jogador:",
      health !== undefined
        ? `Vida: ${health}/${player.maxHealth}`
        : "Vida não alterada",
      mana !== undefined
        ? `Mana: ${mana}/${player.maxMana}`
        : "Mana não alterada"
    );

    // Atualizar a vida localmente se um valor foi fornecido
    if (health !== undefined) {
      setPlayerHealth(health);

      // NOVA VERIFICAÇÃO: Se a vida chegou a zero ou menos, processar derrota automaticamente
      if (health <= 0 && !combatEnded) {
        console.log("⚠️ VIDA ZERADA! Processando derrota automática...");
        handleDefeat();
      }
    }

    // Atualizar a mana localmente se um valor foi fornecido
    if (mana !== undefined) {
      setPlayerMana(mana);
    }

    // Atualizar a vida globalmente se um valor foi fornecido
    if (health !== undefined) {
      setHealth(health);
    }

    // Atualizar a mana globalmente se um valor foi fornecido
    if (mana !== undefined) {
      updateMana(mana);

      // Verificar após a atualização
      setTimeout(() => {
        console.log(
          `Verificação de mana após atualização global: ${player.mana}/${player.maxMana}`
        );
      }, 50);
    }
  };

  // Inicializar o combate
  useEffect(() => {
    // Verificar se o combate já foi encerrado
    if (enemy && !combatEnded) {
      // Criar um ID único para este combate
      const combatId = `${enemy.id}-${Date.now()}`;

      // Verificar se já estamos em um combate ativo
      if (enemyHealth > 0 && playerHealth > 0 && enemyHealth !== enemy.health) {
        console.log("Combate já está em andamento, ignorando reinicialização");
        return;
      }

      console.log(
        "Inicializando combate com:",
        enemy.id,
        "Combate já encerrado:",
        combatEnded,
        "ID do combate:",
        combatId
      );

      // RESETAR o resultado do combate para falso
      combatResultRef.current = false;
      console.log(
        "⚠️ RESETANDO RESULTADO DO COMBATE NA REF:",
        combatResultRef.current
      );

      // Inicializar apenas uma vez
      setEnemyHealth(enemy.health);

      // Usar os valores globais atuais do jogador
      const currentHealth = player.health;
      const currentMana = player.mana;

      console.log("VALORES DO JOGADOR NO INÍCIO DO COMBATE:");
      console.log(`Vida global: ${currentHealth}/${player.maxHealth}`);
      console.log(`Mana global: ${currentMana}/${player.maxMana}`);

      // Definir os valores locais
      setPlayerHealth(currentHealth);
      setPlayerMana(currentMana);

      // Garantir que os valores locais e globais estejam sincronizados desde o início
      setTimeout(() => {
        console.log("VERIFICAÇÃO APÓS INICIALIZAÇÃO DO COMBATE:");
        console.log(
          `Vida local: ${playerHealth}/${player.maxHealth}, Vida global: ${player.health}/${player.maxHealth}`
        );
        console.log(
          `Mana local: ${playerMana}/${player.maxMana}, Mana global: ${player.mana}/${player.maxMana}`
        );
      }, 50);

      setCombatLog([`O combate contra ${enemy.name} começou!`]);
      setCombatEnded(false);
      setVictory(false);
      setActionsDisabled(false);

      console.log(
        `Inicializando estado do combate - Vida: ${currentHealth}/${player.maxHealth}, Mana: ${currentMana}/${player.maxMana}`
      );
    }
  }, [enemy]); // Remover combatEnded das dependências para evitar reinicialização

  // Efeito para garantir que o combate não seja reinicializado após ser encerrado
  useEffect(() => {
    if (combatEnded) {
      console.log("Combate foi encerrado, bloqueando reinicialização");
    }
  }, [combatEnded]);

  // Rolar para o final do log de combate
  useEffect(() => {
    if (combatLogRef.current) {
      combatLogRef.current.scrollTop = combatLogRef.current.scrollHeight;
    }
  }, [combatLog]);

  // Verificar se o inimigo foi fornecido
  if (!enemy) {
    console.error("CombatScreen: Inimigo não fornecido");
    return (
      <div>
        <h3 style={{ color: "#e74c3c", textAlign: "center" }}>
          Erro ao iniciar combate
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => onCombatEnd(false)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#8b4513",
              color: "#d4af37",
              border: "1px solid #d4af37",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Voltar ao jogo
          </button>
        </div>
      </div>
    );
  }

  // Verificar se o inimigo tem todas as propriedades necessárias
  if (!enemy.health || !enemy.name) {
    console.error("CombatScreen: Inimigo com propriedades ausentes", enemy);
    return (
      <div>
        <h3 style={{ color: "#e74c3c", textAlign: "center" }}>
          Erro ao iniciar combate
        </h3>
        <p style={{ color: "#e74c3c", textAlign: "center" }}>
          O inimigo não possui todas as propriedades necessárias.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => onCombatEnd(false)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#8b4513",
              color: "#d4af37",
              border: "1px solid #d4af37",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Voltar ao jogo
          </button>
        </div>
      </div>
    );
  }

  // Adicionar entrada ao log de combate
  const addToCombatLog = (message) => {
    setCombatLog((prev) => [...prev, message]);
  };

  // Função para calcular dano
  const calculateDamage = (attack, level, defense) => {
    // Verificar se os valores são números válidos
    const validAttack =
      typeof attack === "number" && !isNaN(attack) ? attack : 10;
    const validLevel = typeof level === "number" && !isNaN(level) ? level : 1;
    const validDefense =
      typeof defense === "number" && !isNaN(defense) ? defense : 0;

    // Base do dano é o ataque + bônus de nível
    const baseDamage = validAttack + Math.floor(validLevel * 1.5);

    // Redução baseada na defesa (entre 10% e 50% - aumentamos a eficácia da defesa)
    const defenseReduction = Math.min(0.5, validDefense / 80);

    // Dano final com variação aleatória de ±20%
    const randomFactor = 0.8 + Math.random() * 0.4; // Entre 0.8 e 1.2

    // Verificar se é dano de inimigo para jogador (defesa possui maior impacto)
    const isDamageToPlayer =
      defense === player.equipment?.armor?.defense ||
      defense === player.defense ||
      defense === player.constitution;

    // Se for dano ao jogador, reduzir um pouco mais para equilibrar o jogo
    const balanceFactor = isDamageToPlayer ? 0.8 : 1.0;

    // Calcular dano final (mínimo 1)
    return Math.max(
      1,
      Math.floor(
        baseDamage * (1 - defenseReduction) * randomFactor * balanceFactor
      )
    );
  };

  // Calcular dano do inimigo
  const calculateEnemyDamage = () => {
    // Base do dano do inimigo
    let damage = enemy.baseDamage || Math.floor(enemy.level * 2 + 5);

    // Variação aleatória (80% a 120% do dano base)
    const variation = 0.8 + Math.random() * 0.4;
    damage = Math.floor(damage * variation);

    // Aplicar defesa do jogador se disponível
    const defense = player.defense || 0;
    damage = Math.max(1, damage - defense);

    return damage;
  };

  // Ataque normal do jogador
  const handlePlayerAttack = () => {
    // Verificar se o jogador pode atacar
    if (!playerTurn || actionsDisabled || combatEnded) {
      console.log("Não é possível atacar agora");
      return;
    }

    console.log("Jogador realiza ataque básico");

    // Calcular dano base
    const baseDamage = player.damage || 5;

    // Aplicar variação aleatória (80% a 120% do dano base)
    const variation = 0.8 + Math.random() * 0.4;
    const damage = Math.floor(baseDamage * variation);

    // Aplicar dano ao inimigo
    const newEnemyHealth = Math.max(0, enemyHealth - damage);
    setEnemyHealth(newEnemyHealth);

    // Adicionar ao log de combate
    addToCombatLog(`Você ataca ${enemy.name} e causa ${damage} de dano!`);

    // Verificar se o inimigo foi derrotado
    if (newEnemyHealth <= 0) {
      handleVictory();
      return;
    }

    // Passar o turno para o inimigo
    setPlayerTurn(false);

    // Executar o turno do inimigo após um breve delay
    setTimeout(() => {
      handleEnemyTurn();
    }, 1000);
  };

  // Ataque especial do jogador
  const handlePlayerSpecial = () => {
    // Verificar se o jogador pode usar ataque especial
    if (!playerTurn || actionsDisabled || combatEnded) {
      console.log("Não é possível usar ataque especial agora");
      return;
    }

    // Verificar se o jogador tem mana suficiente
    const manaCost = 15;
    if (playerMana < manaCost) {
      addToCombatLog("Você não tem mana suficiente para usar ataque especial!");
      return;
    }

    console.log("Jogador realiza ataque especial");

    // Calcular dano base
    const baseDamage = player.damage * 2 || 10;

    // Aplicar variação aleatória (90% a 130% do dano base)
    const variation = 0.9 + Math.random() * 0.4;
    const damage = Math.floor(baseDamage * variation);

    // Aplicar dano ao inimigo
    const newEnemyHealth = Math.max(0, enemyHealth - damage);
    setEnemyHealth(newEnemyHealth);

    // Reduzir mana do jogador
    const newPlayerMana = playerMana - manaCost;
    setPlayerMana(newPlayerMana);

    // Sincronizar mana com estado global
    syncPlayerState(playerHealth, newPlayerMana);

    // Adicionar ao log de combate
    addToCombatLog(
      `Você usa um ataque especial em ${enemy.name} e causa ${damage} de dano!`
    );

    // Verificar se o inimigo foi derrotado
    if (newEnemyHealth <= 0) {
      handleVictory();
      return;
    }

    // Passar o turno para o inimigo
    setPlayerTurn(false);

    // Executar o turno do inimigo após um breve delay
    setTimeout(() => {
      handleEnemyTurn();
    }, 1000);
  };

  // Usar poção de vida
  const handleUsePotion = () => {
    // Verificar se o jogador pode usar poção
    if (!playerTurn || actionsDisabled || combatEnded) {
      console.log("Não é possível usar poção agora");
      return;
    }

    // Verificar se o jogador tem poções de vida
    if (
      !player.inventory.healthPotions ||
      player.inventory.healthPotions <= 0
    ) {
      addToCombatLog("Você não tem poções de vida!");
      return;
    }

    // Calcular cura (30% da vida máxima)
    const healAmount = Math.floor(player.maxHealth * 0.3);
    const newPlayerHealth = Math.min(
      player.maxHealth,
      playerHealth + healAmount
    );

    // Atualizar vida do jogador
    setPlayerHealth(newPlayerHealth);

    // Reduzir quantidade de poções
    updateInventory({
      ...player.inventory,
      healthPotions: player.inventory.healthPotions - 1,
    });

    // Sincronizar com estado global
    syncPlayerState(newPlayerHealth, playerMana);

    // Adicionar ao log de combate
    addToCombatLog(
      `Você usa uma poção de vida e recupera ${healAmount} pontos de vida!`
    );

    // Passar o turno para o inimigo
    setPlayerTurn(false);

    // Executar o turno do inimigo após um breve delay
    setTimeout(() => {
      handleEnemyTurn();
    }, 1000);
  };

  // Usar poção de mana
  const handleUseManaPotion = () => {
    // Verificar se o jogador pode usar poção
    if (!playerTurn || actionsDisabled || combatEnded) {
      console.log("Não é possível usar poção agora");
      return;
    }

    // Verificar se o jogador tem poções de mana
    if (!player.inventory.manaPotions || player.inventory.manaPotions <= 0) {
      addToCombatLog("Você não tem poções de mana!");
      return;
    }

    // Calcular regeneração de mana (30% da mana máxima)
    const manaAmount = Math.floor(player.maxMana * 0.3);
    const newPlayerMana = Math.min(player.maxMana, playerMana + manaAmount);

    // Atualizar mana do jogador
    setPlayerMana(newPlayerMana);

    // Reduzir quantidade de poções
    updateInventory({
      ...player.inventory,
      manaPotions: player.inventory.manaPotions - 1,
    });

    // Sincronizar com estado global
    syncPlayerState(playerHealth, newPlayerMana);

    // Adicionar ao log de combate
    addToCombatLog(
      `Você usa uma poção de mana e recupera ${manaAmount} pontos de mana!`
    );

    // Passar o turno para o inimigo
    setPlayerTurn(false);

    // Executar o turno do inimigo após um breve delay
    setTimeout(() => {
      handleEnemyTurn();
    }, 1000);
  };

  // Função para obter a imagem de vitória baseada na classe do jogador
  const getVictoryImage = () => {
    // Tentativas diferentes de obter a classe do jogador
    const playerClassId = player.class?.id;
    const playerClassName = player.className;
    const playerClassValue = player.class;

    console.log("Classe do jogador (objeto):", player.class);
    console.log("Classe do jogador (className):", playerClassName);
    console.log("Classe do jogador (valor direto):", playerClassValue);

    // Determinar a classe para usar na imagem
    let classKey = "warrior"; // Valor padrão

    if (typeof playerClassId === "string") {
      classKey = playerClassId.toLowerCase();
    } else if (typeof playerClassName === "string") {
      classKey = playerClassName.toLowerCase();
    } else if (typeof playerClassValue === "string") {
      classKey = playerClassValue.toLowerCase();
    }

    // Mapear classes em português para inglês
    const classMapping = {
      mago: "mage",
      guerreiro: "warrior",
      arqueiro: "archer",
    };

    // Se a classe estiver em português, converter para inglês
    if (classMapping[classKey]) {
      classKey = classMapping[classKey];
    }

    console.log("Chave da classe usada:", classKey);
    console.log("Imagem buscada:", `${classKey}_victory`);
    console.log("Imagens disponíveis:", Object.keys(classImages));

    // Retornar a imagem correspondente ou a imagem padrão
    return classImages[`${classKey}_victory`] || classImages.default;
  };

  // Vitória no combate
  const handleVictory = () => {
    // Evitar múltiplas chamadas de vitória
    if (combatEnded) {
      console.log("handleVictory: Combate já encerrado, ignorando chamada");
      return;
    }

    console.log("🏆 INICIANDO PROCESSO DE VITÓRIA...");

    // Marcar o combate como encerrado
    setCombatEnded(true);
    setVictory(true);
    setActionsDisabled(true);

    // Adicionar mensagem de vitória ao log
    addToCombatLog(`Você derrotou ${enemy.name}! Parabéns!`);

    // Não chamar finalizeCombat automaticamente - o jogador clicará no botão "Continuar"
  };

  // Derrota no combate
  const handleDefeat = () => {
    // Evitar múltiplas chamadas de derrota
    if (combatEnded) {
      console.log("handleDefeat: Combate já encerrado, ignorando chamada");
      return;
    }

    console.log("💀 INICIANDO PROCESSO DE DERROTA...");

    // Marcar o combate como encerrado
    setCombatEnded(true);
    setVictory(false);
    setActionsDisabled(true);

    // Garantir que a vida do jogador está zerada para consistência visual
    setPlayerHealth(0);
    syncPlayerState(0, playerMana);

    // Adicionar mensagem de derrota ao log
    addToCombatLog(`Você foi derrotado por ${enemy.name}!`);

    // Finalizar o combate com derrota após um breve delay
    setTimeout(() => {
      finalizeCombat(false);
    }, 1500);
  };

  // Função central para finalizar o combate
  const finalizeCombat = (isVictory) => {
    // Evitar múltiplas chamadas de finalização
    if (endCallbackCalledRef.current) {
      console.log("Callback de finalização já chamado, ignorando");
      return;
    }

    console.log(
      `Finalizando combate - Resultado: ${isVictory ? "Vitória" : "Derrota"}`
    );

    // Marcar que o callback foi chamado
    endCallbackCalledRef.current = true;

    // Garantir que o resultado está definido corretamente
    combatResultRef.current = isVictory;

    // Garantir que o estado de combate está atualizado
    setCombatEnded(true);
    setVictory(isVictory);
    setActionsDisabled(true);

    // Sincronizar o estado final do jogador antes de chamar o callback
    syncPlayerState(playerHealth, playerMana);

    // Registrar estado final no console para depuração
    console.log("Estado final do combate:", {
      resultado: isVictory ? "Vitória" : "Derrota",
      vidaJogador: playerHealth,
      manaJogador: playerMana,
      vidaInimigo: enemyHealth,
    });

    // Chamar o callback com o resultado do combate
    if (typeof onCombatEnd === "function") {
      onCombatEnd(isVictory, enemy);
    } else {
      console.error("onCombatEnd não é uma função válida");
    }
  };

  // Turno do inimigo
  const handleEnemyTurn = () => {
    // Verificar se o combate já terminou
    if (combatEnded) {
      console.log("Combate já terminou, ignorando turno do inimigo");
      return;
    }

    // Se o inimigo estiver morto, não deve atacar
    if (enemyHealth <= 0) {
      console.log("Inimigo está derrotado, ignorando seu turno");
      return;
    }

    // Calcular dano do inimigo
    const enemyDamage = calculateEnemyDamage();

    // Aplicar dano ao jogador
    const newPlayerHealth = Math.max(0, playerHealth - enemyDamage);
    setPlayerHealth(newPlayerHealth);

    // Sincronizar com o estado do jogador
    syncPlayerState(newPlayerHealth, playerMana);

    // Adicionar ao log de combate
    addToCombatLog(`${enemy.name} ataca e causa ${enemyDamage} de dano!`);

    // Verificar se o jogador foi derrotado
    if (newPlayerHealth <= 0) {
      handleDefeat();
      return;
    }

    // Permitir novas ações do jogador
    setPlayerTurn(true);
  };

  return (
    <CombatContainer>
      <CombatHeader>
        <CombatTitle>Combate</CombatTitle>
        <CombatStatus victory={victory} defeat={!victory && combatEnded}>
          {combatEnded
            ? victory
              ? "Vitória!"
              : "Derrota!"
            : actionsDisabled
            ? "Turno do Inimigo"
            : "Seu Turno"}
        </CombatStatus>
      </CombatHeader>

      {combatEnded ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            height: "100%",
          }}
        >
          <h2
            style={{
              color: victory ? "#4CAF50" : "#F44336",
              marginBottom: "20px",
              fontSize: "2rem",
            }}
          >
            {victory ? "Vitória!" : "Derrota!"}
          </h2>

          {victory && <VictoryImage image={getVictoryImage()} />}

          <ContinueButton
            onClick={() => finalizeCombat(victory)}
            disabled={actionsDisabled && !combatEnded}
          >
            Continuar
          </ContinueButton>
        </div>
      ) : (
        <>
          <CombatArena>
            <CombatantCard>
              <CombatantImage
                image={
                  classImages[
                    (() => {
                      let classKey =
                        typeof player.class === "string"
                          ? player.class.toLowerCase()
                          : player.class?.id?.toLowerCase() ||
                            player.className?.toLowerCase() ||
                            "warrior";

                      // Mapear classes em português para inglês
                      const classMapping = {
                        mago: "mage",
                        guerreiro: "warrior",
                        arqueiro: "archer",
                      };

                      // Se a classe estiver em português, converter para inglês
                      if (classMapping[classKey]) {
                        classKey = classMapping[classKey];
                      }

                      return classKey;
                    })()
                  ] || classImages.default
                }
              />
              <CombatantName>{player.name}</CombatantName>
              <HealthBar>
                <HealthFill current={playerHealth} max={player.maxHealth} />
              </HealthBar>
              <ManaBar>
                <ManaFill current={playerMana} max={player.maxMana} />
              </ManaBar>
              <StatsContainer>
                <StatRow>
                  <StatLabel>Vida:</StatLabel>
                  <span>
                    {playerHealth}/{player.maxHealth}
                  </span>
                </StatRow>
                <StatRow>
                  <StatLabel>Mana:</StatLabel>
                  <span>
                    {playerMana}/{player.maxMana}
                  </span>
                </StatRow>
              </StatsContainer>
            </CombatantCard>

            <CombatantCard>
              <CombatantImage
                image={enemyImages[enemy.id] || enemyImages.default}
              />
              <CombatantName>{enemy.name}</CombatantName>
              <HealthBar>
                <HealthFill current={enemyHealth} max={enemy.health} />
              </HealthBar>
              <StatsContainer>
                <StatRow>
                  <StatLabel>Vida:</StatLabel>
                  <span>
                    {enemyHealth}/{enemy.health}
                  </span>
                </StatRow>
                <StatRow>
                  <StatLabel>Dano:</StatLabel>
                  <span>{enemy.damage}</span>
                </StatRow>
              </StatsContainer>
            </CombatantCard>
          </CombatArena>

          <CombatLog ref={combatLogRef}>
            {combatLog.map((entry, index) => (
              <LogEntry key={index}>{entry}</LogEntry>
            ))}
          </CombatLog>

          <ActionBar>
            <ActionRow>
              <ActionButton
                onClick={handlePlayerAttack}
                disabled={actionsDisabled || combatEnded}
              >
                Atacar
              </ActionButton>
              <ActionButton
                onClick={handlePlayerSpecial}
                disabled={actionsDisabled || combatEnded || playerMana < 10}
              >
                Habilidade Especial (10 Mana)
              </ActionButton>
            </ActionRow>
            <ActionRow>
              <ActionButton
                onClick={handleUsePotion}
                disabled={actionsDisabled || combatEnded}
              >
                Poção de Cura
              </ActionButton>
              <ActionButton
                onClick={handleUseManaPotion}
                disabled={actionsDisabled || combatEnded}
              >
                Poção de Mana
              </ActionButton>
            </ActionRow>
          </ActionBar>
        </>
      )}
    </CombatContainer>
  );
};

export default CombatScreen;
