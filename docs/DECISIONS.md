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
