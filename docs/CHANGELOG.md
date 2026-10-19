## 2026-10-18 | 1.7.0

- Criadas páginas separadas de manuais para Coca-Cola e Burger King.
- Conteúdo por fases, índice de capítulos, apresentação passo a passo ou integral, consulta de fontes e leitura por voz.
- Reutilizada a base única de guiões para evitar divergências.
- Nenhuma regra interna foi considerada validada sem documentação institucional.
- Mantida a proibição de guardar dados pessoais do cliente.
- PR #3 integrado. TypeScript, Vitest, compilação Vite, testes Playwright em Chromium desktop/móvel e deploy GitHub Pages confirmados com sucesso. Teste real Safari ainda pendente.

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


## 19-10-2026 | Proposta v1.8.0
- Interface dashboard redesenhada e adaptativa, com recursos de marca substituídos por SVG próprios.
- Guiões, manuais e fontes em destaque; números derivados dos conteúdos existentes.
- Atendimento direto com seleção livre de assuntos, verificação, cópia e voz controlável.
- Leitor de voz atualizado com vozes portuguesas disponíveis, ritmo, pausa, repetir e parar.
- PR #4 com testes TypeScript, Vitest e Playwright; validação final e deploy a registar após execução.

