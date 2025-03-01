import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGame } from "../context/GameContext";
import { getClassEmoji } from "../utils/translations";
import { classes } from "../data/classes";

// Importar imagens
import classImages from "../assets/images/classes";
import uiImages from "../assets/images/ui";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
  padding: 40px 20px;
  position: relative;

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
    opacity: 0.4;
    z-index: -1;
  }
`;

const CreationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  border: 1px solid #8b4513;
  max-width: 900px;
  width: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h2`
  color: #d4af37;
  margin-bottom: 30px;
  text-align: center;
  font-size: 2rem;
  text-shadow: 0 0 10px #000, 0 0 20px #8b4513;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #d4af37;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #8b4513;
  border-radius: 5px;
  color: #fff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #d4af37;
    box-shadow: 0 0 5px rgba(212, 175, 55, 0.5);
  }
`;

const ClassSelection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ClassCard = styled.div`
  flex: 1;
  min-width: 200px;
  background-color: ${(props) =>
    props.selected ? "rgba(139, 69, 19, 0.5)" : "rgba(0, 0, 0, 0.5)"};
  border: 2px solid ${(props) => (props.selected ? "#d4af37" : "#8b4513")};
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: #d4af37;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`;

const ClassImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 15px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid #8b4513;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  margin: 0 auto 15px;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 28px;
  }
`;

const ClassName = styled.h3`
  color: #d4af37;
  margin-bottom: 10px;
  text-align: center;
`;

const ClassDescription = styled.p`
  font-size: 0.9rem;
  color: #f0e6d2;
  margin-bottom: 15px;
  line-height: 1.4;
`;

const ClassStats = styled.div`
  font-size: 0.85rem;
  color: #ccc;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const StatLabel = styled.span`
  color: #d4af37;
`;

const Button = styled.button`
  padding: 15px 40px;
  background-color: #8b4513;
  color: #d4af37;
  border: 2px solid #d4af37;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    background-color: #a0522d;
  }

  &:disabled {
    background-color: #555;
    border-color: #777;
    color: #999;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    padding: 12px 30px;
    font-size: 1.1rem;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  background-color: rgba(231, 76, 60, 0.2);
  border: 1px solid #e74c3c;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
`;

const CharacterCreation = () => {
  const navigate = useNavigate();
  const { startNewGame } = useGame();
  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [error, setError] = useState("");

  const classesData = {};
  classes.forEach((classItem) => {
    classesData[classItem.id] = {
      name: classItem.name.split(" ")[0], // Removendo o emoji do nome
      description: classItem.description,
      stats: {
        força:
          classItem.id === "warrior" ? 8 : classItem.id === "archer" ? 5 : 3,
        destreza:
          classItem.id === "warrior" ? 5 : classItem.id === "archer" ? 9 : 6,
        inteligência:
          classItem.id === "warrior" ? 3 : classItem.id === "archer" ? 5 : 10,
        constituição:
          classItem.id === "warrior" ? 9 : classItem.id === "archer" ? 6 : 4,
      },
      startingHealth: classItem.baseHealth,
      startingMana: classItem.baseMana,
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (name.trim() && selectedClass) {
      try {
        // Chamar a função startNewGame do contexto
        startNewGame(name, selectedClass);

        // Navegar para a tela do jogo
        navigate("/game");
      } catch (err) {
        console.error("Erro ao criar personagem:", err);
        setError("Ocorreu um erro ao criar o personagem. Tente novamente.");
      }
    }
  };

  return (
    <PageContainer>
      <CreationContainer>
        <Title>Crie seu Personagem</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <FormGroup>
            <Label htmlFor="name">Nome do Herói</Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome do seu personagem"
              required
            />
          </FormGroup>

          <Label>Escolha sua Classe</Label>
          <ClassSelection>
            {Object.entries(classesData).map(([classId, classInfo]) => (
              <ClassCard
                key={classId}
                selected={selectedClass === classId}
                onClick={() => setSelectedClass(classId)}
              >
                <ClassImage>{getClassEmoji(classId)}</ClassImage>
                <ClassName>{classInfo.name}</ClassName>
                <ClassDescription>{classInfo.description}</ClassDescription>
                <ClassStats>
                  {Object.entries(classInfo.stats).map(([stat, value]) => (
                    <StatRow key={stat}>
                      <StatLabel>
                        {stat.charAt(0).toUpperCase() + stat.slice(1)}:
                      </StatLabel>
                      <span>{value}</span>
                    </StatRow>
                  ))}
                  <StatRow>
                    <StatLabel>Vida:</StatLabel>
                    <span>{classInfo.startingHealth}</span>
                  </StatRow>
                  <StatRow>
                    <StatLabel>Mana:</StatLabel>
                    <span>{classInfo.startingMana}</span>
                  </StatRow>
                </ClassStats>
              </ClassCard>
            ))}
          </ClassSelection>

          <div style={{ textAlign: "center" }}>
            <Button type="submit" disabled={!name.trim() || !selectedClass}>
              Iniciar Jornada
            </Button>
          </div>
        </form>
      </CreationContainer>
    </PageContainer>
  );
};

export default CharacterCreation;
