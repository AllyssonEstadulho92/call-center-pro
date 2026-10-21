# Arquitectura | Call Center Pro

## Tecnologias
- React + TypeScript + Vite, interface web estática.
- CSS responsivo, ícones lucide-react e testes Vitest.
- GitHub Actions para typecheck, testes, compilação e publicação.
- Sem servidor de aplicação, base de dados, autenticação ou acesso aos sistemas oficiais.

## Entrada, navegação e ecrãs
`app.html` → `src/main.tsx` → `src/App.tsx`.
A navegação atual usa estado local tipado `Page`, sem router externo.
Ecrãs: Início; Coca-Cola; Burger King; Manual Coca-Cola; Manual Burger King; Triagem; Respostas rápidas; Perguntas frequentes; Pesquisa; Favoritos; Estudo; Simulações; Versões; Segurança e fontes.

## Componentes
- `src/components/ManualHub.tsx`: dois manuais de consulta com índice, pesquisa, categoria, etapas, modo de leitura integral e síntese de voz; reutiliza os procedimentos sem os duplicar.
- `src/data/manuals.ts`: conteúdos editoriais separados por serviço (roteiro, princípios e FAQ), sem classificação indevida como validado; testes em `manuals.test.ts`.
- `src/components/LiveCallPanel.tsx`: guião de exemplo na página principal.
- `src/components/SpeechPlayer.tsx`: Web Speech API para leitura de frases; preferir pt-PT, senão voz portuguesa disponível, senão voz predefinida.
- `src/components/Simulations.tsx`: treino com cenários fictícios e respostas de referência da base.
- `src/components/PracticeRecorder.tsx`: captação áudio somente após permissão; MediaRecorder, Blob URL local e limpeza no fim.
- `src/components/QuickAnswers.tsx`: respostas derivadas da base única de guiões.
- `src/components/RoutingGuide.tsx`: triagem genérica com fontes públicas.
- `src/components/Training.tsx`: exercícios por escolha múltipla e correção.
- `src/components/FrequentlyAsked.tsx`: FAQs de comunicação e limites.
- `src/components/AppErrorBoundary.tsx`: fallback em erro de rendering.

## Dados e validação
`src/data/knowledge.ts` contém guiões e perguntas, tipados em `src/types.ts`.
`src/data/publicSources.ts` contém URL, âmbito, limitações e data de consulta.
`src/lib/search.ts`, `quickAnswers.ts`, `routing.ts` e `greeting.ts` contêm operações de domínio testáveis.
Estatuto dos guiões: «Exemplo», «Por confirmar» ou «Validado»; neste momento nenhum guião está validado institucionalmente.

## Estado e armazenamento
Fluxo e passos da chamada: memória React (sem persistência).
Favoritos: localStorage apenas com IDs de guiões.
Tema: localStorage apenas `dark`/`light`.
Treino e respostas: estado efémero no browser.
Áudio: MediaRecorder → Blob e URL temporário → elemento HTML audio; nenhuma API de envio; URL revogado e microfone desligado na desmontagem.
Síntese de voz: fala o texto selecionado via mecanismo do browser; não recolhe áudio.

## Segurança e publicação
GitHub Pages serve conteúdo estático público; não usar para scripts internos confidenciais, nomes reais, NIF, moradas, tokens, gravações de clientes, ou logos sem licença/autorização.
A página inicial pública é o `index.html` compilado; o `app.html` é a entrada de desenvolvimento. O workflow `build-static-site.yml` gera os `assets` e publica-os na branch. Este mecanismo preserva o historial, mas merece migrar para deploy Pages via artefacto num projeto posterior.

## Acessibilidade
Foco visível, contraste, navegação por teclado, controlos com nomes acessíveis, e estilos responsivos; a validação manual WCAG 2.2 e VoiceOver continua pendente.

## Manuais por serviço
Não persistem progresso, texto de pesquisa nem dados de clientes. As etapas são derivadas de `knowledge.ts`. As referências `publicSources.ts` documentam apenas factos públicos e respetivos limites. Não adicionar documentos internos de uma operação à versão pública sem autorização expressa.


## Dashboard Cristal v1.8
- `src/crystal.css`: camada visual posterior ao CSS existente; tokens e estilos responsivos para desktop e smartphone, com modo escuro.
- `src/components/ServiceArtwork.tsx`: ilustrações SVG originais não licenciadas por marcas.
- `src/components/DashboardResources.tsx`: manuais, simulações, frequentes, fontes públicas e métricas reais da biblioteca.
- `src/components/LiveCallPanel.tsx`: seleção de serviço, guião e etapa, verificação e cópia; estado apenas em memória.
- `src/components/SpeechPlayer.tsx`: seleção de voz portuguesa disponibilizada pelo browser, velocidade, pausa e repetição; persiste apenas a preferência da voz e velocidade no armazenamento local.
- `e2e/dashboard.spec.ts`: testes de navegação em desktop e móvel.
**Segurança:** não existe endpoint de chamadas, gravações ou análise de satisfação. Não carregar documentação interna nem recursos protegidos num alojamento público.

