# Call Center Pro | Estado do projeto

## Revisão 20/10/2026 | Correção de foco e zoom 1.9.2
- Relato: ao abrir «Pesquisa», o ecrã volta a ampliar num iPhone.
- Confirmado no código: `autoFocus` na Pesquisa e `focus()` automático no input do modal «Iniciar atendimento». O Safari pode alterar a área visível quando o teclado é ativado, embora a versão 1.9.1 já tenha definido 16px nos inputs móveis.
- Correção proposta: não focar inputs automaticamente em dispositivos tácteis; no modal, focar o botão Fechar para preservar acessibilidade. Em desktop, manter foco e atalho Ctrl/Cmd+K.
- CSS: mínimo de 16px em inputs editáveis, selects e textarea também em dispositivos tácteis com largura superior a 980px.
- Testes: ausência de foco táctil, introdução de texto, overflow e navegação em iPhone, tablet e desktop.
- Conteúdos de atendimento, favoritos, rotas, persistência e zoom manual não foram alterados.
- Estado: em revisão na branch de correção. CI, integração e publicação ainda sujeitos a confirmação.
- Próximo passo: rever CI e integrar PR se aprovado; testar teclado, zoom, rotação e VoiceOver no Safari de um iPhone real.


Data da revisão: 19/10/2026
Versão publicada: **1.9.1**, branch `main`, PR #17 integrado.
Branch de origem: `fix/viewport-safearea-ios-v1-9-1` (PR #17 aprovado e integrado)
Entrega concluída: 1.9.1.

## Objetivo
Verificar dimensões e viewport dos ecrãs desktop, tablet e iPhone, preservando os guiões e os serviços existentes, e corrigir a escala sem exigir zoom manual no Safari.

## Factos confirmados
- `app.html` e o `index.html` público já usavam `width=device-width, initial-scale=1.0`, sem bloquear o zoom.
- A folha `src/styles.css` continha regras móveis até 820px e a camada `src/crystal.css` regras posteriores que controlavam o layout.
- Em ecrãs iPhone na horizontal, a largura CSS pode ultrapassar 820px e apresentar indevidamente o menu de computador.
- Os inputs da pesquisa, manuais, seleção de voz e diálogo de atendimento tinham alguns tamanhos de letra inferiores a 16px, o que pode desencadear zoom automático no Safari.
- A barra móvel já usava `env(safe-area-inset-bottom)`, mas o HTML ainda não declarava `viewport-fit=cover` e não existia tratamento coordenado dos quatro lados seguros.

## Implementação em revisão
- `viewport-fit=cover` em `app.html`; a página `index.html` compilada é produzida automaticamente pelo workflow.
- Breakpoint de menu móvel até 980px, incluindo smartphone na horizontal; manuais usam a mesma largura.
- Tokens CSS `env(safe-area-inset-*, 0px)` para barras, cabeçalho, menu, área principal e janela de atendimento.
- Altura dinâmica `100dvh` com fallback `100vh` para ecrãs e modais.
- Inputs de texto e selects com fonte mínima de 16px para reduzir o zoom involuntário no iOS.
- Botões de acesso rápido do cabeçalho com aproximadamente 44px.
- Testes de viewport em retrato (320, 360, 375, 390, 430), horizontal (844, 932, 980) e desktop (1024); CI com Chromium e emulação WebKit de iPhone.

## Riscos e validação
- A emulação WebKit em Linux não reproduz fielmente a barra inferior e a câmara de um iPhone físico.
- Visualização em Safari real, VoiceOver, teclado virtual e rotação continuam por confirmar no dispositivo.
- Nenhuma regra operacional dos dois projetos foi alterada.
- Publicação GitHub Pages continua aberta ao público; não colocar dados internos ou pessoais no repositório.

## Última alteração
Viewport publicado: `viewport-fit=cover`, safe areas iOS, inputs de 16px, menu móvel até 980px e alturas dinâmicas. TypeScript, Vitest, npm audit, build Vite e **68 testes de navegação Chromium/WebKit** concluídos com sucesso. GitHub Pages publicado com `index.html` compilado e meta viewport correta. A primeira execução dos testes falhou apenas por esperar a expressão `env(...)` em vez do valor computado `0px`; teste corrigido e reexecutado com sucesso.

## Próximo passo
Verificar no Safari do iPhone real os tamanhos em retrato/horizontal, teclado, focos, safe areas e VoiceOver. Se houver diferenças, documentar e corrigir sem alterar guiões. Continua pendente a validação operacional dos conteúdos.
