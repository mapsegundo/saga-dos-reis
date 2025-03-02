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

  // NOVA REF: Para armazenar o resultado do combate de forma persistente
  const combatResultRef = useRef(false);

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

  // Ataque do inimigo
  const enemyAttack = () => {
    if (combatEnded) return;

    // Calcular dano do inimigo
    const enemyAttackValue = enemy.attack || enemy.damage || 5;
    const playerDefenseValue =
      player.equipment?.armor?.defense ||
      player.defense ||
      player.constitution ||
      5;
    const enemyDamage = calculateDamage(
      enemyAttackValue,
      enemy.level || 1,
      playerDefenseValue
    );

    // Atualizar vida do jogador - garantir que apenas o dano seja deduzido
    // Usamos a forma funcional do setState para garantir que temos o valor mais recente
    setPlayerHealth((currentHealth) => {
      const newHealth = Math.max(0, currentHealth - enemyDamage);
      // Registrar no console para depuração
      console.log(
        `Saúde antes do ataque: ${currentHealth}, Dano: ${enemyDamage}, Após ataque: ${newHealth}`
      );

      // Sincronizar apenas o valor de saúde, não mexer na mana
      syncPlayerState(newHealth, undefined);

      return newHealth;
    });

    // Registrar valores de mana antes e depois do ataque
    console.log(
      `Verificação de mana durante ataque inimigo - Local: ${playerMana}, Global: ${player.mana}`
    );

    // Adicionar ao log de combate
    addToCombatLog(
      `${enemy.name} atacou você causando ${enemyDamage} de dano!`
    );

    // Verificar se o jogador foi derrotado após atualizar a saúde
    setTimeout(() => {
      console.log(
        `Verificação de mana após ataque inimigo - Local: ${playerMana}, Global: ${player.mana}`
      );

      if (playerHealth <= 0) {
        handleDefeat();
        return;
      }

      // Reativar ações do jogador
      setActionsDisabled(false);
    }, 50);
  };

  // Ataque do jogador
  const handlePlayerAttack = () => {
    // VERIFICAÇÃO ADICIONAL: Impedir ataque se o jogador estiver com vida zerada
    if (combatEnded || actionsDisabled || playerHealth <= 0) {
      if (playerHealth <= 0 && !combatEnded) {
        console.log(
          "Tentativa de ataque com vida zerada. Processando derrota..."
        );
        handleDefeat();
      }
      return;
    }

    // Desativar ações do jogador
    setActionsDisabled(true);

    // Calcular dano do jogador
    const playerAttackValue =
      player.equipment?.weapon?.damage ||
      player.attack ||
      player.strength ||
      10;
    const enemyDefenseValue = enemy.defense || 0;
    const playerDamage = calculateDamage(
      playerAttackValue,
      player.level,
      enemyDefenseValue
    );

    // Atualizar vida do inimigo
    const newEnemyHealth = Math.max(0, enemyHealth - playerDamage);
    setEnemyHealth(newEnemyHealth);

    // Adicionar ao log de combate
    addToCombatLog(
      `Você atacou ${enemy.name} causando ${playerDamage} de dano!`
    );

    // Verificar se o inimigo foi derrotado
    if (newEnemyHealth <= 0) {
      handleVictory();
      return;
    }

    // Ataque do inimigo após um pequeno delay
    setTimeout(enemyAttack, 1000);
  };

  // Habilidade especial do jogador
  const handlePlayerSpecial = () => {
    // VERIFICAÇÃO ADICIONAL: Impedir uso de habilidade se o jogador estiver com vida zerada
    if (
      combatEnded ||
      actionsDisabled ||
      playerHealth <= 0 ||
      playerMana < 10
    ) {
      if (playerHealth <= 0 && !combatEnded) {
        console.log(
          "Tentativa de usar habilidade com vida zerada. Processando derrota..."
        );
        handleDefeat();
      }
      return;
    }

    // Desativar ações do jogador
    setActionsDisabled(true);

    // Consumir mana
    const manaCost = 10;

    // Usar a forma funcional do setState para garantir que temos o valor mais recente
    setPlayerMana((currentMana) => {
      const newMana = Math.max(0, currentMana - manaCost);

      // Registrar no console para depuração
      console.log(
        `Mana antes de usar habilidade: ${currentMana}, Após uso: ${newMana}`
      );

      // Sincronizar com estado global
      syncPlayerState(undefined, newMana);

      return newMana;
    });

    // Calcular dano especial
    const playerAttackValue =
      player.equipment?.weapon?.damage ||
      player.attack ||
      player.strength ||
      10;
    const enemyDefenseValue = enemy.defense || 0;
    const specialDamage = Math.floor(
      calculateDamage(playerAttackValue, player.level, enemyDefenseValue) * 1.5
    );

    // Atualizar vida do inimigo
    const newEnemyHealth = Math.max(0, enemyHealth - specialDamage);
    setEnemyHealth(newEnemyHealth);

    // Adicionar ao log de combate
    addToCombatLog(
      `Você usou uma habilidade especial em ${enemy.name} causando ${specialDamage} de dano!`
    );

    // Verificar se o inimigo foi derrotado
    if (newEnemyHealth <= 0) {
      handleVictory();
      return;
    }

    // Ataque do inimigo após um pequeno delay
    setTimeout(enemyAttack, 1000);
  };

  // Usar poção
  const handleUsePotion = () => {
    // VERIFICAÇÃO ADICIONAL: Impedir uso de poção se o jogador estiver com vida zerada
    if (combatEnded || actionsDisabled || playerHealth <= 0) {
      if (playerHealth <= 0 && !combatEnded) {
        console.log(
          "Tentativa de usar poção com vida zerada. Processando derrota..."
        );
        handleDefeat();
      }
      return;
    }

    // Verificar se o jogador tem poções
    const healthPotion = player.inventory.find(
      (item) => item && item.id === "health_potion"
    );

    if (!healthPotion || healthPotion.amount <= 0) {
      addToCombatLog("Você não tem poções de cura!");
      return;
    }

    // Desativar ações do jogador
    setActionsDisabled(true);

    // Usar poção - Ajustamos a quantidade de cura para 25 para equilibrar mais o jogo
    removeFromInventory("health_potion", 1);
    const healAmount = 25;

    // Usamos a forma funcional do setState para garantir que temos o valor mais recente
    setPlayerHealth((currentHealth) => {
      const newHealth = Math.min(player.maxHealth, currentHealth + healAmount);
      // Registrar no console para depuração
      console.log(
        `Saúde antes da cura: ${currentHealth}, Após cura: ${newHealth}`
      );

      // Sincronizar com estado global
      syncPlayerState(newHealth, undefined);

      return newHealth;
    });

    // Adicionar ao log de combate
    addToCombatLog(`Você usou uma poção e recuperou ${healAmount} de vida!`);

    // Ataque do inimigo após um pequeno delay - passa o turno para o inimigo
    setTimeout(enemyAttack, 1000);
  };

  // Usar poção de mana
  const handleUseManaPotion = () => {
    // VERIFICAÇÃO ADICIONAL: Impedir uso de poção de mana se o jogador estiver com vida zerada
    if (combatEnded || actionsDisabled || playerHealth <= 0) {
      if (playerHealth <= 0 && !combatEnded) {
        console.log(
          "Tentativa de usar poção de mana com vida zerada. Processando derrota..."
        );
        handleDefeat();
      }
      return;
    }

    // Verificar se o jogador tem poções de mana
    const manaPotion = player.inventory.find(
      (item) => item && item.id === "mana_potion"
    );

    if (!manaPotion || manaPotion.amount <= 0) {
      addToCombatLog("Você não tem poções de mana!");
      return;
    }

    // Desativar ações do jogador
    setActionsDisabled(true);

    // Usar poção de mana
    removeFromInventory("mana_potion", 1);
    const manaAmount = 30;

    // Usamos a forma funcional do setState para garantir que temos o valor mais recente
    setPlayerMana((currentMana) => {
      const newMana = Math.min(player.maxMana, currentMana + manaAmount);

      // Registrar no console para depuração
      console.log(
        `Mana antes da poção: ${currentMana}, Após poção: ${newMana} (máximo: ${player.maxMana})`
      );

      // Sincronizar com estado global
      syncPlayerState(undefined, newMana);

      return newMana;
    });

    // Adicionar ao log de combate
    addToCombatLog(`Você usou uma poção e recuperou ${manaAmount} de mana!`);

    // Ataque do inimigo após um pequeno delay - passa o turno para o inimigo
    setTimeout(enemyAttack, 1000);
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

    // FIXME: DEFINIR O RESULTADO DO COMBATE NA REF - Isso garante que o valor persistirá
    // independentemente do estado do componente React
    combatResultRef.current = true;
    console.log("🏆 DEFINIDO RESULTADO NA REF:", combatResultRef.current);

    // Logar o estado de mana antes da vitória e informações sobre o inimigo derrotado
    console.log(
      "MANA antes da vitória - Local:",
      playerMana,
      "Global:",
      player.mana
    );
    console.log("Inimigo derrotado:", enemy);

    // ⚠️ CORRIGIR SEQUÊNCIA: Primeiro definir a vitória antes de qualquer outra coisa
    console.log("🏆 INICIANDO PROCESSO DE VITÓRIA...");

    // MUITO IMPORTANTE: Definir a vitória primeiro e garantir que seja true
    setVictory(true);

    // Garantia adicional
    setTimeout(() => {
      if (!victory) {
        console.log(
          "⚠️ ALERTA: Estado de vitória não foi atualizado! Forçando atualização..."
        );
        setVictory(true);
      }
    }, 50);

    // Registrar explicitamente a vitória antes de continuar
    console.log("🏆 VITÓRIA CONFIRMADA! Atualizando estado do combate...");

    // Marcar o combate como encerrado após confirmar a vitória
    setCombatEnded(true);
    setActionsDisabled(true);

    console.log("VITÓRIA REGISTRADA - Estado atual:", {
      combatEnded: true,
      victory: true,
    });

    // Adicionar mensagem ao log
    addToCombatLog(`Você derrotou ${enemy.name}!`);

    // Determinar a classe do jogador para mensagem personalizada
    const classMapping = {
      warrior: "Guerreiro",
      archer: "Arqueiro",
      mage: "Mago",
    };

    const playerClass = Object.keys(classMapping).find(
      (key) => classMapping[key] === player.className
    );

    // Mensagens personalizadas de vitória baseadas na classe
    let victoryMessage = "";
    switch (playerClass) {
      case "warrior":
        victoryMessage = `Com um golpe poderoso de sua ${
          player.equipment.weapon?.name || "arma"
        }, você derrota ${enemy.name}!`;
        break;
      case "archer":
        victoryMessage = `Sua flecha certeira atinge ${enemy.name} com precisão, garantindo a vitória!`;
        break;
      case "mage":
        victoryMessage = `Seus poderes arcanos consomem ${enemy.name}, resultando em triunfo!`;
        break;
      default:
        victoryMessage = `Você derrota ${enemy.name} com grande habilidade!`;
    }

    addToCombatLog(victoryMessage);

    // Estado do jogador no momento da vitória (apenas para logging)
    console.log(
      "Estado do jogador ao vencer - Local:",
      `Vida: ${playerHealth}/${player.maxHealth}, Mana: ${playerMana}/${player.maxMana}`
    );
    console.log(
      "Estado do jogador ao vencer - Global:",
      `Vida: ${player.health}/${player.maxHealth}, Mana: ${player.mana}/${player.maxMana}`
    );
    console.log(
      "IMPORTANTE: A vida e mana serão atualizadas em handleFinishCombat"
    );

    // Adicionar mensagem de vitória final
    addToCombatLog(
      "Vitória! Prepare-se para receber recompensas pela sua conquista."
    );
  };

  // Derrota no combate
  const handleDefeat = () => {
    // Verificar se o combate já foi encerrado
    if (combatEnded) {
      console.log(
        "Combate já foi encerrado, ignorando chamada de derrota adicional"
      );
      return;
    }

    console.log("⚠️⚠️⚠️ DERROTA CONFIRMADA - VIDA ZERADA ⚠️⚠️⚠️");

    // EXPLICITAMENTE definir vitória como falso na ref
    combatResultRef.current = false;
    console.log("⚠️ DEFINIDO DERROTA NA REF:", combatResultRef.current);

    // Desativar imediatamente todas as ações do jogador
    setActionsDisabled(true);

    // Marcar o combate como encerrado
    setCombatEnded(true);
    setVictory(false);

    // Adicionar mensagens ao log
    addToCombatLog("Você foi derrotado!");
    addToCombatLog("Sua vida chegou a zero. Voltando à cidade...");

    // Determinar a classe do jogador para mensagem personalizada
    let classKey = "warrior"; // Valor padrão

    if (typeof player.class?.id === "string") {
      classKey = player.class.id.toLowerCase();
    } else if (typeof player.className === "string") {
      classKey = player.className.toLowerCase();
    } else if (typeof player.class === "string") {
      classKey = player.class.toLowerCase();
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

    // Textos personalizados para cada classe
    const defeatTexts = {
      warrior: `Seu escudo não foi páreo para o golpe brutal do ${enemy.name}. Sua armadura falha e você cai de joelhos, incapaz de continuar a luta.`,
      archer: `Antes que pudesse preparar outra flecha, o ${enemy.name} se aproxima rapidamente. Sua agilidade não foi suficiente desta vez, e você sente a dor do golpe certeiro.`,
      mage: `Suas energias mágicas se esgotam no momento crucial. O ${enemy.name} resiste ao seu último feitiço e avança implacável, forçando-o a recuar, derrotado.`,
    };

    // Adicionar mensagem personalizada de acordo com a classe
    if (defeatTexts[classKey]) {
      addToCombatLog(defeatTexts[classKey]);
    }

    // Em caso de derrota, definir a vida para 10% da vida máxima para que o jogador não morra completamente
    // (isso permite que ele continue o jogo após uma derrota)
    setHealth(Math.max(1, Math.floor(player.maxHealth * 0.1))); // 10% da vida máxima ou pelo menos 1 ponto
    updateMana(Math.max(1, Math.floor(player.maxMana * 0.1))); // 10% da mana máxima ou pelo menos 1 ponto
  };

  // Finalizar o combate
  const handleFinishCombat = () => {
    // Verificar se o combate já terminou
    if (!combatEnded) {
      console.log(
        "handleFinishCombat chamado sem o combate ter terminado. Encerramento forçado."
      );
      // Forçar encerramento
      setCombatEnded(true);
    }

    // 🔴 CRÍTICO: Usar a referência em vez do estado do React
    // A referência não é afetada pela natureza assíncrona do React
    const resultadoFinal = combatResultRef.current;

    console.log(
      "⚠️ ESTADO DE VITÓRIA DA REFERÊNCIA:",
      resultadoFinal ? "VITÓRIA" : "DERROTA",
      "Valor bruto da ref:",
      combatResultRef.current
    );

    // Log do estado React (para comparação)
    console.log("Estado React victory:", victory);

    // Logar valores finais de mana para diagnóstico
    console.log("VALORES FINAIS - Local vs Global:");
    console.log(
      `Vida: Local=${playerHealth}/${player.maxHealth}, Global=${player.health}/${player.maxHealth}`
    );
    console.log(
      `Mana: Local=${playerMana}/${player.maxMana}, Global=${player.mana}/${player.maxMana}`
    );
    console.log(`Diferença Mana: ${playerMana - player.mana}`);

    // Sincronizar o estado do jogador antes de finalizar
    console.log("Sincronizando estado final do jogador");
    syncPlayerState(playerHealth, playerMana);

    // Adicionar mensagem final ao log de combate
    if (resultadoFinal) {
      addToCombatLog(
        "Combate finalizado com sucesso! Processando recompensas..."
      );
    } else {
      addToCombatLog("Você foi derrotado! Retornando à cidade...");
    }

    // Verificar após a sincronização com timeout
    setTimeout(() => {
      console.log(
        "Estado APÓS sincronização final:",
        `Vida: ${player.health}/${player.maxHealth}, Mana: ${player.mana}/${player.maxMana}`
      );

      // Confirmar o estado final do combate (usando a variável armazenada)
      console.log(
        "ESTADO FINAL DO COMBATE:",
        resultadoFinal ? "VITÓRIA" : "DERROTA"
      );

      // Chamar a função de finalização de combate passando o resultado preservado
      console.log(
        `Finalizando combate com resultado: ${
          resultadoFinal ? "vitória" : "derrota"
        }`
      );

      // Passar o resultado preservado para a função de callback
      console.log(
        "Resultado final enviado:",
        resultadoFinal ? "VITÓRIA" : "DERROTA"
      );

      onCombatEnd(resultadoFinal);
    }, 100);
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

          <ContinueButton onClick={handleFinishCombat} disabled={false}>
            Continuar Aventura
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
