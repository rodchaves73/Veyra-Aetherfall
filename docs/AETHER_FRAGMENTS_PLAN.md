# Aether Fragments

Aether Fragments são sistema futuro separado. Não são Gold, Gems, Aether Shards, Stamina, XP, material ou moeda comum de upgrade.

## Modelo futuro

```txt
weekly_reward_pool_ton = TON disponível para recompensas da semana
total_eligible_aether_fragments = soma dos fragments elegíveis da semana
ton_per_fragment = weekly_reward_pool_ton / total_eligible_aether_fragments
user_ton = user_fragments * ton_per_fragment
```

Não declarar valor fixo em USD ou TON, renda garantida, lucro garantido ou ganho diário.

## Fluxo

1. Jogador conecta wallet TON.
2. Jogador acumula Aether Fragments elegíveis.
3. Semana fecha.
4. Pool semanal define valor variável.
5. Jogador solicita saque.
6. Admin revisa.
7. Admin paga manualmente.
8. Admin registra `tx_hash`.
9. Status muda para `paid`.

Status: `draft`, `pending`, `approved`, `rejected`, `paid`, `cancelled`, `flagged`.

Copy segura: Aether Fragments participam do pool semanal de recompensas em TON. O valor final é variável e depende do pool disponível, atividade elegível e revisão antifraude. Os saques são revisados antes do pagamento. Não há valor diário garantido.
