# Call Center Pro | Estado do projeto

Data da revisão: 20/10/2026. Branch principal publicada: **v1.9.5**, após integração da PR #24 e publicação GitHub Pages confirmada. PR #22 integrada em `main`, GitHub Pages atualizado e CI aprovada.

## Objetivo atual
Auditar comunicação de guiões e usabilidade do Call Center Pro para reduzir promessas não confirmadas e apoiar uma consulta segura durante chamadas de formação.

## Factos confirmados no código
- React + TypeScript + Vite, site GitHub Pages público, sem SAP/backend, autenticação nem base de dados de clientes.
- Existem 17 guiões Coca-Cola/Burger King, todos de treino ou por confirmar; nenhum possui aprovação operacional documentada.
- A versão 1.9.2 corrigiu comportamento de foco da Pesquisa no iPhone; a versão 1.9.3 foi publicada após a auditoria de comunicação e UI.
- O teleponto usava «etapa verificada» e «% verificado» para uma ação que indica apenas consulta do conteúdo.
- Guiões técnicos Coca-Cola não incluíam etapas autónomas para referência RF/CC e contacto/horário; o fecho não diferenciava formalmente as respostas para registo pendente e confirmado.
- Em BK digital havia um fecho que assumia não ser possível resolver o assunto diretamente sem distinguir a competência real da linha.

## Mudança v1.9.3 entregue
- Três guiões técnicos CC incluem identificação do equipamento e dados de contacto condicionais, sem presumir obrigatoriedade.
- Nota do fecho CC esclarece o que dizer quando há confirmação de registo versus estado ainda pendente.
- Corrigidos fechos BK que pressupunham impossibilidade de resolução ou encomenda já concluída.
- Teleponto apresenta etapas consultadas, não validação operacional.
- Testes de conteúdo e E2E atualizados. Relatório em `docs/AUDITORIA-2026-10-20.md`.

## Riscos e limitações
- As instruções e competências reais são internas e não podem ser verificadas por páginas públicas.
- Não utilizar a aplicação pública para NIF, nomes de clientes, moradas, RF/CC específicos, números de encomenda, credenciais, documentação interna ou gravações reais.
- CI e emulação de browsers não substituem revisão WCAG completa nem validação no Safari físico.
- Não existe qualquer autorização de utilização no posto de trabalho documentada neste repositório.

## Última alteração
PR #20 integrada após correção da regressão de viewport a 320px. TypeScript, Vitest, Vite e auditoria npm aprovados. Playwright: **75 testes aprovados e 3 ignorados por ambiente** na segunda execução, sem falhas. O primeiro teste E2E identificou 6 falhas em 320px, corrigidas no mesmo PR com grelha de etapas responsiva. GitHub Actions gerou os novos assets e GitHub Pages publicou a v1.9.3; entrada `index.html` atualizada.

## Próximo passo
Validar em Safari iPhone físico, VoiceOver e microfone. Obter autorização da entidade empregadora e confirmação oficial dos procedimentos de registo, encaminhamento e linguagem, utilizando canais internos autorizados. A aplicação não deve receber dados reais de clientes.

## Revisão v1.9.4 | Fecho factual
- Objetivo: apresentar frases de fecho coerentes com o estado efetivamente consultado pelo operador, sem presumir operações concluídas.
- Foram preservados 17 guiões, dois manuais, pesquisa, modos de leitura, preferências e o layout responsivo da v1.9.3.
- `src/lib/callOutcomes.ts` fornece alternativas apenas para três guiões técnicos CC e `bk-telefone`; por omissão, o texto é neutro.
- `src/components/ClosingStatusPicker.tsx` é reutilizado no teleponto, painel e manuais. Seleção em memória, limpa após recomeçar ou trocar de assunto. Sem APIs ou dados reais.
- Corrigido README desatualizado e acrescentados testes de frases e interface.
- Estado: PR #22 integrada. Verificação TypeScript, Vitest, compilação e auditoria npm aprovadas; Playwright: 81 testes aprovados e 3 ignorados, sem falhas. O workflow compilou assets da v1.9.4 e a nova entrada `index.html` foi publicada pelo GitHub Pages.

## Próximo passo
Confirmar a experiência no iPhone Safari físico, incluindo zoom, leitura por voz e VoiceOver. Obter da entidade empregadora autorização de utilização e validação oficial dos procedimentos de atendimento. Não introduzir informação real de clientes nesta aplicação pública.

## 21/10/2026 | Revisão de guiões v1.9.5
- Objetivo: clareza ao falar com o cliente, triagem sem promessas e frase imediata perante perguntas inesperadas.
- Facto detetado no código: cinco guiões Coca-Cola sem avaria técnica necessariamente registada reutilizavam o mesmo fecho de registo técnico. Separado `ccEndGeneral` para estes cinco assuntos.
- Algumas frases de transição foram corrigidas para refletir verificação futura, em vez de sugerirem encaminhamento já realizado.
- `src/data/callSafetyPhrases.ts` e `CallSafetyReplies.tsx`: quatro perguntas por serviço com resposta ao cliente e verificação interna separada; consulta no teleponto, painel inicial, manuais e respostas rápidas.
- Sem recolher dados de clientes nem ligar a ferramentas de operação. Preservam-se 17 procedimentos não validados, seletor de estado anterior, navegação e pesquisa.
- Testes unitários, TypeScript, Vite e auditoria npm aprovados. Testes Playwright Chromium/WebKit: **87 aprovados, 3 ignorados e nenhuma falha**. PR #24 integrada em `main`; compilação, ficheiro `index.html` atualizado e publicação GitHub Pages confirmados.

## Próximo passo
Validar comportamento no Safari iPhone físico e com VoiceOver, sem garantir equivalência da emulação WebKit. Solicitar autorização de utilização no posto de trabalho e os critérios reais da auditoria, antes de tratar qualquer guião como procedimento institucionalmente aprovado.

## 21/10/2026 | Auditoria e redução de navegação v1.9.6 (em revisão)
- Pedido: menu principal com apenas Início, Coca-Cola, Burger King, Manual Coca-Cola e Manual Burger King; manter funcionalidades secundárias úteis e disponibilizar dois manuais PDF separados.
- Achado: menu da v1.9.5 tinha 14 links; o rodapé móvel tinha apenas quatro atalhos, incluindo Pesquisa. Não há necessidade de remover código, dados ou funcionalidades.
- A alteração preserva os recursos da aplicação num painel secundário expansível na página inicial, e mantém Pesquisa acessível pelo cabeçalho e via Ctrl/Cmd+K.
- Gerador de PDFs sincronizado com `knowledge.ts`, `manuals.ts`, `callSafetyPhrases.ts`, `callOutcomes.ts` e `publicSources.ts`, sem copiar manuais internos privados.
- PDFs públicos esperados: `manuais/manual-coca-cola.pdf` e `manuais/manual-burger-king.pdf` em GitHub Pages, com índice, sequência e verificação por etapa.
- Estado: alterações em PR; CI, renderização final, integração e publicação ainda a confirmar.
- Auditoria: `docs/AUDITORIA-MENU-MANUAIS-2026-10-21.md`.

## Próximo passo v1.9.6
Validar TypeScript/Vitest/Vite/npm audit, testes móveis e geração de PDFs no CI; aprovar PR, publicar e verificar os dois links. Continuam pendentes autorização institucional e Safari físico.
