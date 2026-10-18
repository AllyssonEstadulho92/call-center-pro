# Call Center Pro | versão 1.2.0

Aplicação web independente de apoio à **consulta e ao treino do atendimento telefónico** em português de Portugal. Desenvolvida em **React + TypeScript + Vite**.

> **ATENÇÃO:** esta aplicação **não é oficial**, **não está ligada aos sistemas da Coca-Cola ou do Burger King** e não substitui os procedimentos definidos pela entidade empregadora. A base inicial contém exemplos de formação e informações por confirmar; não existem conteúdos classificados como institucionalmente validados.

## Funcionalidades

- Duas áreas independentes: Coca-Cola (avarias de equipamentos) e Burger King (apoio ao cliente).
- **Iniciar atendimento** abre rapidamente um seletor de serviço e situação, com pesquisa por expressões de clientes.
- **Modo Atendimento em Direto** com etapas navegáveis e indicador de etapas verificadas.
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

Acede ao endereço local apresentado no terminal (normalmente `http://localhost:5173`).

## Verificações

```bash
npm run typecheck
npm test
npm run build
npm run preview
```

O comando `npm run build` cria `dist/`. O `npm test` executa os testes da pesquisa e da base inicial. Se tudo funcionar, executa `npm install` uma primeira vez e adiciona o `package-lock.json` ao GitHub; depois podes substituir `npm install` por `npm ci` nos workflows para instalações mais reprodutíveis.

## Repositório GitHub existente

O código deste projeto é mantido em [`AllyssonEstadulho92/call-center-pro`](https://github.com/AllyssonEstadulho92/call-center-pro). O repositório está **público**, pelo que os conteúdos enviados para o GitHub ficam acessíveis a terceiros.

A cada alteração, verifica o workflow **Verificação de qualidade** no separador Actions. Não publiques instruções internas nem dados de clientes. A distribuição web pelo GitHub Pages permanece **manual** e exige verificação prévia de autorização de divulgação pública.

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
