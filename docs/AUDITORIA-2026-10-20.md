# Auditoria técnica e de comunicação | Call Center Pro
Data: 20/10/2026. Âmbito: revisão do código, 17 guiões, 2 manuais, teleponto, testes, segurança e documentação. Não é auditoria institucional da ILUNION/Coca-Cola/Burger King.

## Método e classificação
- Confirmado: observado no repositório antes da alteração.
- Proposta aplicada: modificações no código em branch de revisão.
- Pendente: informação ou testes que não estão disponíveis de forma autorizada.
- Aprovado em CI só após registo efetivo de sucesso dos workflows.

## Observações confirmadas
1. A aplicação é estática e pública. Não tem integração SAP, API de encomendas, controlo de acesso nem base de dados de clientes. Favoritos/tema e preferências de voz utilizam localStorage apenas no dispositivo; áudio de treino fica temporariamente no browser.
2. Existiam 17 guiões, todos com estado «por confirmar» e sem `lastValidated`. As fontes públicas não validam as regras internas.
3. A percentagem de progresso era descrita como «verificado» quando apenas marcava etapas lidas.
4. Os três guiões Coca-Cola de avaria técnica principais não detalhavam de forma autónoma tipo de equipamento, referência RF/CC, pessoa de contacto e horário.
5. O fecho CC não apresentava separadamente as formulações para um registo confirmado e para um estado pendente, embora advertisse para não prometer.
6. O fecho do guião BK digital pressupunha ausência de resolução na linha, sem critério institucional comprovado.
7. A documentação anterior assinalava Safari iPhone, VoiceOver, permissões do microfone e validação operacional como tarefas pendentes.

## Medidas aplicadas em revisão v1.9.3
- Adicionar duas etapas condicionais a cada um dos três guiões técnicos CC, sem tornar dados obrigatórios nem aconselhar manipulação de equipamento.
- Fecho CC com frase neutra e nota com dois estados; consultar canal interno se houver bloqueio, sem presumir regras PT32/PT60/PT70, piquetes ou prazos.
- Reescrever fecho BK digital e encomenda telefónica sem afirmações operacionais não verificadas.
- Substituir «verificado» por «consultado» no progresso do teleponto.
- Acrescentar testes unitários e Playwright de manutenção de comportamento e conteúdo.

## Verificações previstas
- TypeScript, Vitest, Vite, auditoria npm para dependências e Playwright Chromium desktop/móvel + WebKit emulado;
- integridade das etapas e do catálogo, ausência de afirmações de aprovação institucional, fluxo de pesquisa, manuais e fecho;
- publicação GitHub Pages após integração, sem alterar intencionalmente a navegação e o zoom acessível.

## Pendências indispensáveis para uso em serviço
- Autorização da entidade empregadora para usar ferramenta externa em equipamento de trabalho;
- validação da obrigatoriedade de cada pergunta, regras SAP, regiões, piquetes e prazos por documentação interna autorizada;
- critérios e feedback da auditoria de qualidade anunciada pelo Jorge, sem extrapolar resultados;
- verificação no iPhone Safari físico (foco/zoom, acessibilidade, voz e microfone);
- política de tratamento de dados aplicável e proibição de introduzir dados de clientes na aplicação pública.

## Conclusão condicionada
A melhoria da qualidade de texto reduz alguns riscos, mas não constitui aprovação institucional e não garante ausência de falhas operacionais ou conformidade com uma auditoria cujos critérios não foram fornecidos.

## Falha detetada pela CI durante a própria auditoria
- Na primeira passagem, o teste Playwright detetou overflow horizontal em 320px (largura de documento 345px), após os guiões CC terem passado de seis para oito etapas.
- Causa técnica: `src/styles.css` e `src/crystal.css` definiam a navegação do painel principal como flex sem quebra, com botões/círculos de largura fixa e folgas; oito etapas excediam a largura do cartão.
- Correção: `src/crystal.css` usa grelha de quatro colunas a 480px ou menos, permitindo duas filas. Preserva áreas de toque >=44px e não usa `overflow-x:hidden` ou desativação de zoom.
- Teste: `e2e/mobile-layout.spec.ts` verifica oito botões, mudança de fila, navegação para a última etapa e ausência de scroll horizontal.
- A primeira execução de E2E reprovou seis casos de 320px, com os demais 67 aprovados e três ignorados; esta falha obriga a nova execução completa antes de qualquer integração.
