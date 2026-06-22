# Roadmap mestre oficial | Veyra: Aetherfall

Este roadmap define a ordem oficial de evolução. Cada tarefa deve implementar no máximo uma fase ou subfase aprovada. Funcionalidades de fases futuras devem ser documentadas, não implementadas antecipadamente.

## Fase 0 | Base técnica

**Status:** concluída.

### Pré-requisitos

- Repositório GitHub disponível.
- Projeto inicial autorizado.

### Entregáveis

- Vite SPA.
- React.
- TypeScript.
- Tailwind CSS.
- Vercel.
- Supabase client preparado.
- Telas MVP.
- Auditoria mobile pós-deploy.

### Definição de pronto

- Build de produção gerado.
- Deploy Vercel funcionando.
- Navegação MVP disponível.
- Shell mobile auditado para portrait.

### Dependências

- GitHub.
- Vercel.
- Variáveis públicas Vite.

### Riscos

- MVP ainda usa mocks e dados locais.
- Ausência de autenticação server-side e persistência real.

### Sistemas proibidos nesta fase

- Pagamentos reais.
- Saques.
- Rewards financeiros.
- Persistência econômica real sem backend.

## Fase 1 | Governança

**Status:** concluída.

### Pré-requisitos

- Fase 0 concluída.
- Auditoria mobile mergeada.
- Documentos técnicos existentes disponíveis.

### Entregáveis

- `AGENTS.md`.
- `docs/CURRENT_STATE.md`.
- `docs/MASTER_ROADMAP.md`.
- `docs/ARCHITECTURE_DECISIONS.md`.
- `docs/FEATURE_STATUS.md`.

### Definição de pronto

- Fonte oficial de contexto criada.
- Regras de branch, PR, validação, segurança e escopo documentadas.
- Status real das features registrado sem inflar mocks para produção.

### Dependências

- Estado atual da `main`.
- Documentos já existentes em `docs/`.

### Riscos

- Documentação ficar desatualizada se futuras tarefas não registrarem mudanças.
- Agentes ignorarem limites de fase e tentarem implementar funcionalidades antecipadas.

### Sistemas proibidos nesta fase

- Qualquer funcionalidade nova.
- Qualquer alteração em `src/**`.
- Dependências novas.
- Mudanças de configuração.

## Fase 1.1 | Gram / TON terminology guardrails

**Status:** concluída.

### Objetivo

Padronizar a terminologia entre Gram, Toncoin, TON e TON Connect antes de implementar autenticação, wallet, pagamentos ou saques.

### Entregáveis

- `docs/TOKEN_TERMINOLOGY.md`.
- Atualização incremental dos documentos oficiais.
- Regra clara entre display/copy e nomes técnicos.

### Definição de pronto

- UI futura orientada a Gram/GRAM.
- Rede e integração técnica preservadas como TON / TON Connect.
- Nenhum código, schema ou pagamento real alterado.

## Fase 2 | Autenticação Telegram segura

**Status:** concluída. Telegram Auth, Player Bootstrap e Player Core Profile foram implementados, deployados/aplicados e testados no Telegram Mini App.

### Fase 2A | Contratos e Edge Functions

**Status:** concluída e mergeada.

#### Entregáveis 2A

- Contrato técnico de autenticação Telegram.
- Helpers compartilhados para encoding, HMAC, validação de `initData`, sessão Veyra e CORS.
- Edge Functions `telegram-auth` e `telegram-session`.
- Testes Deno dos helpers críticos.

#### Limites 2A

- Histórico da subfase: contratos e código base preparados antes do deploy.
- Estado atual consolidado: funções de auth foram disponibilizadas e testadas em fases posteriores.
- Secrets reais permanecem fora do Git.

### Fase 2B | Deploy readiness e validação operacional

**Status:** preparada.

#### Entregáveis 2B

- Documentação de deploy controlado.
- Checklist de secrets server-side, sem valores reais no Git.
- Validação Deno/TypeScript das Edge Functions quando o ambiente permitir.
- Plano de teste real com Telegram Mini App.
- Registro de riscos operacionais e próximos bloqueios.
- Estado atual consolidado: deploy e teste real foram executados em fases posteriores; secrets reais continuam fora do Git.

