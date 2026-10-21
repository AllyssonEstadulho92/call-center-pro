# Call Center Pro | versão 1.9.4

Aplicação web independente de apoio à **consulta e ao treino do atendimento telefónico** em português de Portugal. Desenvolvida em **React + TypeScript + Vite**.

> **ATENÇÃO:** esta aplicação **não é oficial**, **não está ligada aos sistemas da Coca-Cola ou do Burger King** e não substitui os procedimentos definidos pela entidade empregadora. A base inicial contém exemplos de formação e informações por confirmar; não existem conteúdos classificados como institucionalmente validados.

## Funcionalidades

- Duas áreas independentes: Coca-Cola (avarias de equipamentos) e Burger King (apoio ao cliente).
- **Iniciar atendimento** abre rapidamente um seletor de serviço e situação, com pesquisa por expressões de clientes.
- **Modo Atendimento em Direto** com etapas navegáveis e indicador de etapas consultadas (não comprova ações no sistema oficial).
- **Saudação ajustável** entre «bom dia» e «boa tarde», sem alterar a origem dos guiões.
- **Teleponto ajustável** com tamanho de letra de 20 a 40 px e opção de recomeçar a sequência.
- **Atalho Ctrl/Cmd + K** para pesquisar procedimentos sem navegar pelos menus.
- **Teleponto** com o texto sugerido em maior destaque.
- Três campos por etapa: «O que dizer», «O que verificar» e «O que evitar».
- Pesquisa por palavras-chave, sinónimos e expressões sem diferenciação de acentos.
- Favoritos gravados localmente (apenas IDs dos procedimentos, **não** informação do cliente).
- Área de estudo com perguntas de treino, respostas e explicações.
- Modo escuro, interface adaptável a computador e telemóvel.
- Estado de validação e descrição da origem para cada procedimento.
- Testes unitários de pesquisa, separação de áreas e segurança inicial dos conteúdos.

## Requisitos

- Node.js **22** ou versão compatível com o Vite 7.
- npm.
- Acesso à Internet para instalar dependências pela primeira vez.

## Instalação no computador

```bash
npm install
npm run dev
```

Acede ao endereço local apresentado no terminal (normalmente `http://localhost:5173/app.html`).

## Verificações

```bash
npm run typecheck
npm test
npm run build
npm run preview
```

O comando `npm run build` cria `dist/`. O `npm test` executa os testes da pesquisa e da base inicial. O ficheiro `package-lock.json` já existe. Usa preferencialmente `npm ci` para instalar as versões bloqueadas.

## Repositório GitHub existente