## Layout mobile v1.8.1
A camada `src/crystal.css` contém o último conjunto de media queries e deve prevalecer sobre o CSS geral para `.quick-search`. O cabeçalho passa a ter ações de largura limitada (39px), título `flex:1` com `min-width:0` e elipse se for comprido, mantendo botões acessíveis. Os cartões de serviço são compactos até 480px; as secções da biblioteca continuam de largura fluida. O conteúdo não deve gerar scroll horizontal nas larguras 320–768px. O atributo `meta viewport` preserva o zoom do utilizador.
Testes: `e2e/mobile-layout.spec.ts`. Validação física do Safari, orientação e opções de acessibilidade pendentes.

## Revisão v1.9.0: fontes e supply chain
- `src/data/evidence.ts`: factos públicos com fonte, data e limitação, mais lista explícita dos assuntos operacionais sem aprovação.
- `src/components/EvidenceAuditPanel.tsx`: vista de rastreabilidade em Segurança e fontes.
- `src/data/publicSources.ts`: contactos e portais oficiais, nunca apresentados como prova de SLAs ou competências da linha.
- `src/data/knowledge.ts` e `src/lib/routing.ts`: comunicação digital BK deixa de afirmar impossibilidade de acesso não documentada.
- `package-lock.json`: versões e integridade geradas pelo npm no GitHub Actions.
- Workflows: `npm ci`, `npm audit`, GitHub Actions pinned com SHAs dos projetos oficiais e atualização Dependabot.
- `app.html`: redireciona visitantes de GitHub Pages para a entrada pública compilada, preservando Vite em desenvolvimento.
- Publicação automática continua pela branch, mas mantém apenas assets atuais e da geração anterior. A alternativa de deploy apenas por artefactos requer alteração controlada das configurações Pages.

## Viewport iPhone e navegação móvel 1.9.1
- Fonte do HTML: `app.html` com `width=device-width, initial-scale=1.0, viewport-fit=cover`. `index.html` é gerado pela compilação; não alterar manualmente o ficheiro gerado.
- `src/styles.css` e `src/crystal.css`: regras móveis até 980px; cabeçalho compacto, sidebar recolhida, navegação inferior e grelhas fluidas.
- `src/crystal.css`: `--viewport-safe-*` baseadas em `env(safe-area-inset-*)`, alturas `100dvh`, padding das zonas seguras e inputs >=16px para evitar zoom de foco no iPhone.
- `src/components/ManualHub.tsx`: o scroll para o capítulo usa o mesmo breakpoint de 980px que a navegação.
- `playwright.config.ts`: projetos desktop Chromium, mobile Chromium e emulação mobile WebKit (apenas testes específicos de viewport); `e2e/viewport-ios.spec.ts` cobre retrato, horizontal, escala e ecrã grande.
- `.github/workflows/browser-smoke.yml`: prepara Chromium e WebKit para verificar a navegação.

**Limites:** WebKit do Playwright não equivale a Safari num iPhone físico. Não bloquear pinch-to-zoom, não usar overflow-x:hidden global para mascarar problemas e não alterar os guiões durante alterações de layout.

## Gestão de foco em ecrãs tácteis (v1.9.2)
- `src/App.tsx`: função `shouldAutoFocusTextInput()` distingue computador com `(hover: hover) and (pointer: fine)` de interações tácteis.
- Ao entrar em Pesquisa, o campo só ganha foco automaticamente no computador. No modal, o foco táctil inicial passa para o botão Fechar, preservando o ciclo de tabulação e o restauro do foco.
- O atalho Ctrl/Cmd+K continua a focar a pesquisa de forma explícita.
- `src/crystal.css`: campos editáveis e seletores com tamanho mínimo 16px em ecrãs móveis e em `(pointer: coarse)`, mesmo acima de 980px.
- `e2e/viewport-ios.spec.ts`: testes de foco, introdução de texto e reflow em Chromium e WebKit emulado; validação Safari físico ainda pendente.
- Sem alteração de APIs, armazenamento, regras de negócio ou dados operacionais.

## Revisão de segurança de comunicação e qualidade (v1.9.3)
- Mantém-se o mesmo catálogo de 17 procedimentos em `src/data/knowledge.ts`. Três guiões técnicos Coca-Cola acrescentam etapas de identificação do equipamento/referência e contacto/horário condicionados às necessidades do sistema oficial.
- A etapa comum de fecho Coca-Cola separa texto neutro, confirmação do registo e encaminhamento pendente, sem prometer assistência ou prazo. A informação condicional surge na nota da etapa, não representa uma integração SAP.
- `src/data/manuals.ts`: descrição dos passos distingue perguntas de treino e obrigatoriedade operacional por validar. Os procedimentos Burger King deixam de pressupor incapacidade da linha ou conclusão de encomenda sem confirmação.
- `src/App.tsx`: etapas percorridas são «consultadas», não «verificadas» operacionalmente; percentagem apenas de leitura.
- Testes de conteúdo e Playwright para percursos revistos. A aplicação pública não guarda dados de clientes nem grava chamadas reais.
- QA e verificação de dependências não certificam a aplicação para a operação: continua pendente autorização institucional, documentação e testes Safari/VoiceOver físicos.

