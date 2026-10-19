# Registo de decisões técnicas

## D-001 | React + TypeScript e site estático
Decisão: preservar a tecnologia existente, com interface no browser e sem backend. Motivo: rapidez, menor superfície de risco e compatibilidade com o repositório. Limite: sem consulta de tickets ou dados das marcas.

## D-002 | Não replicar badges «Validado» do protótipo
Decisão: manter etiquetas «Exemplo» ou «Por confirmar». Motivo: a imagem ilustrativa não comprova aprovação interna nem fontes de procedimento. A validação exige origem institucional, data e âmbito documentados.

## D-003 | Web Speech API para escutar os guiões
Decisão: utilizar `speechSynthesis` e `SpeechSynthesisUtterance` do browser, ativados por clique. Motivo: não exige serviços externos nem credenciais; leitura ajustável em português se houver voz compatível. Limites: resultado e voz variam com o browser/dispositivo; não é reconhecimento de fala. Fonte: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis

## D-004 | MediaRecorder somente para simulações
Decisão: permitir gravar apenas a própria voz num ecrã de treino fictício, após permissão do microfone. Não guardar ficheiros, não enviar para terceiros, não gravar chamadas. Motivo: prática de memorização sem recolha de dados de clientes. Fontes: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia e https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

## D-005 | Identidade visual inspirada, não cópia de marcas
Decisão: usar cartões coloridos e abreviaturas CC/BK em vez de logos oficiais sem autorização. Motivo: o repositório e o site são públicos; a captura contém imagens de marcas de terceiros.

## D-006 | Conservar o atual mecanismo de publicação
Decisão: manter a compilação Vite e o workflow existente enquanto se valida a v1.6. Motivo: já existe uma publicação funcional e migrar a configuração de Pages simultaneamente aumentaria o risco. Revisitar após teste funcional.

## D-007 | Alterações em PR antes de integrar
Decisão: usar branch de desenvolvimento, CI e revisão; integrar em `main` só após verificações. Motivo: preservar a versão pública anterior durante o trabalho.

## D-008 | Dois manuais, uma base de guiões
Decisão: criar áreas independentes «Manual Coca-Cola» e «Manual Burger King», mantendo as frases de cada procedimento em `src/data/knowledge.ts`, sem duplicar blocos operacionais. O novo conteúdo de `src/data/manuals.ts` contextualiza os guiões mas é identificado como editorial/treino, não como política oficial. Motivo: reduzir divergências e ajudar a acompanhar uma chamada sem perder o contexto.

## D-009 | Índice e progresso só em memória
Decisão: não guardar no dispositivo o progresso da leitura, nomes de clientes ou notas de atendimento. Motivo: facilitar o uso pontual e minimizar exposição de dados num repositório público.


## D-010 | Interface iluminada e contida
Criar um dashboard de estilo cristal, com gradientes discretos e cartões claros, preservando contraste e compreensão. As ilustrações são SVG originais e não cópias de fotografias e logótipos.

## D-011 | Métricas reais, não inventadas
Exibir apenas quantidade de guiões, favoritos locais e validações efetivas provenientes da base existente. Não inventar chamadas, percentagens de satisfação nem duração média.

## D-012 | Voz selecionável do browser
Permitir escolher voz portuguesa disponível, ritmo, pausa, repetição e paragem. Não alegar naturalidade humana garantida: a Web Speech API depende do sistema/browser. Não há API key, serviço externo de síntese contratado ou recolha de chamadas.

## D-013 | Não mascarar erro de responsive com zoom forçado
Optou-se por corrigir a causa CSS, com media queries móveis após os estilos de v1.8. Não adicionar `user-scalable=no`, `maximum-scale=1` ou `overflow-x:hidden` global para esconder componentes fora do ecrã. Motivo: manter zoom de acessibilidade e evitar que botões desapareçam lateralmente.

## D-014 | Compactar sem reduzir alvos de toque
Optou-se por botões de cabeçalho com cerca de 39–41px (a barra de navegação inferior mantém área maior), cartões de serviço menos altos mas integralmente acionáveis, e títulos responsivos. Medir em 320–768px e repetir nos principais fluxos em browser real.

## D-015 | Veracidade por afirmação, não pelo logótipo da fonte
Separar factos públicos confirmados de orientações de treino e regras internas pendentes. Registar URL, data e limitação. O portal oficial de uma marca não aprova os scripts da campanha.

## D-016 | Acesso operacional não presumido
Retirar formulações categóricas sem documentação sobre a impossibilidade de a linha consultar pedidos online Burger King. A frase passa a instruir consulta ao procedimento vigente antes de encaminhar.

## D-017 | Supply chain reprodutível
Gerar `package-lock.json` real no runner npm, usar `npm ci`, auditar vulnerabilidades com limiares e pinar ações a SHAs verificados em 19/10/2026. Dependabot atualiza através de PRs. Não forjar versões nem afirmar ausência total de vulnerabilidades.

## D-018 | Publicação incremental sem quebrar caches imediatas
Preservar o workflow branch/Pages existente nesta revisão e apenas limpar assets antigos, mantendo a geração anterior e a atual. A publicação de emergência por artefacto deve criar `dist/index.html`. Rever migração Pages num trabalho próprio com verificação de Settings.

## D-019 | Viewport real e áreas de segurança iOS
Decisão: manter `width=device-width, initial-scale=1.0` e acrescentar `viewport-fit=cover` com tratamento explícito das quatro safe areas via CSS. Não impor maximum-scale nem user-scalable=no. Motivo: utilizar a largura real do iPhone e respeitar a câmara/barra do sistema sem reduzir acessibilidade.

## D-020 | Unificar breakpoint a 980px
Decisão: colocar a navegação móvel e a leitura dos manuais até 980px, abrangendo iPhones de maiores dimensões na horizontal; preservar sidebar em desktop de 1024px ou mais. Motivo: o limite anterior de 820px podia apresentar uma navegação desktop em smartphones horizontais.

## D-021 | Evitar zoom involuntário do Safari nos formulários
Decisão: definir tamanho mínimo de 16px para inputs e selects no modo móvel, mantendo zoom voluntário do utilizador. Testar com Chromium e WebKit emulado, requerendo ainda Safari real para validação completa.
