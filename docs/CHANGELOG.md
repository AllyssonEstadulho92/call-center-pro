## 2026-10-18 | 1.7.0

- Criadas páginas separadas de manuais para Coca-Cola e Burger King.
- Conteúdo por fases, índice de capítulos, apresentação passo a passo ou integral, consulta de fontes e leitura por voz.
- Reutilizada a base única de guiões para evitar divergências.
- Nenhuma regra interna foi considerada validada sem documentação institucional.
- Mantida a proibição de guardar dados pessoais do cliente.

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
