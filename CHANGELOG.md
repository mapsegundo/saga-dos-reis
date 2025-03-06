# Changelog - Saga dos Reis

Todas as alterações notáveis deste projeto serão documentadas neste arquivo.

## [Versão Atual] - 06/03/2025

### Correções

- Corrigido erro crítico de "Maximum call stack size exceeded" no sistema de combate
- Removido ciclo recursivo infinito entre as funções handleDefeat e syncPlayerState
- Limpo código não utilizado e arquivos de backup desnecessários
- Corrigido o problema que impedia a imagem de fundo do Garrick de aparecer nos arredores da vila
- Corrigida a condição para verificar se todos os bandidos foram derrotados
- Resolvido problema de exibição do botão de combate para Garrick
- Corrigido erro em que `gameState.enemiesDefeated` estava undefined

### Adições

- Melhorada a exibição de mensagens de recompensa com emojis e formatação
- Adicionados novos assets de imagens para classes, inimigos e UI
- Implementado sistema para verificar saúde do jogador em todos os métodos de ação
- Adicionadas funções úteis para o tratamento de imagens
- Adicionado Garrick como novo inimigo que aparece após derrotar 5 bandidos/arqueiros
- Implementado sistema de contadores para bandidos e arqueiros bandidos
- Adicionada imagem de background para Garrick quando ele aparece nos arredores da vila
- Adicionado favicon personalizado com coroa para o jogo
- Implementadas meta tags para melhor exibição em dispositivos móveis

### Ajustes

- Melhorada a exibição de mensagens do sistema durante o combate
- Refinado o sistema de recompensa com probabilidades ajustadas (70% ouro, 30% poção de vida, 20% poção de mana)
- Ajustes na interface para melhor responsividade
- Sistema de combate: Adicionadas verificações de turno em todas as ações do jogador
- Sistema de combate: Centralizada a lógica de finalização do combate
- Sistema de combate: Melhorado o feedback de mensagens no log de combate
- Melhorada a integração entre componentes (GameScreen e ActionMenu)
- Otimizado o carregamento de imagens com verificações de fallback
- Aprimorada a exibição de diálogo quando Garrick aparece
- Adicionadas novas ferramentas de depuração para monitorar o estado do jogo

## [Versão Anterior] - 02/03/2025

### Correções

- Corrigido o problema de mensagens duplicadas de experiência no diálogo
- Desativado temporariamente o sistema de recompensas de equipamentos
- Corrigido o sistema de derrota para processar adequadamente quando o jogador morre
- Removido o redirecionamento automático após vitórias/derrotas (agora requer clique do usuário)
- Sistema de combate: Implementado controle de turnos adequado para evitar ações fora de ordem
- Sistema de combate: Corrigida a finalização de combate para evitar múltiplas chamadas do callback
- Sistema de combate: Melhorada a lógica de ataque do inimigo com verificações de estado
- Sistema de combate: Corrigido problema de recompensas indevidas após vitória
- Sistema de combate: Simplificadas as funções de vitória e derrota para maior clareza

### Adições

- Melhorada a exibição de mensagens de recompensa com emojis e formatação
- Adicionados novos assets de imagens para classes, inimigos e UI
- Implementado sistema para verificar saúde do jogador em todos os métodos de ação
- Adicionadas funções úteis para o tratamento de imagens

### Ajustes

- Melhorada a exibição de mensagens do sistema durante o combate
- Refinado o sistema de recompensa com probabilidades ajustadas (70% ouro, 30% poção de vida, 20% poção de mana)
- Ajustes na interface para melhor responsividade
- Sistema de combate: Adicionadas verificações de turno em todas as ações do jogador
- Sistema de combate: Centralizada a lógica de finalização do combate
- Sistema de combate: Melhorado o feedback de mensagens no log de combate
