# Stage 9 | Sprite and Animation Rules

Documento oficial de regras para sprites e animações futuras de **Veyra: Aetherfall**. Define padrões de leitura, escala, paleta, motion e restrições mobile-first sem criar ou implementar assets.

## 1. Escopo

Este documento orienta:

- sprites futuros de heróis, inimigos e bosses;
- animações 2D leves;
- leitura em Telegram Mini App;
- consistência visual entre facções;
- limitações de performance para Android intermediário ou fraco.

Este documento não cria:

- arquivos PNG, WebP, spritesheets ou atlases;
- componentes React;
- lógica de battle;
- skills;
- pipeline novo;
- dependências;
- seed, migration ou banco.

## 2. Princípios mobile-first

Sprites e animações devem funcionar primeiro em:

- largura de 360px;
- largura de 390px;
- largura de 430px;
- orientação portrait;
- Telegram Mini App;
- Android intermediário ou fraco.

Prioridades:

1. leitura de silhueta;
2. contraste claro com fundo;
3. animações curtas;
4. poucos efeitos simultâneos;
5. respeito a reduced motion;
6. ausência de overflow horizontal.

## 3. Escalas recomendadas

As medidas abaixo são guias conceituais para assets futuros.

| Uso | Tamanho visual alvo | Observação |
|---|---:|---|
| Ícone de roster | 64px a 96px | rosto, arma ou símbolo legível |
| Card de herói | 128px a 192px | meia pose com silhueta clara |
| Sprite em batalha | 96px a 160px | corpo inteiro simplificado |
| Boss em batalha | 180px a 280px | deve caber com UI ativa |
| Retrato narrativo | 256px a 512px | permitido mais detalhe |

Nunca depender de detalhe que só aparece acima de 512px.

## 4. Regras de silhueta

- Cada personagem deve ser reconhecível em preto sólido.
- O elemento principal deve ocupar pelo menos 20% da silhueta: arma, escudo, cajado, capa, chifre, halo, livro ou familiar.
- Evitar simetria excessiva em todos os personagens; postura comunica função.
- Evitar múltiplos acessórios pequenos competindo pelo foco.
- Itens finos devem ser engrossados para leitura mobile.

## 5. Paleta e contraste

Cada sprite deve usar:

- 1 cor base dominante;
- 1 cor secundária de facção;
- 1 cor de material;
- 1 cor de Aether ou efeito;
- 1 cor de sombra.

Limites recomendados:

- 5 a 7 grupos de cor por sprite comum.
- 8 a 10 grupos de cor para epic/legendary.
- Efeitos brilhantes devem ser pontuais, não cobrir o corpo inteiro.
- A cor de raridade não deve substituir a identidade da facção.

## 6. Direção de facções para sprites

| Facção | Formas | Materiais | Efeito |
|---|---|---|---|
| Dawnward Covenant | verticais, escudos, halos | vitral, aço, tecido claro | luz azul/dourada quebrada |
| Umbral Court | diagonais, capas, máscaras | seda, prata, lâminas finas | sombra vinho/violeta |
| Emberforged Clans | blocos, ombros largos, ferramentas | ferro, bronze, couro | brasa laranja |
| Verdant Veil | curvas orgânicas, galhos, chifres | madeira, folhas, osso | bioluminescência verde/turquesa |
| Astral Collegium | círculos, órbitas, livros | vidro, prata, pergaminho | constelações índigo |
| Hollowbound Exiles | formas quebradas, correntes, velas | osso, tecido, ferro frio | azul espectral |

## 7. Estados mínimos de animação futura

Quando uma fase futura autorizar sprites animados, o conjunto mínimo recomendado por personagem é:

1. **Idle:** respiração ou flutuação leve.
2. **Ready:** preparação curta antes de agir.
3. **Attack:** ação principal simples.
4. **Hit:** reação rápida.
5. **Down:** queda, ajoelhado ou dissipação.
6. **Special:** animação curta para habilidade marcante, se a fase autorizar.

Para MVP visual, idle estático com efeito leve pode ser suficiente, desde que documentado como placeholder.

## 8. Duração de animações

| Estado | Duração alvo | Observação |
|---|---:|---|
| Idle loop | 1.2s a 2.4s | movimento mínimo |
| Ready | 0.2s a 0.5s | antecipação clara |
| Attack | 0.35s a 0.8s | impacto rápido |
| Hit | 0.15s a 0.35s | não bloquear leitura |
| Down | 0.5s a 1.0s | simples e não gráfico |
| Special | 0.8s a 1.5s | evitar excesso de partículas |

Animações mais longas devem ser raras e reservadas a bosses ou momentos narrativos.

## 9. Regras de efeitos visuais

- Usar partículas pequenas com moderação.
- Evitar flashes de tela inteira.
- Evitar shaking contínuo.
- Evitar blur pesado em dispositivos fracos.
- Usar easing simples.
- Manter efeitos atrás ou ao redor do sprite sem esconder a pose.
- Ataques inimigos devem ter telegráfico antes do impacto.

## 10. Reduced motion

Toda animação futura deve ter alternativa para usuários com reduced motion:

- reduzir deslocamento;
- remover loop de partículas;
- trocar shake por mudança de opacidade curta;
- reduzir rotação;
- manter informação funcional por cor, ícone ou pose.

Reduced motion não pode remover informação essencial de combate.

## 11. Spritesheets e performance futura

Quando assets forem autorizados, preferir:

- poucos frames bem desenhados em vez de muitos frames pesados;
- dimensões em potências práticas para atlas;
- compressão adequada;
- reuso de efeitos simples;
- lazy loading por tela quando aplicável;
- fallback estático para conexões lentas.

Evitar:

- spritesheets gigantes para todos os heróis carregados de uma vez;
- transparências enormes vazias;
- múltiplos efeitos sobrepostos em idle;
- animação que dependa de física pesada ou engine externa.

## 12. Regras para bosses

Bosses podem ter mais escala, mas devem respeitar UI mobile.

- O núcleo visual deve ficar dentro da área segura.
- Membros podem ultrapassar a moldura visual, mas não causar overflow horizontal de layout.
- Ataques devem ser telegráficos e lentos o bastante para leitura.
- Partes quebráveis futuras devem ter contraste claro.
- Boss não deve esconder botões, barras ou navegação.

## 13. Placeholders

Placeholders são permitidos somente quando claramente identificados como placeholder.

Regras:

- não apresentar placeholder como arte final;
- não misturar placeholder com promessa de disponibilidade;
- não usar assets sem licença documentada;
- não adicionar PNG/WebP nesta Stage 9;
- não atualizar manifesto de assets nesta tarefa documental.

## 14. Acessibilidade visual

- Não depender apenas de cor para estado crítico.
- Usar pose, ícone, borda ou efeito secundário.
- Evitar contraste baixo entre sprite e fundo.
- Garantir que personagens importantes tenham contorno ou rim light discreto.
- Evitar texto pequeno embutido em sprites.

## 15. Checklist de aprovação de sprite futuro

- [ ] Funciona em 360px portrait.
- [ ] Silhueta reconhecível em preto sólido.
- [ ] Paleta respeita facção.
- [ ] Detalhes principais legíveis em 96px a 160px.
- [ ] Animação é curta e leve.
- [ ] Existe alternativa para reduced motion.
- [ ] Não cria overflow horizontal.
- [ ] Não usa asset sem licença.
- [ ] Não adiciona lógica de gameplay.
- [ ] Não promete recompensa econômica.
