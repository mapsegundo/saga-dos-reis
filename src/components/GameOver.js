import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useGame } from "../context/GameContext";

// Importar imagens
import uiImages from "../assets/images/ui";
import classImages from "../assets/images/classes";
import gameOverImage from "../assets/images/game_over.webp";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glowAnimation = keyframes`
  0% { text-shadow: 0 0 10px #d4af37, 0 0 20px #d4af37, 0 0 30px #d4af37; }
  50% { text-shadow: 0 0 15px #d4af37, 0 0 25px #d4af37, 0 0 35px #d4af37; }
  100% { text-shadow: 0 0 10px #d4af37, 0 0 20px #d4af37, 0 0 30px #d4af37; }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const particleAnimation = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
  }
`;

const GameOverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 40px);
  text-align: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
  background-color: #000;
  background-image: url(${gameOverImage});
  background-size: cover;
  background-position: center;
  z-index: 1;
  box-sizing: border-box;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: -1;
    animation: ${fadeIn} 2s ease-out;
  }
`;

const ContentContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  border: 2px solid #8b4513;
  padding: 25px;
  max-width: 550px;
  width: 100%;
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.3);
  animation: ${fadeIn} 1s ease-out;
  backdrop-filter: blur(5px);
  position: relative;
  z-index: 2;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px;
    max-width: 90%;
  }

  &::after {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border: 1px solid #d4af37;
    border-radius: 12px;
    pointer-events: none;
    opacity: 0.5;
    animation: ${glowAnimation} 3s infinite;
  }
`;

const Title = styled.h1`
  font-size: 3.2rem;
  margin-bottom: 25px;
  color: ${(props) => (props.victory ? "#d4af37" : "#ff6b6b")};
  text-shadow: 0 0 10px ${(props) => (props.victory ? "#d4af37" : "#ff6b6b")};
  animation: ${glowAnimation} 2s infinite;
  letter-spacing: 3px;
  font-family: "Cinzel", serif;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Message = styled.p`
  font-size: 1.3rem;
  max-width: 100%;
  margin-bottom: 20px;
  line-height: 1.5;
  color: #f0e6d2;
  animation: ${fadeIn} 1.5s ease-out;
  animation-delay: ${(props) => props.delay || "0s"};
  opacity: ${(props) => (props.visible ? 1 : 0)};

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 10px;
  }
`;

const StatsContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  border: 2px solid #8b4513;
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;
  width: 100%;
  max-width: 450px;
  animation: ${fadeIn} 2s ease-out;
  box-shadow: 0 0 20px rgba(139, 69, 19, 0.4);

  @media (max-width: 768px) {
    padding: 10px;
    margin: 15px 0;
  }
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 1.1rem;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(139, 69, 19, 0.3);

  &:last-child {
    border-bottom: none;
  }

  span:first-child {
    color: #d4af37;
    font-weight: bold;
  }

  span:last-child {
    color: #f0e6d2;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 8px;
    padding-bottom: 6px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  font-size: 1.3rem;
  padding: 12px 35px;
  margin-top: 15px;
  background-color: rgba(139, 69, 19, 0.8);
  color: #d4af37;
  border: 3px solid #d4af37;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${floatAnimation} 3s infinite ease-in-out;
  position: relative;
  overflow: hidden;
  font-family: "Cinzel", serif;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 10px 25px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 8px 20px;
    margin-top: 10px;
  }

  &:before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: rgba(255, 255, 255, 0.1);
    transform: rotate(45deg);
    transition: all 0.5s;
    opacity: 0;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(212, 175, 55, 0.5);
    background-color: rgba(160, 82, 45, 0.9);

    &:before {
      opacity: 1;
      left: 100%;
    }
  }
`;

const PlayerAvatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 0 auto 30px;
  border: 4px solid #d4af37;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.5);
  animation: ${fadeIn} 1.5s ease-out, ${floatAnimation} 4s infinite ease-in-out;
  position: relative;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
    margin-bottom: 15px;
  }

  &::after {
    content: "";
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border: 2px solid rgba(212, 175, 55, 0.3);
    border-radius: 50%;
    animation: ${glowAnimation} 3s infinite;
  }