### Fase 2B.1 | GitHub Actions manual deploy das Edge Functions

**Status:** concluída/executada para as funções necessárias até a Fase 3.

#### Entregáveis 2B.1

- Workflow manual `Deploy Supabase Edge Functions` com gatilho exclusivo `workflow_dispatch`.
- Deploy individual das funções `telegram-auth` e `telegram-session`.
- Uso dos secrets de GitHub Actions `SUPABASE_ACCESS_TOKEN` e `SUPABASE_PROJECT_ID`, sem valores reais no Git.
- Documentação de execução pelo celular, validação pós-Action e rollback básico.

#### Limites 2B.1

- Workflow manual usado para disponibilizar as Edge Functions necessárias.
- Secrets reais permanecem fora do Git.
- Nenhuma service role é exposta ao frontend.

### Fase 2C | Frontend auth integration controlada

**Status:** concluída e testada no Mini App.

#### Entregáveis 2C

- Frontend integrado aos endpoints `telegram-auth` e `telegram-session` para validação real controlada quando aberto no Telegram Mini App.
- Token Veyra mantido somente em memória, sem armazenamento persistente.
- Fallback seguro preservado fora do Telegram Mini App em modo preview/mock, sem autenticação falsa.
- Supabase Auth JWT continua fora do escopo; a sessão Veyra curta permanece o mecanismo atual.
- Bootstrap de player e foundation core foram concluídos em fases posteriores.

### Fase 2D | Player bootstrap server-side mínimo

**Status:** concluída e testada no Mini App.

#### Entregáveis 2D

- Migration `public.veyra_players` mínima com RLS habilitado e sem policy pública.
- Edge Function `player-bootstrap` para validar sessão Veyra e criar/atualizar o player por `telegram_user_id`.
- Frontend chama bootstrap após auth e mostra status básico do player sem expor token.
- Workflow manual passa a implantar também `player-bootstrap`.

#### Limites 2D

- Migration e deploy foram executados no processo de validação até a Fase 3.
- Pagamentos, saques e sistemas financeiros continuam bloqueados.
- `Telegram Auth: Connected` e `Player synced` foram validados no Mini App real.

### Pré-requisitos

- Governança concluída.
- Fase 1.1 concluída com guardrails de terminologia Gram / TON.
- Contratos de autenticação definidos.
- Ambiente backend/Edge Function autorizado.

### Entregáveis

- Validação de `initData` no servidor.
- Sessão segura.
- Separação explícita de modo dev.
- Bootstrap autenticado mínimo.
- Documentação de contrato client/server.

### Definição de pronto

- Nenhuma identidade real depende de `initDataUnsafe`.
- Sessão é criada somente após validação server-side.
- Fluxo dev não se mistura com produção.
- Recursos foundation da Fase 3 só são persistidos por operações server-side autorizadas.

### Dependências

- Telegram Bot Token disponível somente em ambiente server-side.
- Supabase ou função server-side preparada.

### Riscos

- Vazamento de token Telegram.
- Confundir usuário de UI com usuário autenticado.
- Criar autenticação falsa no cliente.

### Sistemas proibidos nesta fase

- Implementar pagamentos reais.
- Implementar saques.
- Expor service role no frontend.
- Confiar em `initDataUnsafe` como autenticação.

## Fase 3 | Core Game Systems Foundation

**Status:** concluída, aplicada no Supabase e testada no Telegram Mini App.

### Pré-requisitos

- Fase 2 concluída.
- Sessão Telegram segura disponível.
- Modelo inicial revisado.

### Entregáveis

- Game-state Edge Function.
- Starter Pack server-side com claim único.
- Currencies foundation.
- Hero catalog foundation.
- Banners foundation.
- Gacha-summon Edge Function para 1x e 10x.
- Pity foundation.
- Duplicate conversion foundation com hero shards e soul dust.
- Progressão de heróis preparada.
- Regras puras de combate e contratos de ads preparados.
- RLS e grants restritivos para operações críticas.

