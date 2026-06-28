# Stage 9 | Enemy and Boss Design Rules

Documento oficial de regras para inimigos e bosses de **Veyra: Aetherfall**. O objetivo é orientar design visual e narrativo futuro sem implementar combate, banco, rewards, drops, sprites ou assets.

## 1. Escopo

Este documento define:

- categorias de inimigos;
- pilares visuais;
- regras de silhueta;
- leitura mobile;
- estrutura conceitual de bosses;
- limites narrativos e de segurança.

Este documento não define:

- HP, dano, defesa ou stats finais;
- tabela de drops;
- recompensas;
- economia;
- lógica de battle;
- migrations, seeds ou Edge Functions;
- assets PNG/WebP;
- animações implementadas.

## 2. Pilares de inimigos

Todo inimigo deve expressar ao menos um destes pilares:

1. **Corrupção de Aether:** cristais invasivos, brilho interno, deformação, ruído mágico.
2. **Ruína viva:** armaduras vazias, estátuas animadas, ossos com brasões, templos que respiram.
3. **Predação ambiental:** criaturas que parecem adaptadas a floresta, mina, cripta, céu partido ou cidade caída.
4. **Eco humano:** inimigos devem lembrar que o mundo já teve civilização, guildas, ordens e famílias.
5. **Custo visível:** poder inimigo deve parecer doloroso, instável ou parasitário.

## 3. Categorias de inimigos comuns

### 3.1 Aether-Touched

Seres vivos contaminados por energia de Aether.

- **Leitura visual:** cristais, olhos luminosos, membros assimétricos.
- **Uso narrativo:** ameaça inicial e intermediária.
- **Cuidado:** não exagerar detalhes finos que sumam em mobile.

### 3.2 Ruinbound

Construtos, armaduras, estátuas e máquinas antigas presas a juramentos quebrados.

- **Leitura visual:** pedra, metal, runas, peças faltando.
- **Uso narrativo:** dungeons, templos, muralhas e fortalezas.
- **Cuidado:** diferenciar por silhueta, não apenas por cor.

### 3.3 Hollowkin

Mortos incompletos, ecos e sombras de pessoas que não atravessaram o véu.

- **Leitura visual:** velas, correntes, tecido rasgado, azul espectral.
- **Uso narrativo:** criptas, vilas abandonadas e eventos de luto.
- **Cuidado:** evitar gore explícito; o tom deve ser sombrio, não gráfico.

### 3.4 Wild Aetherbeasts

Bestas ambientais alteradas por florestas, montanhas, pântanos ou fendas.

- **Leitura visual:** chifres, carapaças, raízes, venenos, flores brilhantes.
- **Uso narrativo:** exploração, caça e controle de território.
- **Cuidado:** manter comportamento legível no sprite.

### 3.5 Cult Remnants

Cultistas, fanáticos e pesquisadores quebrados que veneram o Aether ou bosses específicos.

- **Leitura visual:** máscaras, símbolos, lanternas, armas improvisadas.
- **Uso narrativo:** narrativa humana e preparação de bosses.
- **Cuidado:** não usar símbolos reais sensíveis ou iconografia religiosa direta.

## 4. Tiers conceituais

| Tier | Uso | Complexidade visual | Exemplo de escala |
|---|---|---|---|
| Minion | encontros básicos | 1 motivo visual | goblin corrompido, rato de Aether |
| Elite | ameaça de fase | 2 motivos visuais | cavaleiro em ruína, fera espinhosa |
| Champion | mini-boss | 3 motivos visuais | guardião de templo, bruxa da fenda |
| Boss | fim de capítulo ou dungeon | 4 motivos visuais | dragão menor, santo corrompido |
| World Boss | evento futuro | 5 motivos visuais | colosso, entidade astral |

## 5. Regras de silhueta para inimigos

