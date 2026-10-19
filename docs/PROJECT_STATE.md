# Call Center Pro | Estado do projeto

Atualizado em 19-10-2026.
Versão publicada: 1.8.1, branch `main`.
Alteração integrada: PR #5, com verificação automatizada e GitHub Pages concluídos.

## Problema reportado
No browser do telemóvel a interface aparecia demasiado grande, obrigando a reduzir o zoom para visualizar menus e funcionalidades.

## Factos confirmados no código
- Ambas as páginas HTML têm `meta viewport width=device-width, initial-scale=1.0`, sem bloquear pinch-to-zoom.
- `src/styles.css` já contém media queries para smartphone e tablet.
- A camada `src/crystal.css`, carregada posteriormente, redefinia globalmente `.quick-search` com `min-width:230px`, anulando a regra móvel anterior `min-width:0`. Esta divergência pode expandir o cabeçalho e a largura horizontal do documento.
- Os cartões tinham dimensões elevadas para smartphones, e alguns elementos da barra superior não admitiam encolhimento.

## Implementação publicada
- Media queries finais em `src/crystal.css` para 820px, 480px e 360px e correção explícita da pesquisa na topbar.
- Cabeçalho com largura flexível, truncagem do nome da página, botões compactos e menu.
- Cartões de acesso dimensionados para smartphones; ajuste dos espaçamentos sem reduzir o texto abaixo do utilizável.
- Limites `min-width:0` e `max-width:100%` nos contentores efetivamente flexíveis, sem ocultar overflow horizontal no documento.
- `e2e/mobile-layout.spec.ts` verifica largura, menu, navegação, cartões e ausência de desativação do zoom.

## Estado de validação
CI aprovado no PR #5: TypeScript, Vitest, compilação Vite e 34 testes de Playwright em projetos desktop e mobile Chromium. Os novos testes validaram a ausência de scroll horizontal em 320, 360, 375, 390, 430 e 768px para ecrã inicial, manual e simulações; teste do menu e pesquisa em 320px. Compilação e deploy GitHub Pages concluídos com sucesso. Safari iOS real ainda não foi testado.

## Riscos
- Testes em Chromium não garantem equivalência absoluta com Safari e acessibilidade dinâmica do iPhone.
- O trabalho é exclusivamente de interface. Preservar os guiões, fontes, permissões e limitações existentes.
- O site GitHub Pages e o repositório são públicos; não carregar dados ou procedimentos internos restritos.

## Última alteração
Correção integrada e compilada em `main`; CSS público atualizado com layout móvel fluido.

## Próximo passo
Solicitar ao utilizador confirmação do layout em Safari no iPhone, incluindo zoom normal, páginas principais, teclado, menu, leitura de voz, aumento de texto e rotação. Se houver diferenças reais, reproduzir e corrigir sem alterar os guiões.
