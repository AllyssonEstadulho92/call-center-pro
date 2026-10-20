# Tarefas | Call Center Pro

Data de referência: 18-10-2026 | Objetivo: piloto de treino para quarta-feira, 21-10-2026.

| Prioridade | Tarefa | Estado |
|---|---|---|
| P0 | Integrar painel ilustrativo com funcionalidades reais | Implementado, CI e publicação aprovados |
| P0 | Leitura da frase em voz alta durante guião | Publicado; teste Safari pendente |
| P0 | CI TypeScript, testes, compilação e regressão | Concluído na branch e em main |
| P0 | Confirmar publicação em GitHub Pages sem ecrã branco | Compilação e publicação confirmadas; teste visual real pendente |
| P0 | Rever mensagens para não inventar competências, prazos ou reembolsos | Regras de segurança aplicadas; revisão com supervisão pendente |
| P0 | Obter autorização para usar ferramenta no computador do trabalho | Depende do utilizador e da entidade empregadora |
| P1 | Testar iPhone Safari: voz, controlo de volume, foco e navegação | Pendente de dispositivo real |
| P1 | Testar microfone, permissão negada e apagar gravações | Pendente de dispositivo real |
| P1 | Testar navegação móvel e contraste com VoiceOver | Pendente |
| P1 | Rever guiões com manuais autorizados Coca-Cola e Burger King | Pendente de documentação aprovada |
| P1 | Melhorar hero visual com recursos de marca autorizados | Pendente de direitos |
| P2 | Testes E2E Chromium desktop e móvel, navegação e páginas | Concluído e aprovado; ampliar cobertura posteriormente |
| P2 | Rever pipeline de deploy para GitHub Pages via artefacto | Planeado |
| P2 | Modo offline com estratégia explícita de atualização | Por definir |

**Nunca sinalizar uma tarefa como concluída apenas pela aparência do protótipo ou pela compilação do código.**

## Melhorias v1.7.0

- [x] Criar dois manuais independentes com entrada no menu e atalhos; publicado no GitHub Pages.
- [x] Consultar guiões com índice, pesquisa, categorias e etapas; testado em Chromium desktop/móvel.
- [x] Mostrar fonte/estado e impedir selo «Validado» sem confirmação.
- [ ] Validar os guiões contra manuais internos autorizados; conteúdo original indisponível na sessão.
- [ ] Rever experiência e voz em iPhone Safari e computador real.
- [ ] Pedir autorização para uso da ferramenta no equipamento de trabalho.


## Revisão v1.8.0 (19-10-2026)
- [x] Inspecionar código, CSS, dependências, documentação e limites das fontes.
- [x] Criar layout limpo e responsivo próximo da referência, com SVG original.
- [x] Reorganizar manuais, fontes, guiões e estudo na visão geral.
- [x] Manter apenas contagens reais, sem indicadores fictícios.
- [x] Atualizar leitor de voz com seleção de idioma e controlos de reprodução.
- [x] Adicionar testes Playwright para o novo dashboard.
- [x] Confirmar TypeScript, Vitest, Vite e Playwright desktop/móvel do PR #4, corrigindo a ambiguidade de acessibilidade do seletor de voz.
- [x] Integrar PR #4 e publicar v1.8.0 no GitHub Pages.
- [ ] Validar contraste, VoiceOver, layout e vozes em Safari iPhone real.
- [ ] Confirmar se há autorização da operação para utilização no posto de trabalho e conteúdos internos.

## v1.8.1 | Reparação do tamanho no telemóvel
- [x] Rever viewport, cascata de CSS e larguras fixas.
- [x] Corrigir mínimo de 230px no botão de pesquisa do cabeçalho móvel.
- [x] Adaptar cabeçalho, cartões, painel e menus entre 320 e 820px.
- [x] Criar testes que medem scroll horizontal e abertura dos principais ecrãs.
- [x] TypeScript, Vitest, Vite e Playwright aprovados na PR #5; 34 testes completos.
- [x] PR #5 integrado e versão estática 1.8.1 publicada no GitHub Pages.
- [ ] Verificar presencialmente iPhone Safari (incluindo texto maior, zoom e orientação).

