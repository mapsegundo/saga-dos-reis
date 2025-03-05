# Plano de Execução - Sprint 1

_Data de início: 05/03/2025_
_Duração estimada: 2-4 semanas_

## Estrutura de Branches

Usaremos a seguinte estrutura de branches para organizar o desenvolvimento:

```
main
└── sprint-1
    ├── feature/bandidos-balanceamento
    ├── fix/bugs-combate
    ├── feature/feedback-visual
    └── refactor/sistema-experiencia
```

### Fluxo de Trabalho

1. Todas as branches de feature/fix serão criadas a partir da branch `sprint-1`
2. Cada tarefa será desenvolvida em sua própria branch
3. Ao concluir uma tarefa, será feito um Pull Request para a branch `sprint-1`
4. Após testar e validar todas as alterações na branch `sprint-1`, será feito um PR final para `main`

## Tarefas Detalhadas

### 1. Balanceamento da Quest dos Bandidos

**Branch:** `feature/bandidos-balanceamento`

**Objetivos:**

- Limitar o número de bandidos para exatamente 5
- Ajustar os atributos dos bandidos (vida, dano, defesa)
- Definir recompensas adequadas
- Implementar contador de progresso

**Arquivos principais:**

- `src/data/enemies.js`
- `src/components/CombatPage.js`
- `src/context/GameContext.js`

**Estimativa:** 3-5 dias

---

### 2. Correção de Bugs Críticos do Sistema de Combate

**Branch:** `fix/bugs-combate`

**Objetivos:**

- Corrigir o problema de duplicação de mensagens
- Resolver inconsistências nas recompensas
- Corrigir bugs de sincronização de estado
- Resolver problemas com o controle de turnos

**Arquivos principais:**

- `src/components/CombatPage.js`
- `src/context/GameContext.js`
- `src/components/CombatActions.js`

**Estimativa:** 2-4 dias

---

### 3. Melhorias no Feedback Visual

**Branch:** `feature/feedback-visual`

**Objetivos:**

- Adicionar indicação visual para ações do jogador
- Melhorar mensagens de combate
- Implementar animações simples para ataques e defesa
- Criar indicador de progresso para a quest

**Arquivos principais:**

- `src/components/CombatPage.js`
- `src/components/DialogBox.js`
- `src/styles/combat.js`

**Estimativa:** 3-5 dias

---

### 4. Refatoração do Sistema de Experiência

**Branch:** `refactor/sistema-experiencia`

**Objetivos:**

- Consolidar lógica de experiência em um único local
- Melhorar cálculo de experiência com base na dificuldade
- Criar sistema mais previsível de nivelamento
- Implementar feedback claro sobre ganho de experiência

**Arquivos principais:**

- `src/context/GameContext.js`
- `src/utils/experienceCalculator.js` (novo)
- `src/components/LevelUpNotification.js` (novo)

**Estimativa:** 4-6 dias

---

## Critérios de Aceitação

Para considerar o Sprint 1 concluído, as seguintes condições devem ser atendidas:

1. **Quest dos Bandidos**

   - Jogador consegue derrotar todos os 5 bandidos
   - Dificuldade equilibrada para nível inicial
   - Progresso claramente indicado

2. **Sistema de Combate**

   - Sem mensagens duplicadas
   - Recompensas consistentes
   - Turnos funcionando corretamente

3. **Feedback Visual**

   - Ações claras e visíveis
   - Animações básicas funcionando
   - Melhor legibilidade das informações

4. **Sistema de Experiência**
   - Cálculo de experiência centralizado
   - Níveis e experiência balanceados
   - Feedback claro sobre ganho de experiência

## Próximos Passos

1. Criar a branch `sprint-1`
2. Criar as branches de feature/fix
3. Distribuir tarefas
4. Iniciar o desenvolvimento
5. Revisões de código
6. Integração na branch `sprint-1`
7. Testes finais
8. Merge para `main`
