import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

// Componentes
import StartScreen from "./components/StartScreen";
import CharacterCreation from "./components/CharacterCreation";
import GameScreen from "./components/GameScreen";
import GameOver from "./components/GameOver";
import CombatPage from "./components/CombatPage";
import Footer from "./components/Footer";

// Contexto do jogo
import { GameProvider } from "./context/GameContext";

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <GameProvider>
      <Router>
        <AppContainer>
          <MainContent>
            <Routes>
              <Route path="/" element={<StartScreen />} />
              <Route
                path="/character-creation"
                element={<CharacterCreation />}
              />
              <Route path="/game" element={<GameScreen />} />
              <Route path="/combat" element={<CombatPage />} />
              <Route path="/game-over" element={<GameOver />} />
            </Routes>
          </MainContent>
          <Footer />
        </AppContainer>
      </Router>
    </GameProvider>
  );
}

export default App;
