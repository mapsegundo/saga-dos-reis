/**
 * Este script gera imagens de placeholder para o jogo.
 * Execute com: node scripts/create-placeholder-images.js
 */

const fs = require("fs");
const path = require("path");

// Caminhos para os diretórios de imagem
const IMAGE_DIRS = [
  "public/images/ui",
  "public/images/enemies",
  "public/images/classes",
];

// Definição de todas as imagens que precisamos criar
const IMAGES = [
  // UI Images
  {
    dir: "ui",
    name: "main-background.jpg",
    type: "jpg",
    content: "BACKGROUND_MAIN",
  },
  {
    dir: "ui",
    name: "game-background.jpg",
    type: "jpg",
    content: "BACKGROUND_GAME",
  },
  {
    dir: "ui",
    name: "victory-background.jpg",
    type: "jpg",
    content: "BACKGROUND_VICTORY",
  },
  {
    dir: "ui",
    name: "defeat-background.jpg",
    type: "jpg",
    content: "BACKGROUND_DEFEAT",
  },
  {
    dir: "ui",
    name: "inventory-icon.png",
    type: "png",
    content: "ICON_INVENTORY",
  },
  { dir: "ui", name: "quest-icon.png", type: "png", content: "ICON_QUEST" },
  { dir: "ui", name: "attack-icon.png", type: "png", content: "ICON_ATTACK" },
  { dir: "ui", name: "game-logo.png", type: "png", content: "LOGO_GAME" },
  { dir: "ui", name: "default.png", type: "png", content: "DEFAULT_UI" },

  // Enemy Images
  { dir: "enemies", name: "bandit.png", type: "png", content: "ENEMY_BANDIT" },
  { dir: "enemies", name: "wolf.png", type: "png", content: "ENEMY_WOLF" },
  {
    dir: "enemies",
    name: "skeleton.png",
    type: "png",
    content: "ENEMY_SKELETON",
  },
  {
    dir: "enemies",
    name: "bandit-leader.png",
    type: "png",
    content: "ENEMY_BANDIT_LEADER",
  },
  {
    dir: "enemies",
    name: "dark-knight.png",
    type: "png",
    content: "ENEMY_DARK_KNIGHT",
  },
  {
    dir: "enemies",
    name: "necromancer.png",
    type: "png",
    content: "ENEMY_NECROMANCER",
  },
  {
    dir: "enemies",
    name: "king-elbion.png",
    type: "png",
    content: "ENEMY_KING_ELBION",
  },
  {
    dir: "enemies",
    name: "default-enemy.png",
    type: "png",
    content: "ENEMY_DEFAULT",
  },

  // Class Images
  {
    dir: "classes",
    name: "warrior.png",
    type: "png",
    content: "CLASS_WARRIOR",
  },
  { dir: "classes", name: "archer.png", type: "png", content: "CLASS_ARCHER" },
  { dir: "classes", name: "mage.png", type: "png", content: "CLASS_MAGE" },
  {
    dir: "classes",
    name: "default-class.png",
    type: "png",
    content: "CLASS_DEFAULT",
  },

  // Manifest Icons
  { dir: "", name: "logo192.png", type: "png", content: "LOGO" },
  { dir: "", name: "logo512.png", type: "png", content: "LOGO_LARGE" },
];

// Criar diretórios se não existirem
IMAGE_DIRS.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    console.log(`Criando diretório: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Criar arquivo vazio com texto placeholder
function createPlaceholderFile(filePath, content) {
  console.log(`Criando arquivo: ${filePath}`);

  // Cria um arquivo de texto simples com o conteúdo
  fs.writeFileSync(
    filePath,
    `Esta é uma imagem placeholder: ${content}`,
    "utf8"
  );
}

// Processar cada imagem
IMAGES.forEach((image) => {
  const dirPath = image.dir ? `public/images/${image.dir}` : "public";

  // Garantir que o diretório exista
  if (!fs.existsSync(dirPath)) {
    console.log(`Criando diretório: ${dirPath}`);
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const filePath = path.join(dirPath, image.name);
  createPlaceholderFile(filePath, image.content);
});

console.log("Geração de imagens concluída!");
console.log(
  "IMPORTANTE: Estas são apenas imagens de placeholder em formato de texto."
);
console.log("Para um jogo real, substitua estes arquivos por imagens reais.");
