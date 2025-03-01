// Imagens temporárias para os locais do jogo
import villageOutskirtsImg from "../arredores_da_vila.webp";
import villageSquareImg from "../vila_ravenwood.webp";
import defaultLocationImg from "./default_location.webp"; // Imagem padrão local na pasta kingdoms

// Remover logs de depuração e URLs absolutas desnecessárias
// Simplificar o código para usar diretamente as imagens importadas

const locationImages = {
  // Fase 1: Vila Inicial
  village: villageSquareImg, // Vila de Ravenwood (localização inicial)
  village_square: villageSquareImg, // Praça da Vila
  village_tavern: defaultLocationImg, // Taverna
  village_outskirts: villageOutskirtsImg, // Arredores da Vila

  // Fase 2: Capital
  capital_square: defaultLocationImg, // Praça da Capital
  capital_castle: defaultLocationImg, // Castelo
  capital_market: defaultLocationImg, // Mercado

  // Fase 3: Campos de Batalha
  battlefield: defaultLocationImg, // Campo de Batalha
  enemy_camp: defaultLocationImg, // Acampamento Inimigo

  // Fase 4: Templo Antigo
  temple_entrance: defaultLocationImg, // Entrada do Templo
  temple_halls: defaultLocationImg, // Corredores do Templo
  temple_chamber: defaultLocationImg, // Câmara do Templo

  // Fase 5: Trono
  throne_room: defaultLocationImg, // Sala do Trono

  // Imagem padrão
  default: defaultLocationImg,
};

export default locationImages;
