## 19-10-2026 | v1.8.1 (correção de responsive)

- Identificado conflito de `min-width:230px` no botão de pesquisa, após as media queries móveis.
- Cabeçalho, cartões e espaços adaptados a largura 320–820px, preservando zoom.
- Adicionados testes E2E de layouts em vários viewports e ecrãs.
- TypeScript, Vitest, Vite e Playwright com 34 testes concluídos com sucesso; correção da seleção do botão «Fechar» nos testes.
- PR #5 integrado na branch main, compilação estática e GitHub Pages concluídos; teste físico Safari pendente.

## 2026-10-18 | 1.7.0

- Criadas páginas separadas de manuais para Coca-Cola e Burger King.
- Conteúdo por fases, índice de capítulos, apresentação passo a passo ou integral, consulta de fontes e leitura por voz.
- Reutilizada a base única de guiões para evitar divergências.
- Nenhuma regra interna foi considerada validada sem documentação institucional.
- Mantida a proibição de guardar dados pessoais do cliente.
- PR #3 integrado. TypeScript, Vitest, compilação Vite, testes Playwright em Chromium desktop/móvel e deploy GitHub Pages confirmados com sucesso. Teste real Safari ainda pendente.

# Registo técnico de alterações

## 2026-10-18 | 1.6.0 (integrada na main)
- Integrado painel guiado na página inicial, com seleção de serviço e progresso.
- Implementada leitura por voz sintetizada das frases do teleponto.
- Criado estúdio de simulações fictícias com captação temporária da própria voz, condicionada a permissão.
- Incluídas perguntas frequentes, acessos rápidos e navegação inferior no telemóvel.
- Conservada a política de não apresentar procedimentos como validados institucionalmente.
- Correção de importação TypeScript não utilizada identificada no CI.
- Acrescentados testes de ponta a ponta com Playwright em Chromium desktop e móvel; corrigido o caminho base do servidor de testes.
- TypeScript, testes unitários, compilação e testes de browser concluídos com sucesso na branch do PR.
- Documentadas arquitetura, decisões, risco e próximos passos.

## Fases anteriores
Consultar `../CHANGELOG.md`. As versões anteriores foram preservadas e o desenvolvimento foi realizado em branch separada.

### Integração final
- PR #2 integrado com verificação TypeScript, testes Vitest, build Vite e testes Playwright desktop/móvel bem-sucedidos.
- GitHub Pages publicou os artefactos compilados da versão 1.6.0.
- Safari, VoiceOver e microfone em iPhone real ainda requerem validação manual.


## 19-10-2026 | Proposta v1.8.0
- Interface dashboard redesenhada e adaptativa, com recursos de marca substituídos por SVG próprios.
- Guiões, manuais e fontes em destaque; números derivados dos conteúdos existentes.
- Atendimento direto com seleção livre de assuntos, verificação, cópia e voz controlável.
- Leitor de voz atualizado com vozes portuguesas disponíveis, ritmo, pausa, repetir e parar.
- PR #4 com testes TypeScript, Vitest e Playwright; validação final e deploy a registar após execução.


### Publicação final v1.8.0
- PR #4 integrado na branch main após correção da identificação acessível do seletor de voz.
- TypeScript, testes unitários, compilação e Playwright desktop/móvel aprovados.
- Artefactos estáticos do Vite e publicação GitHub Pages concluídos; ligação: https://allyssonestadulho92.github.io/call-center-pro/.
- Teste físico de Safari/VoiceOver e qualidade de voz continua pendente.

## 19-10-2026 | v1.9.0 (auditoria e fontes)
- Fontes públicas rechecadas: Coca-Cola Portugal, Burger King Portugal, Livro de Reclamações e ASAE, com estado e limites visíveis.
- Removidas afirmações não documentadas sobre acesso a pedidos digitais da linha Burger King.
- Gerado lockfile npm real; CI com npm ci, npm audit, Dependabot e GitHub Actions com SHAs oficiais.
- Entrada app.html pública com redirecionamento controlado; deploy manual gera index.html; limpeza de assets preserva a geração anterior.
- Novos testes sobre veracidade, navegação e triagem.
- Pendente CI e testes físicos Safari.

