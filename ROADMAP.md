# Roadmap de Desenvolvimento - Saga dos Reis

_Última atualização: 06/03/2025_

Este documento contém o plano de desenvolvimento e melhorias para o jogo "Saga dos Reis", organizado por categorias e prioridades.

## 🏗️ Arquitetura e Estrutura do Código

### Alta Prioridade

- [✅] Refatoração do sistema de combate para reduzir complexidade
- [✅] Implementação do sistema de missões com contadores de progresso
- [ ] Implementação de um sistema de gerenciamento de diálogos

### Média Prioridade

- [ ] Refatoração da lógica de recompensas para um sistema mais escalável
- [ ] Implementação de um sistema modular de habilidades

### Baixa Prioridade

- [ ] Otimização de performance para dispositivos móveis

## 🧠 Gerenciamento de Estado

### Alta Prioridade

- [✅] Correção do ciclo recursivo em determinadas chamadas de estado
- [✅] Implementação de validação de estado para evitar estados inconsistentes

### Média Prioridade

- [ ] Persistência do estado do jogo através de sessões (save/load)

### Baixa Prioridade

- [ ] Implementação de sistema de checkpoints automáticos

## 🎮 Gameplay e Balanceamento

### Alta Prioridade

- [✅] Implementação de inimigos com diferentes níveis de dificuldade (normal/elite/boss)
- [✅] Adição do vilão Garrick como primeiro boss do jogo
- [ ] Sistema de progressão do jogador com habilidades desbloqueáveis

### Média Prioridade

- [ ] Implementação de um sistema de crafting
- [ ] Adição de mais classes jogáveis com habilidades únicas

### Baixa Prioridade

- [ ] Sistema de reputação com facções do mundo

## 🖼️ Interface e Experiência do Usuário

### Alta Prioridade

- [✅] Melhorias na interface de combate com feedback visual
- [✅] Personalização do favicon e ícones do jogo
- [ ] Implementação de efeitos sonoros básicos

### Média Prioridade

- [ ] Redesign da interface para telas menores (responsividade)
- [ ] Adição de animações para ações principais

### Baixa Prioridade

- [ ] Tema escuro/claro para a interface

## 📱 Plataformas e Distribuição

### Alta Prioridade

- [ ] Garantir compatibilidade com navegadores modernos
- [ ] Otimizar para dispositivos móveis (layout responsivo)
- [ ] Resolver problemas de PWA (ícones e manifest)

### Média Prioridade

- [ ] Transformar em PWA completo
- [ ] Desenvolver versão para Desktop com Electron
- [ ] Preparar para distribuição em plataformas como itch.io

### Baixa Prioridade

- [ ] Explorar publicação em lojas de aplicativos
- [ ] Implementar sistema de achievements
- [ ] Considerar versão multiplayer básica

## 🧪 Testes e Qualidade

### Alta Prioridade

- [ ] Implementar testes unitários para lógica de combate
- [ ] Criar pipeline de CI/CD
- [ ] Estabelecer processo de code review

### Média Prioridade

- [ ] Adicionar testes de integração
- [ ] Implementar análise estática de código
- [ ] Melhorar tratamento de erros e logging

### Baixa Prioridade

- [ ] Implementar testes end-to-end
- [ ] Criar sistema de telemetria para análise de jogo
- [ ] Estabelecer métricas de qualidade

## 🌍 Conteúdo e Narrativa

### Alta Prioridade

- [ ] Finalizar quest inicial dos bandidos
- [ ] Melhorar diálogos e feedback textual
- [ ] Adicionar mais NPCs na área inicial

### Média Prioridade

- [ ] Expandir história principal
- [ ] Adicionar quests secundárias
- [ ] Desenvolver sistema de escolhas com consequências

### Baixa Prioridade

- [ ] Criar sistema de facções
- [ ] Implementar eventos aleatórios no mundo
- [ ] Adicionar sistema de clima e passagem de tempo

## 💰 Monetização (Opcional)

### Considerações Futuras

- [ ] Avaliar modelos de monetização ética
- [ ] Considerar DLCs ou expansões pagas
- [ ] Explorar opções de personalização premium

---

## Próximos Sprints

### Sprint 1 (Curto prazo - Em andamento)

- [x] Corrigir bugs críticos no sistema de combate
  - [x] Resolver problema de recursão infinita no sistema de derrota
  - [x] Limpar código não utilizado e arquivos de backup
- [ ] Finalizar balanceamento da quest dos bandidos
- [ ] Melhorar feedback visual para ações do jogador
- [ ] Refatorar sistema de experiência

### Sprint 2 (Médio prazo - 1-2 meses)

- [ ] Iniciar migração para TypeScript (arquivos críticos)
- [ ] Implementar sistema de salvamento melhorado
- [ ] Melhorar organização do código
- [ ] Adicionar mais conteúdo à área inicial

### Sprint 3 (Longo prazo - 3+ meses)

- [ ] Expandir conteúdo de jogo (novas áreas)
- [ ] Implementar novos sistemas (crafting, fações)
- [ ] Considerar distribuição em plataformas
- [ ] Desenvolver versão mobile otimizada

---

_Nota: Este documento deve ser revisado e atualizado regularmente conforme o desenvolvimento avança._
