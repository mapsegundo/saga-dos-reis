import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CharacterCreation from "./CharacterCreation";
import { classes } from "../data/classes";
import classImages from "../assets/images/classes";
import uiImages from "../assets/images/ui";
import reinoElbionImage from "../assets/images/reino_elbion.webp";

const StartContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: auto;
  flex: 1;
  padding: 20px 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${uiImages.main_background});
    background-size: cover;
    background-position: center;
    opacity: 0.5;
    z-index: -1;
    position: fixed;
  }
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  border: 2px solid #8b4513;
  padding: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 15px;
    margin: 10px auto;
  }
`;

const BannerImage = styled.div`
  width: 100%;
  max-width: 700px;
  height: auto;
  margin: 0 auto 10px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
  border: 2px solid #8b4513;

  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    max-height: 300px;
  }

  @media (max-width: 768px) {
    margin-bottom: 10px;
    max-width: 100%;

    img {
      max-height: 200px;
    }
  }
`;

const GameLogo = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 5px;
  background-image: url(${(props) => props.logoImage});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    margin-bottom: 5px;
  }
`;

const GameTitle = styled.h1`
  font-size: 2.8rem;
  color: #d4af37;
  margin-top: 10px;
  margin-bottom: 10px;
  text-shadow: 0 0 10px #000, 0 0 20px #8b4513;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 5px;
  }
`;

const GameSubtitle = styled.h2`
  font-size: 1.4rem;
  color: #fff;
  margin-bottom: 15px;
  text-shadow: 0 0 10px #000;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }
`;

const GameDescription = styled.p`
  font-size: 1.1rem;
  color: #f0e6d2;
  margin-bottom: 25px;
  line-height: 1.5;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 20px;
    line-height: 1.4;
  }
`;

const StartButton = styled.button`
  padding: 12px 35px;
  background-color: #8b4513;
  color: #d4af37;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid #d4af37;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    background-color: #a0522d;
  }

  @media (max-width: 768px) {
    padding: 10px 25px;
    font-size: 1rem;
  }
`;

const StartScreen = () => {
  const [selectedClass, setSelectedClass] = useState("warrior");
  const [showCharacterCreation, setShowCharacterCreation] = useState(false);

  const handleStartGame = () => {
    setShowCharacterCreation(true);
  };

  const handleBackToClassSelection = () => {
    setShowCharacterCreation(false);
  };

  if (showCharacterCreation) {
    return (
      <StartContainer>
        <CharacterCreation
          selectedClass={selectedClass}
          onBack={handleBackToClassSelection}
        />
      </StartContainer>
    );
  }

  return (
    <StartContainer>
      <ContentWrapper>
        <BannerImage>
          <img src={reinoElbionImage} alt="Reino de Elbion" />
        </BannerImage>
        <GameLogo logoImage={uiImages.game_logo} />
        <GameTitle>Saga dos Reis</GameTitle>
        <GameSubtitle>Uma aventura épica no reino de Elbion</GameSubtitle>
        <GameDescription>
          O reino de Elbion está mergulhado no caos. Antigas linhagens reais
          foram destruídas, e uma profecia anuncia que cinco provações forjarão
          um verdadeiro rei. Você é um dos escolhidos para essa jornada épica.
        </GameDescription>
        <StartButton onClick={handleStartGame}>Iniciar Jornada</StartButton>
      </ContentWrapper>
    </StartContainer>
  );
};

export default StartScreen;
