# Call Center Pro | Estado do projeto

Data da revisão: 20/10/2026. Branch principal publicada: **v1.9.3**, PR #20 integrada em `main`.

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



## Correção adicional após falha de regressão
A CI encontrou overflow horizontal real em 320px no painel inicial, provocado por oito botões de etapas sem quebra de linha. Foi aplicada uma grelha de quatro colunas em ecrãs até 480px e acrescentado um teste de navegação até à última etapa. A primeira passagem de Playwright reprovou; deve voltar a ser executada antes da integração.