## Fecho selecionável no guião (v1.9.4)
- `src/lib/callOutcomes.ts`: texto de fecho neutro por defeito, alternativas «confirmado» e «pendente» apenas para os três guiões CC principais e `bk-telefone`.
- `src/components/ClosingStatusPicker.tsx`: componente de seleção e aviso de confirmação externa, sem persistência.
- Reutilização em `src/App.tsx`, `LiveCallPanel.tsx` e `ManualHub.tsx`, incluindo cópia e leitura por voz da frase selecionada.
- Estados React locais, limpos em recomeço/troca de procedimento. Sem recolha, consulta ou validação automática de dados de clientes.
- CSS responsivo com campo de seleção de 16px e teste de regressão E2E e unitário. Confirmação institucional e Safari físico pendentes.

Validação da v1.9.4: testes automáticos Playwright em Chromium e WebKit emulado, 81 aprovados e 3 ignorados, CI TypeScript/Vitest/npm audit/Vite aprovada, PR #22 integrada e GitHub Pages publicada. Compatibilidade no Safari físico e autorização de utilização não verificadas.

## v1.9.5 | Respostas de contingência e encerramentos adequados
- `src/data/callSafetyPhrases.ts`: catálogo estático com quatro exemplos de resposta para perguntas frequentes em cada serviço. Separação entre `say` (fala ao cliente) e `verify` (instruções ao operador), sem decisões operacionais presumidas.
- `src/components/CallSafetyReplies.tsx`: painel de consulta expansível, reutilizado no teleponto em `src/App.tsx`, em `LiveCallPanel.tsx`, `ManualHub.tsx` e `QuickAnswers.tsx`. Não recolhe NIF, moradas, nomes nem informação de chamadas. Apenas seleção em memória e cópia opcional de frases genéricas.
- `src/data/knowledge.ts`: `ccEndGeneral` usado em cinco situações Coca-Cola sem registo técnico garantido, substituindo o fecho de ocorrência `ccEnd` que permanece nos três guiões técnicos principais.
- Testes em `src/data/knowledge.test.ts`, `src/data/callSafetyPhrases.test.ts` e E2E: sem promoção de conteúdos a validados, sem pressuposição de registos e alternância entre serviços.
- Segurança: nem sistemas SAP nem Burger King são consultados; a ferramenta permanece pública e exclusivamente orientada a estudo. Fontes e autorização operacional pendentes.

**Resultado de publicação v1.9.5:** PR #24 integrada, TypeScript/Vitest/build e auditoria npm aprovados; Playwright 87 aprovados, 3 ignorados. GitHub Pages compilado e publicado com novos assets. Safari/VoiceOver físicos continuam por verificar.

## v1.9.6 | Menu de cinco acessos e manuais PDF sincronizados
- `src/App.tsx`: menu lateral e navegação inferior com cinco acessos escolhidos; restantes nove destinos `Page` preservados e recuperáveis em `details` na página inicial, além da pesquisa permanente no cabeçalho. A navegação não remove páginas, estado nem rotas.
- `src/components/ManualHub.tsx`: ligação de transferência por serviço, construída com `import.meta.env.BASE_URL`, compatível com a subpasta GitHub Pages.
- `scripts/export-manual-data.mjs`: utiliza `esbuild` (dependência transitiva atual) para construir um módulo temporário e extrair diretamente os 17 guiões, guias editoriais, respostas, fechos condicionais e fontes. Falha em caso de catálogo incompleto. Não existe fetch de cliente nem integração externa.
- `scripts/generate_manual_pdfs.py`: produz duas edições A4 via ReportLab a partir do JSON, com tipografia Unicode, capa, índice paginado, capítulos, frases, verificações e limites. Os PDFs não devem incluir dados confidenciais.
- `.github/workflows/quality.yml`: além de TypeScript/testes/npm audit/build, prepara ambiente Python isolado e executa o gerador; verifica ambos os artefactos.
- `.github/workflows/build-static-site.yml`: gera e publica `manuais/*.pdf` juntamente com assets/index.html; o conteúdo dos PDFs só muda quando o código fonte correspondente mudar ou o gerador mudar.
- Condição residual: PDFs gerados precisam de verificação de composição visual e teste real de utilização no Safari; publicação pública não equivale a permissão laboral.

**Validação publicada v1.9.6:** PR #26 integrada. TypeScript, Vitest, npm audit e build Vite aprovados. Gerador ReportLab produziu os dois PDFs assinados `%PDF-` e não vazios; GitHub Pages publicou os binários. Playwright 93 testes aprovados e 3 ignorados, incluindo navegabilidade do painel secundário e 320 px. A auditoria visual final dos PDFs e Safari físico continuam pendentes.