- Minions devem ser reconhecíveis por uma forma dominante.
- Elites podem ter arma, carapaça ou aura adicional.
- Champions devem ter pose e objeto memoráveis.
- Bosses precisam de silhueta que funcione em tela vertical com UI ao redor.
- Evitar inimigos largos demais que causem overflow visual em 360px.
- O ponto fraco visual deve ser grande e claro: olho, núcleo, coração de cristal, máscara, lanterna ou runa.

## 6. Regras de boss design

Todo boss documentado futuramente deve ter:

1. nome;
2. título;
3. origem narrativa;
4. arena conceitual;
5. silhueta principal;
6. três motivos visuais;
7. uma ameaça emocional;
8. uma mecânica conceitual não implementada;
9. limite de leitura mobile;
10. nota de segurança econômica sem rewards reais.

## 7. Arquétipos de bosses

### 7.1 Guardian Boss

Protege local, relíquia ou juramento.

- **Exemplos visuais:** escudo gigante, porta viva, armadura colossal.
- **Ritmo conceitual:** resistência, fases defensivas, punição a ataques descuidados.

### 7.2 Predator Boss

Caça o jogador ou a região.

- **Exemplos visuais:** fera, ave, aranha, lobo cristalino, cervo corrompido.
- **Ritmo conceitual:** mobilidade, bleeds, perseguição e alvos marcados.

### 7.3 Sorcerer Boss

Manipula Aether, tempo, sombra, veneno ou espíritos.

- **Exemplos visuais:** cajados, círculos, livros, espelhos, orbes.
- **Ritmo conceitual:** invocações, zonas, maldições e telegráficos claros.

### 7.4 Tragic Boss

Figura com história humana reconhecível.

- **Exemplos visuais:** antigo paladino, rainha, professor, santo, capitão.
- **Ritmo conceitual:** fases que contam a queda do personagem.

### 7.5 Colossus Boss

Ameaça de escala superior.

- **Exemplos visuais:** membros ocupando bordas, núcleo central, fragmentos flutuantes.
- **Ritmo conceitual:** partes quebráveis futuras, telegráficos grandes e animação lenta.

## 8. Regras de telegráfico visual

Mesmo antes da implementação, todo ataque especial planejado deve poder ser comunicado com:

- antecipação clara;
- cor consistente;
- área legível;
- tempo suficiente para leitura em mobile;
- movimento simples;
- alternativa para reduced motion.

Cores sugeridas:

- vermelho: dano direto;
- roxo: maldição;
- verde ácido: veneno;
- azul espectral: frio, morte ou espírito;
- dourado quebrado: luz corrompida;
- laranja: fogo e forja.

## 9. Regras de arena

A arena de boss deve apoiar a leitura, não competir com o personagem.

- Fundo menos saturado que o boss.
- Contraste suficiente para silhueta.
- Elementos narrativos grandes, poucos e claros.
- Sem detalhes pequenos dependentes de zoom.
- Nenhum elemento de arena deve parecer botão interativo se não for.

## 10. Limites de conteúdo

- Evitar gore explícito, mutilação detalhada ou horror gráfico.
- Evitar símbolos reais de ódio, política, religião ou organizações existentes.
- Evitar sexualização de inimigos humanoides.
- Evitar representação de menores em combate.
- Evitar nomes ou visuais que copiem IPs existentes.

## 11. Segurança e economia

- Inimigos e bosses não devem prometer TON, Gram, Stars, dinheiro, saque ou retorno financeiro.
- Drops e rewards reais dependem de fase futura com validação server-side.
- Não definir probabilidades, valores monetários ou conversões.
- Não documentar loops exploráveis de farm econômico.

## 12. Checklist de aprovação

- [ ] Silhueta legível em mobile.
- [ ] Categoria definida.
- [ ] Motivo de Aether ou ruína claro.
- [ ] Sem gore explícito.
- [ ] Sem símbolos reais sensíveis.
- [ ] Sem promessa econômica.
- [ ] Sem implementação de stats, rewards ou battle.
- [ ] Compatível com reduced motion em animação futura.
