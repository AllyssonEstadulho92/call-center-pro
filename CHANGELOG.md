## [1.9.1] - 2026-10-19

- Configuração de viewport com `viewport-fit=cover` e margens seguras em iPhone.
- Navegação móvel até 980px, incluindo smartphones na horizontal.
- Evitado zoom involuntário no foco de pesquisa com inputs/selects de 16px.
- Altura dinâmica do viewport, modal e barra de navegação ajustados ao espaço útil.
- Ampliados botões de cabeçalho e testes de retrato, horizontal e emulação WebKit.
- Preservadas as funcionalidades, os manuais e os estados de validação.

## [1.9.0] - 2026-10-19

- Revisão das fontes oficiais com limites de aplicabilidade e rastreabilidade.
- Corrigidas afirmações categóricas BK sobre ausência de acesso a pedidos digitais sem documentação.
- Novo painel de auditoria e testes de conteúdo.
- Lockfile npm gerado pelo npm; CI com instalação reproduzível e auditoria de dependências.
- GitHub Actions fixadas a commits oficiais; Dependabot configurado.
- Publicação pública corrigida para URL app.html e preparação do deploy manual de emergência.
- Documentados riscos operacionais e validações pendentes.

## [1.8.1] - 2026-10-19

- Corrigida largura mínima indevida do botão de pesquisa no modo móvel.
- Compactados cabeçalho, cartões dos serviços e espaçamentos mantendo legibilidade e áreas clicáveis.
- Prevenido conteúdo fora da largura visível em ecrãs estreitos, sem bloquear o zoom.
- Adicionados testes de regressão para 320, 360, 375, 390, 430 e 768px, manuais, simulações e pesquisa.

## [1.8.0] - 2026-10-19

- Dashboard Cristal: interface responsiva, espaçamento consistente, manuais e fontes mais visíveis.
- Cartões dos dois serviços com arte SVG criada para o projeto, sem usar logótipos ou fotografias de terceiros.
- Números calculados a partir da biblioteca, sem indicadores fictícios de chamadas.
- Atendimento inicial com seleção livre de serviço e ocorrência, notas e progresso.
- Leitor de voz com escolha das vozes portuguesas instaladas, velocidade, pausa e repetição.
- Regressões cobertas por testes Chromium para desktop e mobile.

## [1.7.0] - 2026-10-18

- Criados manuais Coca-Cola e Burger King, com páginas distintas e ligações diretas a partir do menu, do início e da área de serviço.
- Índice de capítulos baseado na base única de guiões; pesquisa e filtro por categoria.
- Consulta passo a passo e leitura integral, áudio de treino, progresso não persistido e notas sobre origem.
- Roteiro editorial de seis fases por projeto, perguntas frequentes, princípios de comunicação e fontes públicas relacionadas.
- Reforçadas as distinções entre exemplos de estudo, factos públicos e regras operacionais por confirmar.
- Acrescentados testes unitários e de interface aos manuais.

## [1.6.0] - 2026-10-18

- Painel inicial semelhante ao protótipo com leitura por voz e guião orientado.
- Simulações fictícias, gravação local da própria voz e eliminação manual.
- Perguntas frequentes, situações recorrentes e navegação móvel.
- Mantida a separação entre guiões de treino e informação operacional validada.

## [1.5.0] - 2026-10-18

- Formação alargada a 12 questões e cenários sem dados pessoais.
- Resultado final, correções comentadas e repetição das questões incorretas.
- Navegação para a questão anterior, progresso e reinício.

## [1.4.0] - 2026-10-18

- Nova biblioteca de respostas rápidas com pesquisa, filtros por serviço e acesso ao guião completo.
- Texto de resposta obtido dos próprios procedimentos, sem duplicação de regras internas.
- Pesquisa com ordenação por relevância e testes de regressão.
- Preferência de tema persistente e melhorias de acessibilidade, teclado e movimento reduzido.
- Proteção visual contra erros inesperados da interface.
- Mantidos os avisos de procedimentos não validados e a política de não recolher dados pessoais.

## [1.3.0] - 2026-10-18

- Adicionada triagem por origem do pedido e assunto, sem recolha de dados pessoais.
- Acrescentadas quatro fontes públicas consultáveis, com âmbito e limites explícitos.
- Incluídos cinco guiões adicionais de formação e consulta (Coca-Cola e Burger King), todos por confirmar operacionalmente.
- Associadas fontes públicas relacionadas aos guiões aplicáveis, sem as apresentar como confirmação das regras internas.
- Incluídos testes automáticos de encaminhamento, fontes HTTPS e separação de canais.
- Mantida desativada a publicação automática no GitHub Pages até haver autorização dos conteúdos.

# Histórico de versões

## 1.2.0 · 18 de outubro de 2026

- Novo seletor «Iniciar atendimento» com filtragem de serviço, pesquisa e abertura direta do guião.
- Controlo manual da saudação em cada chamada («bom dia» / «boa tarde»).
- Leitura do teleponto com tamanho de letra regulável e botão «Recomeçar».
- Atalho de teclado Ctrl/Cmd + K para abrir a pesquisa.
- Testes unitários para a saudação, sem tratar exemplos como instruções institucionais.
- Mantida a política de não recolher dados pessoais de clientes.

## [1.1.0] - 2026-10-18

### Incluído

- Projeto React + TypeScript + Vite.
- Dashboard com duas áreas independentes.
- 12 guiões iniciais identificados como conteúdos por confirmar.
- Atendimento em direto com passos, teleponto, checklist e notas operacionais.
- Pesquisa por assuntos, sinónimos e texto sem acentos.
- Favoritos locais, treino, modo escuro e apresentação responsiva.
- Fonte, estado e data de validação (quando existir) por guião.
- Testes da base inicial e configuração de CI.
- Publicação manual no GitHub Pages condicionada a confirmação expressa de divulgação pública.

### Limitações

- Não foram recebidas instruções institucionais aprovadas para validar os procedimentos.
- A instalação npm, compilação completa e testes ainda não foram executados no ambiente da entrega por indisponibilidade do registo npm.