O código deste projeto é mantido em [`AllyssonEstadulho92/call-center-pro`](https://github.com/AllyssonEstadulho92/call-center-pro). O repositório está **público**, pelo que os conteúdos enviados para o GitHub ficam acessíveis a terceiros.

A cada alteração, verifica o workflow **Verificação de qualidade** no separador Actions. Não publiques instruções internas nem dados de clientes. A publicação pelo GitHub Pages ocorre automaticamente a partir da branch `main`; continua proibido divulgar dados de clientes ou procedimentos internos não autorizados.

### Publicação no GitHub Pages

**Não publiques documentação interna, números de telefone privados, processos confidenciais ou dados reais de clientes.** Um repositório privado não garante que o site do GitHub Pages seja privado. A publicação destina-se **apenas a conteúdos autorizados para divulgação pública**.

Se confirmaste que todos os conteúdos podem ser públicos:

1. No repositório, abre **Settings > Pages** e escolhe **GitHub Actions** na secção de construção/publicação, quando disponível.
2. Abre **Actions > Publicação MANUAL no GitHub Pages**.
3. Seleciona **Run workflow** e escreve `PUBLICO` no campo de autorização.
4. O site ficará disponível no endereço apresentado pelo GitHub Pages após o sucesso da publicação.

O Vite adapta automaticamente o `base` ao nome do repositório no ambiente GitHub Actions, através de `GITHUB_REPOSITORY`. A aplicação utiliza navegação interna sem URLs dinâmicos, evitando o problema comum de recarregar subpáginas no GitHub Pages.

Se os procedimentos forem internos ou sensíveis, **não uses GitHub Pages**. Solicita uma plataforma institucional com autenticação e permissões adequadas.

## Onde atualizar os conteúdos

- `src/data/knowledge.ts`: guiões, passos, descrição, sinónimos e estado da informação.
- `src/App.tsx`: fluxos de navegação e funcionalidades da interface.
- `src/styles.css`: apresentação visual e adaptação ao ecrã.
- `src/lib/search.ts`: mecanismo de pesquisa.
- `src/lib/search.test.ts`: testes automáticos.

### Regra de validação

Não mudes um conteúdo para `validado` sem confirmação institucional documentada. Nesse caso, acrescenta uma fonte identificável e a data da validação no formato `AAAA-MM-DD`.

### Proteção de dados

Esta versão **não tem formulários de dados dos clientes**, backend, base de dados, autenticação ou recolha de informação de chamadas. Os favoritos usam armazenamento local do browser e contêm exclusivamente IDs dos guiões. Esta aplicação não deve ser usada para guardar dados pessoais.

## Limitações da entrega

O código-fonte foi preparado e os ficheiros TypeScript foram analisados sintaticamente no ambiente de criação. A instalação de dependências, a execução do Vite, a compilação completa e os testes automatizados **não foram executados neste ambiente**, porque a ligação ao registo npm não estava disponível. Executa os comandos de verificação acima (ou consulta os resultados no GitHub Actions) antes de utilizar a aplicação em produção.

## Próximas versões

- Validar e substituir exemplos de treino por procedimentos aprovados.
- Melhorar o conteúdo após simulações com casos reais anonimizados.
- Criar editor de conteúdos em ambiente protegido, se autorizado.
- Expandir testes automatizados e acessibilidade.

Ver [CHANGELOG.md](CHANGELOG.md).


## Versão 1.3.0: fontes e triagem

A área **Decidir encaminhamento** orienta a identificação do canal, mas não consulta bases de dados de clientes.
A área **Segurança e fontes** oferece ligações públicas verificadas e descreve exatamente o que demonstram e o que não comprovam.
Os manuais pessoais disponibilizados pelo utilizador foram utilizados como referência para compreender situações frequentes; **não foram publicados no repositório nem foram copiados textos operacionais confidenciais**. As regras concretas de campanha continuam por confirmar com a supervisão.

Fontes públicas consultadas em 18/10/2026:
- https://www.burgerking.pt/support
- https://www.coca-cola.com/pt/pt/about-us/contact-us
- https://www.coca-cola.com/pt/pt/about-us/faq
- https://www.livroreclamacoes.pt/INICIO/

Nunca publicar dados pessoais dos clientes, credenciais ou documentos internos no repositório público.


## Correção da página em branco (v1.3.1)

O GitHub Pages estava a servir diretamente `index.html`, que carregava `/src/main.tsx` sem compilação. A fonte React passou a estar em `app.html`. O workflow [Construir aplicação para GitHub Pages](.github/workflows/build-static-site.yml) executa testes, compila com Vite e grava o `index.html` e `assets/` compilados na raiz para publicação pela fonte **main / root**. ` .nojekyll` evita a transformação Jekyll. O projeto permanece público, sem dados reais nem procedimentos internos autorizados.

**Acesso público esperado:** https://allyssonestadulho92.github.io/call-center-pro/

As alterações efetuadas por `GITHUB_TOKEN` podem não ativar um novo ciclo de publicação do Pages. Se a compilação terminar e o site não atualizar, executa um commit normal no ramo `main` para disparar a publicação da fonte de branch.


## Versão 1.4.0: respostas rápidas e acessibilidade

- **Respostas rápidas** na navegação lateral e na página inicial: pesquisa, filtro por serviço, frase sugerida, verificação, cautela e acesso ao guião completo.
- As frases são extraídas da mesma base de conhecimento dos guiões, evitando manter versões contraditórias.
- Pesquisa com relevância ordenada por título, sinónimos e categoria.
- Tema claro/escuro guardado no dispositivo (sem dados de clientes).
- Atalho para saltar diretamente ao conteúdo, realce de foco do teclado e respeito pelas preferências de movimento reduzido.
- Ecrã de recuperação caso ocorra um erro inesperado da interface.
- Novos testes unitários e requisitos de não validação indevida dos guiões.

**Nota de segurança:** nenhuma frase desta versão equivale à validação operacional por uma entidade responsável.


## Versão 1.5.0: formação orientada

A área de treino inclui 12 questões fictícias, correção explicada, progresso, resultado final e opção de praticar apenas os erros. As respostas não são guardadas nem transmitidas e os exercícios não substituem formação oficial.


## Versão 1.6.0: preparação para o turno

- Ecrã inicial com painel de atendimento guiado, duas áreas e ocorrências frequentes.
- Leitura das frases em português europeu pelo browser (se houver voz adequada disponível), incluindo ritmo mais lento.
- Simulações fictícias com gravação temporária apenas da própria voz e sem transmissão nem armazenamento persistente.
- Nova secção de perguntas frequentes e barra inferior de navegação no telemóvel.
- Não utilizar a gravação durante chamadas reais nem recolher voz ou dados dos clientes.

O microfone necessita de HTTPS, browser compatível e autorização expressa. Os exercícios e guiões **não são procedimentos institucionais validados**.


### Testes de navegação no browser

Para executar testes de aceitação automatizados no Chromium:

```bash
npm install
npx playwright install chromium
npm run test:e2e
```

O workflow `Testes de utilização no browser` verifica o ecrã inicial, a abertura de um atendimento, o teleponto e as simulações em desktop e em tamanho móvel. Isto não substitui os testes no Safari do iPhone ou a validação dos scripts com a supervisão.

## Versão 1.7.0 · Manuais separados para consulta

O menu tem agora dois acessos independentes: **Manual Coca-Cola** e **Manual Burger King**.
Cada manual apresenta:
- Visão geral em seis fases, abertura sugerida e princípios para orientação;
- Índice pesquisável dos guiões do serviço, com filtro por tema;
- Leitura passo a passo, acesso ao guião integral, progresso local não persistido, botões anterior/seguinte e voz sintetizada;
- Para cada etapa: frase para o cliente, verificação necessária, o que evitar, nota de origem e próximo assunto a consultar;
- Fontes públicas com limites explícitos; ausência de validação operacional quando aplicável;
- Acesso direto ao modo Atendimento em Direto sem introdução de dados de clientes.

A primeira versão dos manuais deriva da base de guiões já existente e de fontes públicas, **não** de documentação interna formalmente validada. As versões Word anteriores não estavam disponíveis neste ambiente. Não publicar manuais internos restritos num repositório GitHub público.

### Testes

`npm run typecheck`, `npm test`, `npm run build` e `npm run test:e2e` compõem a verificação da aplicação, complementada por testes manuais no Safari iOS, VoiceOver e navegadores desktop.


## Versão 1.8.0 | Dashboard Cristal

O painel apresenta cartões próprios para Coca-Cola e Burger King, manuais independentes, simulações, acesso a fontes públicas e procedimentos frequentes. A interface é responsiva, com uma camada CSS separada em `src/crystal.css` e ilustrações SVG originais.

Os únicos contadores do painel são o número de guiões disponíveis, favoritos guardados no dispositivo e guiões validados na base; não há métricas de desempenho de chamadas, nem garantia de procedimentos aprovados.

### Leitura por voz
No Atendimento em Direto escolhe o assunto e a etapa e utiliza **Ouvir frase**, **Pausar**, **Repetir** e **Parar**. A lista permite selecionar as vozes portuguesas disponibilizadas pelo teu browser e a velocidade. A qualidade da voz depende do equipamento e não está garantida uma voz humana; a aplicação não contrata um serviço externo de síntese.

### Verificações
`npm run typecheck`, `npm test`, `npm run build` e `npm run test:e2e`. A compatibilidade e a qualidade de áudio no Safari e VoiceOver têm de ser testadas num iPhone real.

## Ajustes móveis | v1.8.1

- Corrigido conflito de estilos no cabeçalho: pesquisa mantinha largura mínima de 230px em ecrãs pequenos, alargando a página.
- Estilos específicos para 320, 360, 375, 390, 430 e 768px sem alterar a escala real do browser.
- Cabeçalho compacto com título truncado quando necessário, botões adequados ao toque e menu móvel.
- Cartões dos serviços mais baixos e melhor espaçamento; conteúdos de atendimento, manuais e simulações continuam acessíveis.
- O zoom de acessibilidade do browser não é bloqueado.

**Validação:** executar `npm run test:e2e` e os restantes comandos do projeto. O teste automatizado verifica excesso horizontal e proporções em vários viewports, mas não substitui testes no Safari de iPhone real.

## Auditoria de informação e segurança | v1.9.0

Os guiões continuam classificados como exemplos ou «Por confirmar». Os portais oficiais públicos confirmam apenas os dados explicitamente publicados. A nova área **Segurança e fontes** mostra quatro factos públicos verificados com fontes e limites, e seis grupos de procedimentos internos por validar.

Consulta `docs/FONTES-PUBLICAS-VERIFICADAS.md` e `docs/AUDITORIA-2026-10-19.md`.

A instalação utiliza `package-lock.json` real e `npm ci`. A pipeline realiza verificação TypeScript, testes, compilação e auditoria npm, sem atribuir certificação de segurança total. A publicação em GitHub Pages é pública.

Executa os testes locais com `npm ci && npm run typecheck && npm test && npm run build && npm run test:e2e`.

## Viewport e utilização em iPhone (v1.9.1)

A página usa `width=device-width, initial-scale=1.0, viewport-fit=cover` e espaçamento para as quatro zonas seguras do ecrã. No iPhone, o cabeçalho, o menu e os botões inferiores adaptam-se ao retrato e à orientação horizontal. A pesquisa e os campos de seleção têm letra mínima de 16px para evitar o zoom automático do Safari ao focar.

**O zoom manual continua disponível.** A configuração não desativa o gesto de aproximação.

Testes de interface: `npm run test:e2e`, com Chromium desktop, Chromium móvel e emulação WebKit para o viewport iPhone. A verificação de safe areas e do teclado real deve ser feita adicionalmente no Safari do dispositivo.

## Versão 1.9.4 | Fecho factual orientado por estado
Nos três guiões principais de avarias Coca-Cola e no de encomenda por telefone Burger King, o teleponto, o painel inicial e os manuais apresentam uma seleção de estado. Por defeito, o texto é neutro. O operador só deverá escolher a alternativa «confirmado» depois de a verificar no sistema oficial. A seleção é local, transitória e limpa ao recomeçar ou trocar de situação.

Esta funcionalidade não consulta, aprova ou guarda registos e não substitui as instruções autorizadas pela entidade empregadora. A aplicação pública não deve receber dados de clientes.

Testes: `npm ci && npm run typecheck && npm test && npm run build && npm run test:e2e`. Safari físico, VoiceOver e validação institucional continuam pendentes.

## 21/10/2026 | v1.9.5: respostas claras durante a chamada (em revisão)
Os 17 guiões continuam a ser conteúdos de treino ou por confirmar, sem validação institucional. Cinco contactos Coca-Cola de abastecimento, manutenção, triagem geral, consumidor e apoio comercial deixaram de usar o fecho que pressupunha o registo de uma avaria.

No teleponto, painel inicial, capítulos de manual e página de respostas rápidas (quando é escolhido um serviço) existe agora **«Se o cliente fizer outra pergunta»**. A secção mostra quatro temas de dúvida por serviço, uma frase curta para dizer e uma verificação apenas para leitura interna. Não decide reembolsos, não garante visitas ou prazos, não consulta sistemas e não recolhe dados reais de clientes.

Os encaminhamentos, registos e condições concretas continuam a depender do sistema e das orientações aprovadas. A utilização da ferramenta num computador da entidade empregadora requer autorização.

## v1.9.6 | Navegação simples e dois manuais PDF (publicada)
O menu principal e os atalhos inferiores no iPhone mostram apenas cinco áreas: Início, Coca-Cola, Burger King, Manual Coca-Cola e Manual Burger King. Os outros nove recursos ficam em «Outras ferramentas de apoio», no Início, sem serem removidos. Pesquisa permanece no cabeçalho e via Ctrl/Cmd+K.

Os dois PDFs são gerados diretamente dos mesmos 17 guiões e demais conteúdos editoriais utilizados pela aplicação, com índice, etapas, perguntas e respostas, verificações, avisos e fontes públicas. Estão disponíveis nos próprios manuais e nos links:
- `manuais/manual-coca-cola.pdf`
- `manuais/manual-burger-king.pdf`

O workflow GitHub Actions exporta os dados via `node scripts/export-manual-data.mjs .tmp/manual-data.json`, instala ReportLab num ambiente Python temporário e executa `scripts/generate_manual_pdfs.py`. Os PDFs gerados são publicados no GitHub Pages. Não contêm procedimentos internos aprovados nem dados reais de clientes.

A utilização em contexto profissional depende da autorização da empresa, e os conteúdos continuam classificados como formação/por confirmar. A compatibilidade no Safari físico e VoiceOver necessita de verificação manual.

A v1.9.6 foi integrada e publicada. Os ficheiros disponíveis no GitHub Pages são [Manual Coca-Cola](https://allyssonestadulho92.github.io/call-center-pro/manuais/manual-coca-cola.pdf) e [Manual Burger King](https://allyssonestadulho92.github.io/call-center-pro/manuais/manual-burger-king.pdf). A compilação e geração passaram nos testes automáticos, mas o Safari físico e a aprovação institucional mantêm-se pendentes.

## v1.9.7 | Manuais mais detalhados e fontes rastreáveis (em revisão)
Manual Coca-Cola e Manual Burger King passam a apresentar, na entrada, uma secção de factos oficialmente documentados, com ligações às fontes e informação sobre os seus limites. Cada um dos 17 capítulos explica o significado do assunto, três perguntas possíveis, como proceder prudentemente, o que verificar na ferramenta da operação e o que evitar. As duas edições PDF são geradas a partir da mesma base e incorporam o mesmo aprofundamento.

**Não confundir:** factos públicos verificados não equivalem a guiões internos aprovados. Sem documentação institucional de SAP, prazos, piquetes, códigos, reembolsos ou permissões, essas regras não são incluídas como instruções oficiais. Nenhum dado real de clientes deve ser introduzido na aplicação pública.