### Fecho da auditoria 1.9.0
- O relatório inicial do npm identificou 2 vulnerabilidades críticas em tinypool e 1 moderada em @vitest/mocker, através de Vitest 3.x.
- Vitest atualizado para 5.0.5; lockfile regenerado pelo npm; nova auditoria encontrou 0 vulnerabilidades conhecidas.
- GitHub Actions aprovou tipagem, 34 testes unitários, build Vite e os testes de browser desktop/mobile.
- PR #6 integrado e versão compilada publicada no GitHub Pages. Ficheiros compilados antigos reduzidos à geração anterior.
- Pendente: Safari iPhone/VoiceOver, proteção de branch e validação das regras internas por quem tem competência.

## 19/10/2026 | v1.9.1 (viewport móvel)
- Meta viewport com `viewport-fit=cover`, mantendo zoom do utilizador.
- Safe areas em quatro direções, altura dinâmica, cabeçalho e navegação móvel até 980px.
- Campos móveis >=16px e alvos de toque maiores; guias e procedimentos preservados.
- Testes Chromium e WebKit de dimensões, inputs, modal e reflow: 68 aprovados após ajustar expectativa do valor computado das safe areas.
- TypeScript, Vitest, npm audit e Vite aprovados. PR #17 integrado e GitHub Pages publicado com viewport correto.
- Validação em Safari e VoiceOver de iPhone real continua pendente.

## 20-10-2026 | 1.9.2 (publicada)
- Pesquisa principal deixa de focar automaticamente o input em dispositivos tácteis; mantém o foco rápido em desktop.
- «Iniciar atendimento» foca inicialmente Fechar em dispositivos tácteis, evitando abertura automática do teclado.
- Campos editáveis e selects com 16px também em tablets de ecrã largo.
- Regressões E2E de foco, pesquisa e overflow ampliadas para WebKit e Chromium.
- Zoom manual, guiões, dados e funcionalidades existentes preservados.
- PR #18 integrada, verificações automáticas de qualidade e Playwright aprovadas, build Vite e GitHub Pages concluídos com sucesso.
- Validação no Safari de iPhone físico e VoiceOver ainda pendente.

## 20-10-2026 | v1.9.3 (publicada, auditoria de utilização)
- Complementada a triagem dos três guiões principais de avaria Coca-Cola com tipo de equipamento, RF/CC, contacto e horário apenas quando aplicáveis.
- Fecho de ocorrências passa a distinguir registo efetivamente confirmado de estado pendente, evitando garantias não verificadas.
- Guião Burger King digital deixa de pressupor incapacidade da linha para resolver o assunto; fecho de encomenda telefónica exige confirmação real no sistema.
- Percentagem e marcação de etapas do teleponto passam a representar consulta, não validação operacional.
- Alargados testes unitários e Playwright para as correções de conteúdo.
- Uso profissional condicionado a autorização e manuais oficiais. CI, integração e GitHub Pages confirmados; Safari físico ainda pendente.

### Correção de layout identificada pelos testes v1.9.3
- A primeira execução de Playwright revelou overflow a 320px devido à passagem de seis para oito etapas no painel inicial.
- Introduzida grelha de quatro colunas para as etapas em smartphones até 480px, sem esconder overflow nem bloquear ampliação.
- Adicionado teste específico de regressão, sujeito a nova execução da CI.
- PR #20 integrada na branch `main`; TypeScript, Vitest, build e auditoria npm aprovados, E2E: 75 testes aprovados e 3 ignorados após corrigir 6 falhas de layout em 320px na primeira execução. Site publicado com `index.html` compilado e assets atualizados.

