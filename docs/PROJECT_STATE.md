# Call Center Pro | Estado do projeto

Data da revisão: 19/10/2026
Versão publicada antes desta alteração: 1.9.0.
Branch de trabalho: `fix/viewport-safearea-ios-v1-9-1`
Entrega proposta: 1.9.1.

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
Implementação do viewport e testes na branch, aguardando os resultados do CI para integração.

## Próximo passo
Validar TypeScript, Vitest, compilação e Playwright Chromium/WebKit; corrigir regressões; integrar em main após sucesso, confirmar publicação Pages e solicitar teste real no Safari do iPhone.
