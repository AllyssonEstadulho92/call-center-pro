# Call Center Pro: plano de evolução orientado ao atendimento

## Objetivo
Apoiar a consulta de procedimentos durante chamadas reais, sem substituir os sistemas oficiais nem apresentar exemplos de treino como regras internas confirmadas.

## Prioridade 1: utilidade imediata
- Abrir atendimento com escolha de serviço e motivo da chamada.
- Mostrar uma pergunta ou frase de cada vez, com «O que dizer», «O que verificar» e «O que evitar».
- Permitir retroceder e consultar as etapas, sem registar dados pessoais.
- Pesquisa rápida por expressões do cliente e sinónimos.
- Apresentar estado de validação e origem em cada guião.

## Prioridade 2: documentação
- Incorporar apenas procedimentos fornecidos ou autorizados pelo operador, sujeitos a validação.
- Separar claramente texto para dizer ao cliente de notas internas.
- Acrescentar campos de origem, data de revisão e responsável pela validação.
- Rever os guiões com documentação aprovada antes de os utilizar como instruções operacionais.

## Prioridade 3: formação
- Simulações com dados fictícios.
- Exercícios sobre perguntas adequadas, limites de intervenção e encaminhamento.
- Feedback baseado nos conteúdos verificados, sem inventar regras internas.

## Critérios de aceitação
1. O operador encontra um assunto por palavras-chave sem percorrer todo o manual.
2. Cada atendimento mostra uma etapa de cada vez e permite voltar.
3. Nenhuma informação sem validação aparece como procedimento oficial.
4. A aplicação não solicita nem guarda dados pessoais de clientes.
5. A compilação, tipagem e testes automáticos passam no GitHub Actions.
6. A interface funciona com teclado, computador e ecrã móvel.

## Segurança e publicação
O repositório atual é público. Não adicionar documentação confidencial, credenciais, contactos privados ou dados de clientes. A publicação pública da aplicação depende da revisão e autorização dos conteúdos.

## Próxima implementação
Rever os guiões Coca-Cola e Burger King com os manuais operacionais autorizados e testar os fluxos com cenários fictícios representativos.
