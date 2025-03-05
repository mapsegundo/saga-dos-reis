# Changelog - Saga dos Reis

Todas as alterações notáveis deste projeto serão documentadas neste arquivo.

## [Versão Atual] - 02/03/2025

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
