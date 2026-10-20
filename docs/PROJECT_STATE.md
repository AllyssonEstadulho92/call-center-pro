# Call Center Pro | Estado do projeto

Data da revisão: 20/10/2026. Branch principal publicada: v1.9.2; revisão v1.9.3 em PR por integrar.

## Objetivo atual
Auditar comunicação de guiões e usabilidade do Call Center Pro para reduzir promessas não confirmadas e apoiar uma consulta segura durante chamadas de formação.

## Factos confirmados no código
- React + TypeScript + Vite, site GitHub Pages público, sem SAP/backend, autenticação nem base de dados de clientes.
- Existem 17 guiões Coca-Cola/Burger King, todos de treino ou por confirmar; nenhum possui aprovação operacional documentada.
- A versão 1.9.2 está publicada e corrigiu comportamento de foco da Pesquisa no iPhone.
- O teleponto usava «etapa verificada» e «% verificado» para uma ação que indica apenas consulta do conteúdo.
- Guiões técnicos Coca-Cola não incluíam etapas autónomas para referência RF/CC e contacto/horário; o fecho não diferenciava formalmente as respostas para registo pendente e confirmado.
- Em BK digital havia um fecho que assumia não ser possível resolver o assunto diretamente sem distinguir a competência real da linha.

## Mudança v1.9.3 em revisão
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
Proposta v1.9.3 preparada, sujeita a PR, CI e publicação.

## Próximo passo
Confirmar CI e testes, integrar após sucesso e verificar publicação. Solicitar critérios de auditoria de qualidade e documentação operacional autorizada à supervisão, sem carregar ficheiros internos restritos num repositório público.
