// Finalizar o combate e chamar o callback
const finalizeCombat = (isVictory) => {
  // Evitar múltiplas chamadas do callback
  if (callbackCalled.current) {
    console.log("finalizeCombat: Callback já foi chamado, ignorando");
    return;
  }

  // Marcar que o callback foi chamado
  callbackCalled.current = true;

  console.log(
    `🏁 FINALIZANDO COMBATE - ID: ${combatId.current}, Resultado: ${
      isVictory ? "VITÓRIA" : "DERROTA"
    }`
  );

  // Garantir que os valores finais estejam sincronizados
  console.log(
    `⚠️ FINALIZANDO COMBATE - Resultado: ${isVictory ? "VITÓRIA" : "DERROTA"}`
  );
  console.log(
    `Vida final: ${playerHealth}/${player.maxHealth}, Mana final: ${playerMana}/${player.maxMana}`
  );

  // Sincronizar estado final com o contexto global
  syncPlayerState(playerHealth, playerMana);

  // Chamar o callback com o resultado
  onCombatEnd(isVictory);
};