### Definição de pronto

- Migration da Fase 3 aplicada manualmente no Supabase.
- Workflow de Edge Functions executado.
- Mini App testado em fluxo real.
- `game-state` carregando.
- Starter pack funcionando uma única vez.
- Summon 1x e 10x funcionando server-side.
- Currencies, pity, duplicatas/shards/soul dust testados.
- Service role permanece fora do frontend.
- Frontend não sorteia gacha e não entrega resources.

### Dependências

- Supabase Postgres.
- Autenticação Telegram segura.

### Riscos

- RLS incorreta.
- Escrita direta insegura pelo cliente.
- Migrações incompatíveis com produção.

### Sistemas proibidos nesta fase

- Battle finish com rewards reais finais.
- Dungeon finish com rewards reais finais.
- Pagamentos reais.
- Stars reais.
- TON/Gram real.
- Marketplace/NFT/staking.
- Aether Fragments reais.
- Saques.

## Fase 4 | Visual e Game Shell Premium

**Status:** planejada.

### Próxima fase autorizada

- **Fase 4A — Visual System + Game Shell Base.**

### Subfases oficiais

#### Fase 4A — Visual System + Game Shell Base

- Definir base visual premium dark aether fantasy.
- Consolidar shell mobile-first, navegação, espaçamentos, safe area, tokens visuais e estados globais.
- Não implementar UI final completa de cada feature nem novos sistemas server-side.

##
### Fase 4A.0 | Dark Arcane Visual Tokens Foundation

**Status:** concluída.

#### Entregáveis

- Tokens CSS globais.
- Classes visuais reutilizáveis.
- Documentação do sistema visual.

### Fase 4A.1 | Asset Pipeline Foundation

**Status:** concluída.

#### Entregáveis

- Estrutura pública `public/assets/game/**`.
- Placeholders SVG leves e locais.
- Manifesto TypeScript `gameAssets`.
- Tipos para imagens e spritesheets simples.
- Componentes utilitários para imagem, background, rarity frame e asset slot.
- Documentação de pipeline e licenças.

#### Limites

- Nenhum asset externo baixado.
- Nenhuma tela redesenhada.
- Sem Canvas, Phaser, gacha client-side, reward client-side ou sistemas econômicos novos.

### Fase 4A.2 | Game Shell + Topbar + Bottom Nav

**Status:** próxima subfase.

#### Entregáveis esperados

- Aplicar tokens da Fase 4A.0 e placeholders/manifesto da Fase 4A.1 no shell visual.
- Preservar mobile-first, safe area, scroll vertical e ausência de autoridade client-side para economia.

## Fase 4B — Home RPG Premium

- Evoluir Home UI de mock/shell para experiência RPG premium conectada ao estado disponível.
- Preservar honestidade sobre sistemas ainda preparados ou futuros.

#### Fase 4C — Summon Premium UI

- Evoluir interface de summon para consumir a foundation server-side sem mover sorteio para o cliente.
- Frontend continua sem autoridade sobre rates, pity, duplicatas ou entrega de recursos.

#### Fase 4D — Heroes Collection UI

- Evoluir coleção e detalhe de heróis com base na foundation existente.
- Execução real de upgrades permanece fase preparada/futura até validação server-side específica.

#### Fase 4E — Campaign + Battle Shell

- Evoluir shell de Campaign/Battle para visual e fluxo premium.
- Resultado persistente real de battle/campaign/dungeon permanece PREPARED até fase server-side específica.

### Pré-requisitos

- Fase 3 concluída e testada.
- Game-state, starter pack e summon server-side disponíveis.
- Status mock/shell de telas visuais reconhecido nos documentos oficiais.

### Sistemas proibidos nesta fase

- Implementar pagamentos reais, TON/Gram real ou Stars reais.
- Implementar Aether Fragments, saques, marketplace, NFT ou staking.
- Fazer o frontend sortear gacha ou entregar resources.
- Transformar battle/dungeon/campaign result em persistência real sem fase server-side aprovada.

