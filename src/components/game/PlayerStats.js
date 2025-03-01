import React from "react";
import styled from "styled-components";
import { useGame } from "../../context/GameContext";

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 5px;
  }

  @media (max-width: 480px) {
    padding: 3px;
  }
`;

const PlayerName = styled.h3`
  color: #d4af37;
  margin: 0 0 5px 0;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 3px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const StatBars = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    gap: 10px;
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const StatBar = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    min-width: 70px;
  }
`;

const BarLabel = styled.span`
  color: #d4af37;
  margin-right: 5px;

  @media (max-width: 480px) {
    margin-right: 3px;
  }
`;

const BarValue = styled.span`
  color: ${(props) => props.color};
`;

const PlayerStats = ({ children }) => {
  const { player } = useGame();

  // Se children for fornecido, renderize-os em vez do conteúdo padrão
  if (children) {
    return <StatsContainer>{children}</StatsContainer>;
  }

  // Verificar se o jogador existe
  if (!player || !player.name) {
    return (
      <StatsContainer>
        <PlayerName>Jogador não encontrado</PlayerName>
      </StatsContainer>
    );
  }

  return (
    <StatsContainer>
      <PlayerName>{player.name}</PlayerName>
      <StatBars>
        <StatBar>
          <BarLabel>Nível:</BarLabel>
          <BarValue color="#fff">{player.level}</BarValue>
        </StatBar>
        <StatBar>
          <BarLabel>HP:</BarLabel>
          <BarValue color="#e74c3c">
            {player.health}/{player.maxHealth}
          </BarValue>
        </StatBar>
        <StatBar>
          <BarLabel>MP:</BarLabel>
          <BarValue color="#3498db">
            {player.mana}/{player.maxMana}
          </BarValue>
        </StatBar>
      </StatBars>
    </StatsContainer>
  );
};

export default PlayerStats;
