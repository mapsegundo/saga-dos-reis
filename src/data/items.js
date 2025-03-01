// Definição de todos os itens do jogo
export const items = [
  // Poções e consumíveis
  {
    id: "health_potion",
    name: "Poção de Cura 🧪",
    type: "consumable",
    effect: "heal",
    value: 30,
    price: 10,
    description: "Restaura 30 pontos de vida quando consumida.",
    emoji: "🧪",
  },
  {
    id: "mana_potion",
    name: "Poção de Mana ✨",
    type: "consumable",
    effect: "mana",
    value: 30,
    price: 15,
    description: "Restaura 30 pontos de mana quando consumida.",
    emoji: "✨",
  },

  // Armas
  {
    id: "sword",
    name: "Espada de Ferro",
    type: "weapon",
    damage: 10,
    value: 15,
    price: 50,
    description: "Uma espada básica de ferro, bem balanceada e afiada.",
    emoji: "⚔️",
  },
  {
    id: "bow",
    name: "Arco de Caça",
    type: "weapon",
    damage: 12,
    value: 15,
    price: 50,
    description: "Um arco simples mas eficiente para caça e combate.",
    emoji: "🏹",
  },
  {
    id: "staff",
    name: "Cajado de Aprendiz",
    type: "weapon",
    damage: 8,
    value: 15,
    price: 50,
    description: "Um cajado básico que canaliza energia mágica.",
    emoji: "🪄",
  },
  {
    id: "rusty_dagger",
    name: "Adaga Enferrujada",
    type: "weapon",
    damage: 5,
    value: 5,
    price: 10,
    description: "Uma adaga velha e enferrujada, mas ainda pode ser útil.",
    emoji: "🗡️",
  },
  {
    id: "garrick_sword",
    name: "Espada de Garrick",
    type: "weapon",
    damage: 15,
    value: 30,
    price: 100,
    description: "A espada do líder dos bandidos. Bem forjada e afiada.",
    emoji: "⚔️",
  },

  // Armaduras
  {
    id: "leather_armor",
    name: "Armadura de Couro",
    type: "armor",
    defense: 5,
    value: 10,
    price: 40,
    description: "Uma armadura básica de couro, oferece proteção mínima.",
    emoji: "🛡️",
  },
  {
    id: "light_leather",
    name: "Armadura de Couro Leve",
    type: "armor",
    defense: 3,
    value: 8,
    price: 30,
    description: "Uma armadura leve que permite movimentos rápidos.",
    emoji: "🧥",
  },
  {
    id: "apprentice_robe",
    name: "Vestes de Aprendiz",
    type: "armor",
    defense: 2,
    value: 8,
    price: 30,
    description:
      "Vestes simples que oferecem proteção mínima, mas aumentam o poder mágico.",
    emoji: "👘",
  },

  // Acessórios
  {
    id: "fighter_gloves",
    name: "Luvas de Lutador",
    type: "accessory",
    effect: "strength",
    value: 2,
    price: 25,
    description: "Luvas reforçadas que aumentam a força do usuário.",
    emoji: "🧤",
  },

  // Munição
  {
    id: "arrows",
    name: "Flechas",
    type: "ammo",
    amount: 20,
    value: 1,
    price: 5,
    description: "Flechas básicas para seu arco.",
    emoji: "🏹",
  },

  // Itens de missão
  {
    id: "bandit_map",
    name: "Mapa dos Bandidos",
    type: "quest",
    value: 0,
    price: 0,
    description: "Um mapa mostrando a localização do esconderijo dos bandidos.",
    emoji: "🗺️",
  },
  {
    id: "guard_badge",
    name: "Distintivo de Guarda",
    type: "quest",
    value: 0,
    price: 0,
    description: "Um distintivo que identifica os guardas da cidade.",
    emoji: "🔰",
  },
];

// Função para encontrar um item pelo ID
export const getItemById = (id) => {
  return items.find((item) => item.id === id);
};

// Função para obter todos os itens de um determinado tipo
export const getItemsByType = (type) => {
  return items.filter((item) => item.type === type);
};

export default items;