## v1.9.0 | Auditoria factual e robustez
- [x] Rever e corrigir guiões/triagem digitais com afirmações não comprovadas.
- [x] Separar factos públicos e procedimentos internos no conteúdo e interface.
- [x] Atualizar fontes oficiais, datas e limitações; acrescentar rastreabilidade.
- [x] Gerar package-lock.json via npm no runner GitHub e instalar com npm ci.
- [x] Adicionar auditoria npm, Dependabot e Actions fixadas por SHA.
- [x] Corrigir acesso a app.html publicado e saída do deploy manual; reduzir assets antigos com salvaguarda da versão anterior.
- [x] Criar testes unitários/E2E para origem e limites do conteúdo.
- [x] TypeScript, 34 testes unitários, compilação, auditoria npm e Playwright aprovados; PR #6 integrado em main e GitHub Pages publicado.
- [ ] Testar no Safari iPhone real e com VoiceOver.
- [ ] Obter manual interno autorizado e validação formal de cada procedimento sem publicar dados restritos.
- [ ] Rever proteção de branch/rulesets do GitHub e migrar Pages para deploy por artefacto numa fase dedicada.

## Viewport v1.9.1 (19/10/2026)
- [x] Confirmar as configurações de viewport e os componentes com dimensões fixas.
- [x] Acrescentar viewport-fit=cover e zonas seguras iOS, sem bloquear pinch-to-zoom.
- [x] Ajustar menu, cabeçalho, rodapé, modal e manuais para retrato e horizontal.
- [x] Aplicar fonte mínima de 16px aos campos móveis.
- [x] Criar testes de reflow/viewport incluindo emulação mobile WebKit.
- [x] TypeScript, Vitest, build e auditoria npm aprovados antes da integração.
- [x] PR #17 integrado e GitHub Pages publicado; 68 testes Chromium/WebKit aprovados.
- [ ] Validar num iPhone real Safari, VoiceOver, teclado e rotação.

## 20/10/2026 | 1.9.2, pesquisa sem zoom involuntário
- [x] Inspecionar `autoFocus` e foco programático da pesquisa e do modal.
- [x] Aplicar gestão de foco própria para rato/teclado e toque, preservando a acessibilidade.
- [x] Reforçar tipografia mínima de campos em dispositivos tácteis largos.
- [x] Acrescentar testes de foco, pesquisa e viewport para iPhone, tablet e desktop.
- [x] CI confirmado: TypeScript, Vitest, compilação e Playwright Chromium/WebKit aprovados na PR #18.
- [x] PR #18 integrada e GitHub Pages publicada com novo `index.html` e assets da versão 1.9.2.
- [ ] Testar em iPhone Safari real: abertura de Pesquisa, introdução de texto, fecho do teclado e rotação, sem zoom involuntário.

## 20/10/2026 | Auditoria de guiões e utilização responsável, v1.9.3
- [x] Rever os 17 guiões, os dois manuais, o painel de evidência, o teleponto e a arquitetura pública.
- [x] Completar a triagem dos três tipos de avaria principais com identificação do equipamento e contacto/horário condicionais.
- [x] Corrigir fecho Coca-Cola por estado confirmado/pendente e evitar afirmar incapacidade ou registo automático na Burger King.
- [x] Alterar «etapa verificada» para «etapa consultada», sem confundir progresso com validação operacional.
- [x] Adicionar testes de conteúdo e regressões de interface para os novos percursos.
- [ ] Validar TypeScript, Vitest, Playwright, compilação e auditoria npm em CI.
- [ ] Integrar PR e confirmar GitHub Pages apenas após testes aprovados.
- [ ] Confirmar autorização para usar a aplicação no posto de trabalho.
- [ ] Obter os critérios de auditoria de qualidade e procedimentos operacionais autorizados da supervisão.
- [ ] Testar no iPhone físico e avaliar WCAG/VoiceOver e acesso à gravação do microfone.
