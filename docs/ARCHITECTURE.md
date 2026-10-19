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