## Fase 5 | Heroes progression

**Status:** planejada.

### Pré-requisitos

- Vertical slice jogável.
- Recursos persistidos.

### Entregáveis

- Level up.
- XP books.
- Skills.
- Ascension.
- Awaken.
- Shards.
- Gear.
- Power score.
- Recursos faltantes.

### Definição de pronto

- Upgrades validados server-side.
- Custos consumidos de forma atômica.
- Power score consistente entre cliente e servidor.

### Dependências

- Inventory persistido.
- Owned heroes persistidos.

### Riscos

- Duplicação de consumo.
- Cálculo divergente de power.
- Exploração de recursos faltantes.

### Sistemas proibidos nesta fase

- Vender upgrades por TON/Stars sem Fase 11.
- Converter recursos internos em valor financeiro.

## Fase 6 | Battle completo

**Status:** planejada.

### Pré-requisitos

- Vertical slice jogável.
- Progressão básica persistida.

### Entregáveis

- 5v5.
- Action bar.
- Basic.
- Skill.
- Ultimate.
- Buffs.
- Debuffs.
- Elementos.
- Break.
- Waves.
- Autoplay.
- Velocidades.
- Rewards server-side.

### Definição de pronto

- Resultado de batalha validado pelo servidor.
- Recompensas idempotentes.
- Logs suficientes para auditoria de abuso.

### Dependências

- Stamina.
- Campaign progress.
- Inventory.

### Riscos

- Simulação pesada em Android fraco.
- Trapaça por resultado fabricado no cliente.
- Balanceamento complexo.

### Sistemas proibidos nesta fase

- Rewards financeiros.
- Saques.
- Marketplace.

## Fase 7 | Campaign e Dungeons

**Status:** planejada.

### Pré-requisitos

- Battle completo ou contrato server-side suficiente.
- Progressão persistida.

### Entregáveis

- Capítulos.
- First clear.
- Repeat rewards.
- Tentativas.
- Gold Dungeon.
- XP Dungeon.
- Skill Dungeon.
- Elemental Dungeon.
- Gear Dungeon.
- Ascension Dungeon.

### Definição de pronto

- Tentativas e rewards persistidos.
- First clear idempotente.
- Custos e limites aplicados no servidor.

### Dependências

- Battle.
- Inventory.
- Stamina.

### Riscos

- Farming abusivo.
- Reset diário inconsistente.
- Exploração por repetição de requests.

### Sistemas proibidos nesta fase

- Anúncios recompensados reais sem Fase 10.
- Saques.

## Fase 8 | Summon e gacha

**Status:** planejada.

### Pré-requisitos

- Persistência e inventário seguros.
- Economia inicial revisada.

### Entregáveis

- Banners.
- Rates.
- Summon 1x.
- Summon 10x.
- Pity.
- Duplicatas.
- Hero shards.
- Histórico.
- Reveal.
- Idempotência.
- Auditoria server-side.

### Definição de pronto

- Rolls gerados e gravados server-side.
- Rates auditáveis.
- Pity e duplicatas transacionais.
- Histórico visível ao jogador.

### Dependências

- Inventory.
- Owned heroes.
- Shards.

### Riscos

- Falhas regulatórias/compliance.
- Disputa de probabilidades.
- Exploração de idempotência.

### Sistemas proibidos nesta fase

- Venda real sem Fase 11.
- Promessas financeiras.

## Fase 9 | Assets e identidade visual

**Status:** planejada.

### Pré-requisitos

- Fluxos principais estabilizados.
- Direção visual aprovada.

### Entregáveis

- UI fantasy.
- Ícones coloridos.
- Hero portraits.
- Backgrounds.
- Cards.
- Raridade.
- FX.
- Animações leves.
- Otimização.

### Definição de pronto

- Assets otimizados para mobile.
- Performance aceitável em Android intermediário/fraco.
- Reduced motion respeitado.

### Dependências

- Feature surfaces estabilizadas.

### Riscos

- Peso excessivo de assets.
- Performance ruim no Telegram WebView.

### Sistemas proibidos nesta fase

