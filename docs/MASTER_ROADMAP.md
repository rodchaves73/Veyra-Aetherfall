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

**Status:** em execução nesta tarefa.

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

## Fase 2 | Autenticação Telegram segura

**Status:** dividida em 2A e 2B. A Fase 2 completa não está concluída.

### Sistemas proibidos em toda a Fase 2

- Persistir inventário real.
- Creditar moedas/rewards reais.
- Criar player profile persistido.
- Criar tabelas ou RLS fora da Fase 3.
- Gacha real.
- Pagamentos reais.
- Saques.

## Fase 2A | Contratos e Edge Functions

**Status:** preparada em código nesta tarefa.

### Pré-requisitos

- Governança concluída.
- Contratos de autenticação definidos.
- Supabase Edge Functions autorizadas como base server-side.

### Entregáveis

- Validador server-side de Telegram `initData`.
- Contrato de autenticação documentado.
- Sessão curta própria do Veyra assinada com HMAC-SHA-256.
- Verificador de sessão Veyra.
- Edge Function `telegram-auth`.
- Edge Function `telegram-session`.
- Testes unitários Deno para validação e sessão.

### Definição de pronto

- Nenhuma identidade real depende de `initDataUnsafe`.
- Código não contém secrets reais.
- Funções não acessam banco e não usam service role.
- Sessão Veyra está documentada como diferente de Supabase Auth JWT.
- Deploy e integração visual ficam pendentes para Fase 2B.

### Dependências

- Supabase Edge Functions.
- Secrets server-side futuros: `TELEGRAM_BOT_TOKEN` e `VEYRA_SESSION_SECRET`.

### Riscos

- Validação criptográfica incorreta.
- Confundir sessão Veyra com Supabase Auth.
- Achar que replay prevention está resolvido sem armazenamento server-side.

### Sistemas proibidos nesta subfase

- Deploy das funções.
- Configuração de secrets reais.
- Integração do frontend.
- Persistência de player.
- Supabase Auth.

## Fase 2B | Secrets, deploy, teste real e frontend

**Status:** planejada.

### Pré-requisitos

- Fase 2A revisada e mergeada.
- Secrets reais disponíveis fora do Git.
- Origem de produção e previews definidas.

### Entregáveis

- Configurar Supabase secrets.
- Deploy das Edge Functions.
- Teste real no Telegram Mini App.
- Integração client-side com armazenamento de sessão somente em memória.
- Tratamento de logout e expiração.
- Bootstrap autenticado mínimo sem persistir economia real.

### Definição de pronto

- `telegram-auth` valida `initData` real em ambiente server-side.
- `telegram-session` verifica Bearer token emitido.
- Frontend não usa `initDataUnsafe` como autenticação.
- Token não é persistido em localStorage/sessionStorage.
- Recursos reais ainda não são persistidos antes da Fase 3.

### Dependências

- TELEGRAM_BOT_TOKEN somente server-side.
- VEYRA_SESSION_SECRET somente server-side.
- Deploy Supabase Edge Functions.

### Riscos

- Vazamento de secrets.
- Armazenamento inseguro do token no cliente.
- Confundir usuário de UI com usuário autenticado.

### Sistemas proibidos nesta subfase

- Persistir inventário real.
- Creditar moedas/rewards reais.
- Gacha real.
- Pagamentos reais.
- Saques.

## Fase 3 | Supabase mínimo

**Status:** planejada.

### Pré-requisitos

- Fase 2 concluída.
- Sessão Telegram segura disponível.
- Modelo inicial revisado.

### Entregáveis

- Schema inicial.
- RLS.
- Player profile.
- Inventory.
- Owned heroes.
- Campaign progress.
- Stamina.
- Repositories/services.
- Bootstrap seguro.

### Definição de pronto

- Dados mínimos do jogador persistem com RLS.
- Cliente usa APIs/repositories seguros.
- Service role permanece fora do frontend.
- Migrations e políticas revisadas.

### Dependências

- Supabase Postgres.
- Autenticação Telegram segura.

### Riscos

- RLS incorreta.
- Escrita direta insegura pelo cliente.
- Migrações incompatíveis com produção.

### Sistemas proibidos nesta fase

- Battle finish com rewards reais.
- Gacha real.
- Pagamentos reais.
- Aether Fragments reais.

## Fase 4 | Vertical slice jogável

**Status:** planejada.

### Fluxo oficial

Entrar > receber equipe inicial > escolher fase > gastar stamina > lutar > validar resultado > receber rewards > melhorar herói > desbloquear próxima fase.

### Pré-requisitos

- Fase 3 concluída.
- Persistência mínima e RLS funcionando.

### Entregáveis

- Fluxo jogável ponta a ponta.
- Gastar stamina com autoridade server-side.
- Validar resultado.
- Receber rewards server-side.
- Upgrade simples de herói.
- Desbloqueio de próxima fase.

### Definição de pronto

- Fluxo completo testado com usuário autenticado.
- Operações críticas idempotentes.
- Cliente não decide rewards reais.

### Dependências

- Auth segura.
- Supabase mínimo.
- Battle MVP.

### Riscos

- Exploração por replay.
- Divergência client/server.
- Balanceamento inicial frágil.

### Sistemas proibidos nesta fase

- Gacha real completo.
- Pagamentos reais.
- Saques.
- Marketplace/NFT/staking.

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
