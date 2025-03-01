// Utilitários para traduções e mapeamentos de texto

// Mapeamento de classes em inglês para português com seus emojis
export const classTranslations = {
  warrior: { name: "Guerreiro", emoji: "⚔️" },
  archer: { name: "Arqueiro", emoji: "🏹" },
  mage: { name: "Mago", emoji: "🧙" },
  default: { name: "Desconhecido", emoji: "❓" },
};

// Função para obter o nome traduzido da classe
export const getClassName = (classId) => {
  return classTranslations[classId]?.name || classTranslations.default.name;
};

// Função para obter o emoji da classe
export const getClassEmoji = (classId) => {
  return classTranslations[classId]?.emoji || classTranslations.default.emoji;
};

// Função para obter nome e emoji juntos
export const getClassNameWithEmoji = (classId) => {
  const classInfo = classTranslations[classId] || classTranslations.default;
  return `${classInfo.name} ${classInfo.emoji}`;
};
