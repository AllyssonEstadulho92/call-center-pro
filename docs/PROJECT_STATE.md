# Call Center Pro | Estado do projeto

Atualizado: 18-10-2026 | Entrega de referência: quarta-feira, 21-10-2026
Versão publicada: `main` | PR #2 integrado | Aplicação: https://allyssonestadulho92.github.io/call-center-pro/

## Objetivo
Criar uma aplicação web responsiva de consulta e treino individual de atendimento, inspirada na imagem de referência do utilizador, sem ligação aos sistemas oficiais Coca-Cola ou Burger King.

## Implementado nas versões 1.6.0 e 1.7.0
- React 19 + TypeScript + Vite; interface desktop e smartphone; pesquisa, favoritos, fluxos e triagem.
- Painel inicial com dois serviços, guião demonstrativo navegável e situações frequentes.
- Atendimento em direto com leitura sintetizada de frases em português (quando suportado).
- Simulações exclusivamente fictícias, com possibilidade de gravar a própria voz temporariamente e ouvir o resultado.
- Perguntas frequentes e referências públicas; nenhum procedimento interno promovido a «Validado».
- Barra de navegação inferior no telemóvel.
- Na v1.7, manuais separados com roteiro inicial, índice pesquisável, 17 capítulos derivados dos guiões, passos detalhados, voz e fontes públicas.

## Estado de verificação
A primeira passagem do TypeScript detetou uma importação não utilizada, corrigida. A verificação posterior de TypeScript, os testes unitários e a compilação passaram no GitHub Actions. Os testes de navegação em Chromium desktop e móvel também passaram após corrigir o caminho de base do servidor de teste. A compatibilidade visual e de voz com Safari de iPhone requer teste manual.

## Restrições / Riscos
- O repositório e o GitHub Pages são públicos; não publicar processos internos restritos ou materiais das marcas sem autorização.
- A imagem fornecida é um protótipo, não prova de funcionalidade nem de validação institucional. Os indicadores verdes «Validado» no protótipo não são factos confirmados.
- A síntese de voz pode usar vozes diferentes consoante o dispositivo; nunca prometer sotaque pt-PT específico.
- O microfone requer HTTPS, permissão explícita e compatibilidade com MediaRecorder. Não utilizar a gravação em chamadas reais.
- Os scripts continuam de apoio/treino, por confirmar pela operação e chefia.
- Não existe autenticação ou integração com sistemas de tickets; não guardar dados reais.

## Última alteração
v1.7: manuais separados e consulta editorial orientada integrados na branch main pelo PR #3. TypeScript, testes unitários, compilação Vite e testes de navegação desktop/móvel Chromium concluídos com sucesso; GitHub Pages publicou os ficheiros compilados. Os procedimentos operacionais continuam a exigir validação pela entidade competente.

A versão 1.6.0 foi integrada na branch main e compilada para publicação. O GitHub Actions confirmou typecheck, testes unitários, build, smoke test em desktop e telemóvel (Chromium) e publicação Pages. A análise manual no iPhone Safari ainda não foi realizada.

## Próximo passo
Testar os manuais v1.7 visualmente no Safari de um iPhone e num computador real, confirmar síntese de voz, corrigir problemas encontrados e validar os guiões com a documentação operacional autorizada. Conteúdo confidencial apenas em ambiente de acesso controlado e com autorização.

Testar o site num iPhone Safari e num computador real, confirmar funcionamento da voz e permissões de microfone, e rever cada guião com documentos operacionais autorizados.

## Critério mínimo para teste no trabalho
É possível usar para **estudo e consulta de frases genéricas**, mas não para tomar decisões operacionais não validadas. Validar previamente com a supervisão se a ferramenta pessoal pode ser aberta no equipamento da empresa.
