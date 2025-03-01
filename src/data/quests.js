// Dados das missões do jogo

export const quests = [
  {
    id: "welcome_to_elbion",
    name: "Bem-vindo a Elbion",
    description:
      "Fale com o prefeito da vila para entender a situação atual do reino.",
    type: "talk_to_npc",
    targetId: "village_mayor",
    completed: false,
    reward: {
      experience: 50,
      gold: 10,
      items: [],
    },
  },
  {
    id: "clear_forest_path",
    name: "Limpar o Caminho da Floresta",
    description:
      "Elimine os goblins que estão bloqueando o caminho para a floresta.",
    type: "defeat_enemies",
    targetId: "goblin",
    targetCount: 3,
    currentCount: 0,
    completed: false,
    reward: {
      experience: 100,
      gold: 25,
      items: [
        {
          id: "health_potion",
          name: "Poção de Cura 🧪",
          type: "consumable",
          effect: "heal",
          value: 30,
          amount: 1,
          description: "Restaura 30 pontos de vida quando consumida.",
        },
      ],
    },
  },
  {
    id: "visit_ancient_ruins",
    name: "Explorar as Ruínas Antigas",
    description:
      "Visite as ruínas antigas a leste da floresta para procurar pistas sobre a profecia.",
    type: "visit_location",
    targetId: "ancient_ruins",
    completed: false,
    reward: {
      experience: 150,
      gold: 0,
      items: [
        {
          id: "ancient_relic",
          name: "Relíquia Antiga 🏺",
          type: "quest_item",
          value: 100,
          description:
            "Um artefato antigo que pode conter pistas sobre a profecia dos reis.",
        },
      ],
    },
  },
];

// Função para obter uma missão pelo ID
export const getQuestById = (id) => {
  return quests.find((quest) => quest.id === id);
};

// Função para obter missões por tipo
export const getQuestsByType = (type) => {
  return quests.filter((quest) => quest.type === type);
};
