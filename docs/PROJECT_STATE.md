# Call Center Pro | Estado do projeto

Atualizado em 19-10-2026.
Versão publicada antes desta correção: 1.8.0.
Branch de correção: `fix/mobile-responsive-viewport-v1-8-1`.

## Problema reportado
No browser do telemóvel a interface aparecia demasiado grande, obrigando a reduzir o zoom para visualizar menus e funcionalidades.

## Factos confirmados no código
- Ambas as páginas HTML têm `meta viewport width=device-width, initial-scale=1.0`, sem bloquear pinch-to-zoom.
- `src/styles.css` já contém media queries para smartphone e tablet.
- A camada `src/crystal.css`, carregada posteriormente, redefinia globalmente `.quick-search` com `min-width:230px`, anulando a regra móvel anterior `min-width:0`. Esta divergência pode expandir o cabeçalho e a largura horizontal do documento.
- Os cartões tinham dimensões elevadas para smartphones, e alguns elementos da barra superior não admitiam encolhimento.

## Implementação proposta
- Media queries finais em `src/crystal.css` para 820px, 480px e 360px e correção explícita da pesquisa na topbar.
- Cabeçalho com largura flexível, truncagem do nome da página, botões compactos e menu.
- Cartões de acesso dimensionados para smartphones; ajuste dos espaçamentos sem reduzir o texto abaixo do utilizável.
- Limites `min-width:0` e `max-width:100%` nos contentores efetivamente flexíveis, sem ocultar overflow horizontal no documento.
- `e2e/mobile-layout.spec.ts` verifica largura, menu, navegação, cartões e ausência de desativação do zoom.

## Estado de validação
Pendente da execução completa TypeScript, Vitest, Vite e Playwright no PR; Safari iOS real ainda não foi testado.

## Riscos
- Testes em Chromium não garantem equivalência absoluta com Safari e acessibilidade dinâmica do iPhone.
- O trabalho é exclusivamente de interface. Preservar os guiões, fontes, permissões e limitações existentes.
- O site GitHub Pages e o repositório são públicos; não carregar dados ou procedimentos internos restritos.

## Última alteração
Correção responsiva iniciada numa branch isolada para não afetar a versão 1.8.0 em produção.

## Próximo passo
Aprovar CI, confirmar ausência de overflow, integrar e publicar; pedir teste no iPhone real e corrigir eventuais diferenças no Safari.