- Engine pesada sem aprovação.
- Redesign que quebre fluxos validados.

## Fase 10 | Monetag

**Status:** planejada.

### Pré-requisitos

- Backend seguro.
- Rewards server-side.
- Contrato de anúncios revisado.

### Entregáveis

- Anúncios recompensados.
- Limites.
- Idempotência.
- Validação.
- Double reward comum.
- Stamina.
- Bonus chest.
- Dungeon entry.

### Definição de pronto

- Claim validada no servidor.
- Limites antiabuso aplicados.
- Falhas não creditam reward indevido.

### Dependências

- Inventory.
- Stamina.
- Dungeons.

### Riscos

- Fraude de anúncios.
- Replays.
- Créditos duplicados.

### Sistemas proibidos nesta fase

- Tratar ad como pagamento.
- Converter reward de ad em saque.

## Fase 11 | Telegram Stars e TON

**Status:** planejada.

### Pré-requisitos

- Backend seguro.
- Catálogo de bens internos definido.
- Revisão de pagamentos.

### Entregáveis

- Stars para bens digitais internos.
- TON Connect.
- Confirmação de pagamentos.
- Idempotência.
- Auditoria server-side.

### Definição de pronto

- Nenhuma compra é validada no cliente.
- Entrega de item depende de confirmação server-side.
- Falhas e duplicidades são tratadas.

### Dependências

- Inventory.
- Purchase ledger.
- Webhooks ou verificação server-side.

### Riscos

- Fraude de pagamento.
- Disputas de entrega.
- Confusão entre moeda interna e cripto.

### Sistemas proibidos nesta fase

- Converter Gold, Gems, Shards, Stamina ou Materials em TON.
- Saque automático.

## Fase 12 | Aether Fragments

**Status:** planejada e bloqueada até revisão econômica e jurídica específica.

### Pré-requisitos

- Revisão econômica.
- Revisão jurídica.
- Antifraude.
- Ledger server-side.
- Processo operacional aprovado.

### Entregáveis

- Ledger.
- Pool semanal.
- Elegibilidade.
- Antifraude.
- Withdrawal manual.
- Comunicação sem promessa de renda.

### Definição de pronto

- Nenhuma promessa de renda.
- Nenhuma taxa fixa.
- Revisão manual de saques.
- Auditoria e limites documentados.

### Dependências

- Backend maduro.
- Logs.
- Políticas de risco.

### Riscos

- Risco jurídico/regulatório.
- Fraude.
- Interpretação como promessa financeira.

### Sistemas proibidos nesta fase

- Saque automático no MVP.
- Promessa de retorno fixo.
- Conversão garantida de recursos comuns em TON/fiat.

## Fase 13 | Beta e produção

**Status:** planejada.

### Pré-requisitos

- Fluxos críticos seguros.
- Logs e rollback definidos.
- Testes em dispositivos reais.

### Entregáveis

- Testes Telegram.
- Dispositivos reais.
- Logs.
- Analytics.
- Performance.
- Balanceamento.
- Segurança.
- Rollback.
- Beta fechado.

### Definição de pronto

- Checklist de segurança aprovado.
- Performance aceitável em mobile real.
- Monitoramento disponível.
- Plano de rollback testado.

### Dependências

- Fases críticas concluídas.
- Infra de produção validada.

### Riscos

- Regressões mobile.
- Falhas de economia.
- Abuso em escala.
- Falta de observabilidade.

### Sistemas proibidos nesta fase

- Lançar sistemas financeiros sem revisão específica.
- Ativar saques sem operação manual e antifraude aprovados.


### Fase 2E/2F | Player core profile e fechamento

**Status:** concluída e validada.

#### Entregáveis 2E/2F

- Core profile mínimo em `public.veyra_players`.
- `player-bootstrap` retorna read model seguro com progresso básico do jogador.
- UI mostra `Player synced`, nível e stage sem expor identificadores sensíveis.
- Relatório de fechamento da Fase 2 criado.

#### Próxima fase

- **Fase 4A — Visual System + Game Shell Base.**
