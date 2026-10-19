# Auditoria técnica e de conteúdos | Call Center Pro v1.9.0

Data: 19/10/2026. Repositório: https://github.com/AllyssonEstadulho92/call-center-pro

## Objetivos executados
1. Separar factos publicamente comprovados de procedimentos operacionais não validados.
2. Corrigir afirmações categóricas de acesso a pedidos digitais Burger King que não têm fonte institucional.
3. Mostrar ao utilizador um painel de rastreabilidade de fontes, limites e áreas pendentes.
4. Criar lockfile npm com checksums reais gerados no GitHub Actions e usar `npm ci`.
5. Adicionar `npm audit` com limiares para dependências de produção e críticas no conjunto total.
6. Referenciar as GitHub Actions por SHAs completos retirados de tags dos repositórios oficiais.
7. Adicionar Dependabot para npm e GitHub Actions.
8. Corrigir a entrada `app.html` no GitHub Pages, mantendo-a utilizável em desenvolvimento.
9. Corrigir o deploy manual para produzir `index.html` e limitar o acúmulo de assets no fluxo automático, mantendo os assets da versão imediatamente anterior para caches.
10. Adicionar testes de fonte, conteúdo e navegação, preservando os fluxos de atendimento já existentes.

## Evidência de fontes e âmbito
Ver `docs/FONTES-PUBLICAS-VERIFICADAS.md`. As fontes públicas não comprovam SLAs, competências ou permissões da operação.

## Metodologia de QA
- Unitário: integridade do catálogo, estados de validação, correspondência de fontes, conteúdo de triagem.
- E2E: painel Segurança e fontes, consulta das afirmações suportadas e caso de suporte digital sem falsa impossibilidade.
- TypeScript e Vite: compilação sem falhas.
- Supply chain: npm lock version 3 gerado pelo npm, ações pinned, auditoria npm.
- GitHub Pages: CI gera e publica entrada estática; deploy manual de emergência exige confirmação.

## Riscos remanescentes
- Documentação de operação ainda não foi disponibilizada em forma autorizada e não pode ser validada por fontes públicas.
- Qualidade da voz e acessibilidade em Safari iPhone e VoiceOver exigem teste físico.
- A configuração de proteção de branch e permissões do repositório depende de ações administrativas e não faz parte de ficheiros de código.
- npm audit avalia as vulnerabilidades conhecidas presentes no registo à data; não é uma certificação de segurança total.
- Retenção de apenas uma geração anterior de assets pode afetar visitantes que mantêm uma versão HTML ainda mais antiga em cache.
- A arquitetura atual continua a publicar assets na branch `main`; migrar para deploy apenas por artefactos exige rever GitHub Pages Settings e é tarefa futura.

## Critério para integração
Só integrar após os workflows TypeScript/testes/build e navegador em desktop/móvel terem concluído com sucesso. Confirmar publicação do GitHub Pages e ligação pública após merge.

## Registo de decisões
Ver `docs/DECISIONS.md`, incluindo a separação de factos públicos e regras internas, a nova política de CI e a manutenção temporária do mecanismo de publicação existente.

## Resultado efetivo da integração em 19/10/2026
- **PR:** https://github.com/AllyssonEstadulho92/call-center-pro/pull/6 — integrado na branch `main`.
- **Qualidade:** 34 testes unitários aprovados; compilação TypeScript/Vite e navegação Chromium desktop e móvel aprovadas.
- **Dependências:** npm reportou inicialmente 2 falhas críticas em `tinypool` e 1 moderada em `@vitest/mocker`, via Vitest 3.x. Após atualização do Vitest para 5.0.5 e do lockfile, a auditoria npm reportou 0 vulnerabilidades conhecidas na data.
- **Site:** nova compilação publicada no GitHub Pages e `index.html` com caminho compilado verificado.
- **Limites:** não foi testado Safari/VoiceOver em dispositivo real e não existe validação documental institucional dos 17 guiões.