## 21/10/2026 | v1.9.4 (publicada)
- Novo seletor manual de estado no fecho de três guiões técnicos Coca-Cola e na encomenda telefónica Burger King.
- Texto neutro por defeito; frases de confirmação e pendência só mediante escolha explícita.
- Mesmo comportamento no teleponto, dashboard e manuais, com áudio e cópia sincronizados.
- Seleções temporárias, sem dados de clientes, APIs operacionais ou aprovação institucional implícita.
- README atualizado e testes unitários/Playwright adicionados. PR #22 integrada após CI TypeScript/Vitest/build/npm audit aprovada e 81 testes de browser aprovados (3 ignorados). Compilação e publicação GitHub Pages concluídas. Safari físico e validação institucional continuam pendentes.

## 21-10-2026 | v1.9.5 (publicada)
- Cinco contactos Coca-Cola não necessariamente técnicos passam a terminar sem pressupor registo de avaria ou encaminhamento confirmado.
- Reformuladas transições para confirmar informação antes de prometer canais, respostas ou encaminhamentos.
- Novo painel expansível de oito respostas rápidas (quatro por serviço) perante prazos, registos, assistência, bloqueios, entregas, reembolsos, pedidos digitais ou reclamações.
- Conteúdo apresentado em «O que dizer» e «Antes de responder», com opção de copiar; integrado em teleponto, painel inicial, manuais e respostas rápidas.
- Sem novas regras internas, acesso a sistemas operacionais ou recolha de dados de clientes. Testes unitários, TypeScript, Vite e auditoria npm aprovados. Playwright: 87 testes aprovados, 3 ignorados, sem falhas. PR #24 integrada, build e GitHub Pages publicados. Safari físico e validação operacional continuam pendentes.

## 21-10-2026 | v1.9.6 (publicada)
- Menu principal e atalhos móveis limitados a Início, Coca-Cola, Burger King, Manual Coca-Cola e Manual Burger King.
- Pesquisa, favoritos, FAQ, triagem, simulações, formação, respostas rápidas, fontes e versões continuam disponíveis sob «Outras ferramentas de apoio», fechado por defeito.
- Dois manuais PDF separados, gerados a partir da mesma fonte dos 17 guiões e guias online, incluindo índice, etapas, perguntas, frases, verificações, cuidados, condições e fontes públicas com limites.
- Transferência dos manuais pela página inicial e pela respetiva página de manual.
- Publicação de PDFs gerados integrada na pipeline GitHub Pages e validada na CI.
- Testes de menu, links e reflow aprovados em CI: TypeScript, Vitest, Vite e auditoria npm aprovados; Playwright 93 aprovados e 3 ignorados. PR #26 integrada e GitHub Pages publicada. PDFs gerados a partir dos 17 guiões: Coca-Cola 93 247 bytes e Burger King 83 304 bytes. Safari iPhone físico e revisão institucional continuam pendentes.

## 22-10-2026 | v1.9.7 (publicada)
- Fontes oficiais revistas: Coca-Cola Portugal, suporte Burger King Portugal, ASAE Livro de Reclamações e RGPD artigo 5.º no EUR-Lex.
- Secção de factos públicos com origem, interpretação e limites de prova, distinguindo conteúdos autorizados publicamente dos guiões não validados.
- Explicações pormenorizadas para cada um dos 17 assuntos, com três perguntas para clarificar, verificação e afirmações a evitar.
- Integração nos dois manuais da aplicação e na geração sincronizada dos dois PDFs A4, sem novas regras operacionais inventadas.
- Testes e publicação concluídos: 46 testes unitários aprovados; TypeScript, Vite e auditoria npm aprovados; Playwright 97 testes aprovados e 3 ignorados; PR #28 integrada; PDFs 110 224 e 100 819 bytes e GitHub Pages publicados. Revisão visual completa dos PDFs e Safari iPhone físico/VoiceOver ainda pendentes.