`;

const StatsTitle = styled.h2`
  color: #d4af37;
  margin-bottom: 15px;
  font-size: 1.6rem;
  text-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
  font-family: "Cinzel", serif;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 10px;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Particles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
`;

const Particle = styled.div`
  position: absolute;
  display: block;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: rgba(212, 175, 55, ${(props) => props.opacity});
  bottom: -100px;
  border-radius: 50%;
  animation: ${particleAnimation} ${(props) => props.duration}s linear infinite;
  animation-delay: ${(props) => props.delay}s;
  left: ${(props) => props.left}%;
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.8), 0 0 20px rgba(212, 175, 55, 0.6);
`;

const GameOver = () => {
  const { player, gameState } = useGame();
  const navigate = useNavigate();
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [particles, setParticles] = useState([]);

  // Função para obter a imagem do jogador baseada na classe
  const getPlayerImage = (playerClass) => {
    if (gameState.victory) {
      // Se for vitória, usar a imagem de vitória correspondente à classe
      const classKey =
        playerClass?.toLowerCase() ||
        player.class?.id?.toLowerCase() ||
        "warrior";
      return classImages[`${classKey}_victory`] || classImages.default;
    }
    // Se for derrota, usar a imagem padrão da classe
    return classImages[playerClass] || classImages.default;
  };

  const handlePlayAgain = () => {
    navigate("/");
  };

  // Mensagens de fim de jogo
  const victoryMessages = [
    "Parabéns! Você se tornou o novo rei de Elbion e trouxe paz e prosperidade ao reino.",
    "Sua jornada foi longa e árdua, mas você provou ser digno da coroa.",
    "As histórias de suas façanhas serão contadas por gerações.",
  ];

  const defeatMessages = [
    "Sua jornada chegou ao fim antes que você pudesse reivindicar o trono.",
    "Elbion permanecerá em caos, aguardando outro herói para salvá-lo.",
    "Talvez em outra vida, você possa completar o que começou.",
  ];

  const messages = gameState.victory ? victoryMessages : defeatMessages;

  // Efeito para mostrar as mensagens gradualmente
  useEffect(() => {
    messages.forEach((_, index) => {
      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, index]);
      }, 1000 * (index + 1));
    });

    // Gerar partículas
    const particlesArray = [];
    for (let i = 0; i < 12; i++) {
      particlesArray.push({
        id: i,
        size: Math.random() * 8 + 3,
        left: Math.random() * 100,
        duration: Math.random() * 12 + 8,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }
    setParticles(particlesArray);
  }, []);

  return (
    <GameOverContainer>
      <Particles>
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            size={particle.size}
            left={particle.left}
            duration={particle.duration}
            delay={particle.delay}
            opacity={particle.opacity}
          />
        ))}
      </Particles>

      <ContentContainer>
        <Title victory={gameState.victory}>
          {gameState.victory ? "Vitória!" : "Fim de Jornada"}
        </Title>

        {gameState.victory && (
          <PlayerAvatar
            image={getPlayerImage(
              player.class?.id || player.className?.toLowerCase()
            )}
          />
        )}

        {messages.map((message, index) => (
          <Message
            key={index}
            delay={`${index * 0.5 + 0.5}s`}
            visible={visibleMessages.includes(index)}
          >
            {message}
          </Message>
        ))}

        <StatsContainer>
          <StatsTitle>Estatísticas Finais</StatsTitle>
          <StatItem>
            <span>Nome:</span>
            <span>{player.name}</span>
          </StatItem>
          <StatItem>
            <span>Classe:</span>
            <span>{player.className || player.class?.name}</span>
          </StatItem>
          <StatItem>
            <span>Nível Alcançado:</span>
            <span>{player.level}</span>
          </StatItem>
          <StatItem>
            <span>Ouro Acumulado:</span>
            <span>{player.gold}</span>
          </StatItem>
          <StatItem>
            <span>Fase Alcançada:</span>
            <span>{gameState.currentPhase + 1} de 5</span>
          </StatItem>
        </StatsContainer>

        <Button onClick={handlePlayAgain}>Jogar Novamente</Button>
      </ContentContainer>
    </GameOverContainer>
  );
};

export default GameOver;
