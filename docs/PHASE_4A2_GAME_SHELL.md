# Fase 4A.2 | Game Shell + Topbar + Bottom Nav

## Objetivo

Aplicar a fundação visual da Fase 4A.0 e o pipeline de assets da Fase 4A.1 no shell principal do Veyra: Aetherfall, sem alterar sistemas de economia, gacha, Supabase, autenticação, pagamentos ou autoridade server-side.

## Entregáveis

- `AppShell` passa a usar `GameBackground` e o manifesto `gameAssets` para o fundo principal.
- `GameBackground` agora pré-carrega o background solicitado e mantém o placeholder local enquanto o asset real não existir ou falhar.
- `GameAssetImage` sincroniza `currentSrc` quando `src` ou `fallbackSrc` mudam, permitindo troca dinâmica de assets sem exigir remount manual.
- `Topbar` passa a usar ícones do manifesto de assets para recursos, com fallback local.
- `BottomNav` recebeu classes visuais reutilizáveis, estados ativos mais claros e aria-label.
- `veyra-components.css` recebeu classes específicas de shell, topbar, nav, recursos compactos e ícone do app.

## Fora do escopo preservado

- Nenhum asset externo foi baixado.
- Nenhum ZIP, binário pesado ou dependência nova foi adicionado.
- Nenhuma regra econômica foi criada no frontend.
- Nenhum sorteio de gacha, reward, pagamento, saque, marketplace ou NFT foi implementado.
- Nenhuma alteração de Supabase, Edge Functions ou RLS foi feita.

## Segurança

Esta fase é apenas visual/estrutural. O frontend continua sem autoridade para conceder moedas, tickets, recompensas, shards, starter pack, summon ou qualquer recurso econômico.

## Próximo passo recomendado

Depois desta fase, iniciar a **Fase 4B — Home RPG Premium**, aplicando o mesmo shell e pipeline de assets na Home de forma mais imersiva, ainda sem adicionar assets externos antes do registro em `docs/ASSET_LICENSES.md`.
