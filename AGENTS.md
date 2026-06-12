# AGENTS.md | Veyra: Aetherfall

Este arquivo é a regra operacional principal para qualquer tarefa do Codex neste repositório. Use português nos relatórios e na documentação do projeto.

## 1. Leitura obrigatória antes de editar

Antes de alterar qualquer arquivo, todo agente deve ler:

1. `AGENTS.md`.
2. `docs/CURRENT_STATE.md`.
3. `docs/MASTER_ROADMAP.md`.
4. `docs/ARCHITECTURE_DECISIONS.md`.
5. `docs/FEATURE_STATUS.md`.
6. Documentos existentes diretamente relacionados à tarefa, como planos de segurança, arquitetura, Supabase, validação server-side, deploy ou auditorias.

Se o contexto encontrado no workspace não corresponder ao estado documentado, pare e informe a divergência.

## 2. Fonte oficial de base e Git

- Trate a `main` selecionada na interface do Codex como a base oficial da tarefa.
- Não dependa de um remote Git local chamado `origin`; ele pode não existir no workspace.
- Não tente configurar, corrigir ou adicionar remotes Git.
- Não reutilize branches antigas.
- Não altere diretamente a `main`.
- Trabalhe em uma branch exclusiva por tarefa, criada para o escopo atual.
- Não reabra Pull Requests antigos.
- Não faça merge automático.
- Não ative auto-merge.
- Não faça force push.

Comandos proibidos, salvo instrução humana explícita posterior e específica:

```bash
git fetch origin
git reset --hard origin/main
git checkout main
git clean -fd
git rebase
git merge
git cherry-pick
git push --force
```

## 3. Pré-validação obrigatória

Antes de qualquer alteração, execute e registre:

```bash
git rev-parse --is-inside-work-tree
git branch --show-current
git status --short
git rev-parse HEAD
git log -1 --oneline
git remote -v || true
BASE_SHA=$(git rev-parse HEAD)
echo "$BASE_SHA"
```

A ausência de remote local não é erro.

Pare antes de editar se:

- não for um repositório Git;
- o working tree inicial estiver sujo;
- não existir commit `HEAD` válido;
- arquivos essenciais da tarefa não existirem;
- o estado do workspace contradisser a documentação oficial.

## 4. Declaração de escopo antes da implementação

Antes de implementar, defina para si e respeite:

- objetivo da tarefa;
- arquivos autorizados;
- arquivos proibidos;
- sistemas fora do escopo;
- validações obrigatórias;
- tamanho esperado do diff;
- fase ou subfase do roadmap que está sendo executada.

Implemente apenas uma fase ou subfase por tarefa. Se surgir necessidade de implementar outra fase, documente no roadmap ou no relatório da tarefa, mas não implemente.

## 5. Condições obrigatórias de parada

Pare e não crie commit/PR quando:

- o contexto não corresponder ao estado documentado;
- o workspace estiver sujo no início;
- arquivos essenciais não existirem;
- o diff sair do escopo;
- forem necessários arquivos não autorizados;
- aparecerem dezenas de arquivos alterados sem justificativa do escopo;
- houver risco de segurança não previsto;
- a tarefa exigir funcionalidades fora da fase aprovada;
- qualquer código de app for alterado em uma tarefa exclusivamente documental.

Se precisar reverter, reverta somente alterações não autorizadas da tarefa atual.

## 6. Regras de segurança e economia

Nunca:

- exponha secrets, tokens, senhas, URLs privadas, connection strings ou chaves reais;
- coloque service role key no frontend;
- confie em valores enviados pelo cliente para moedas, rewards, inventário, stamina, gacha, pity, compras ou saques;
- crie autenticação falsa;
- use `initDataUnsafe` como autenticação ou autorização;
- transforme mocks em produção sem validação server-side;
- credite TON, Stars, moedas, itens ou rewards apenas pelo cliente;
- implemente NFT, marketplace, staking, Aether Fragments reais ou saques sem fase específica aprovada;
- prometa renda, retorno financeiro fixo ou conversão garantida de itens internos em cripto/fiat.

Sempre trate operações críticas como autoridade do servidor.

## 7. Validações obrigatórias

Após alterações, execute:

```bash
npm install
npm run lint
npm run build
npm run typecheck
git diff --check
test -f dist/index.html
```

Também verifique o diff contra o SHA inicial:

```bash
git diff --name-only "$BASE_SHA"
git diff --stat "$BASE_SHA"
git status --short
```

Para tarefas que possam tocar texto, configuração ou código, faça busca por padrões sensíveis compatível com o escopo:

```bash
rg -n "SUPABASE_SERVICE_ROLE_KEY|service[_-]?role|TELEGRAM_BOT_TOKEN|DATABASE_URL|postgres(ql)?://|password=|TON private key|admin secret|payment secret" . || true
```

## 8. Mobile-first obrigatório

O app deve permanecer mobile-first para:

- 360px;
- 390px;
- 430px;
- orientação portrait;
- Telegram Mini App;
- Android intermediário ou fraco.

Priorize:

- safe area;
- touch targets adequados;
- rolagem vertical preservada;
- bloqueio de overflow horizontal;
- animações leves;
- suporte a reduced motion.

## 9. Pull Requests

Cada PR deve ser pequeno e limitado ao escopo aprovado.

Antes do commit/PR, confirme:

- apenas arquivos autorizados foram alterados;
- nenhuma dependência foi adicionada sem autorização explícita;
- nenhuma configuração crítica foi alterada fora do escopo;
- nenhum secret foi adicionado;
- lint, build, typecheck e `git diff --check` passaram;
- `dist/index.html` existe após build;
- mocks restantes e riscos foram informados.

O merge é manual e nunca deve ser feito pelo agente, salvo instrução humana explícita futura.

## 10. Relatório final obrigatório

Ao final, informe em português:

- SHA inicial;
- branch da tarefa;
- arquivos alterados/criados;
- número total de arquivos;
- adições e remoções;
- testes executados;
- resultado de lint;
- resultado de build;
- resultado de typecheck;
- resultado de `git diff --check`;
- confirmação de `dist/index.html`;
- mocks restantes;
- riscos;
- confirmação de que nenhum secret foi adicionado;
- link do PR, quando a ferramenta retornar link;
- confirmação de que não fez merge.
