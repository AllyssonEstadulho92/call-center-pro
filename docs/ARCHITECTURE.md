# Arquitectura | Call Center Pro

## Tecnologias
- React + TypeScript + Vite, interface web estática.
- CSS responsivo, ícones lucide-react e testes Vitest.
- GitHub Actions para typecheck, testes, compilação e publicação.
- Sem servidor de aplicação, base de dados, autenticação ou acesso aos sistemas oficiais.

## Entrada, navegação e ecrãs
`app.html` → `src/main.tsx` → `src/App.tsx`.
A navegação atual usa estado local tipado `Page`, sem router externo.
Ecrãs: Início; Coca-Cola; Burger King; Triagem; Respostas rápidas; Perguntas frequentes; Pesquisa; Favoritos; Estudo; Simulações; Versões; Segurança e fontes.

## Componentes
- `src/components/LiveCallPanel.tsx`: guião de exemplo na página principal.
- `src/components/SpeechPlayer.tsx`: Web Speech API para leitura de frases; preferir pt-PT, senão voz portuguesa disponível, senão voz predefinida.
- `src/components/Simulations.tsx`: treino com cenários fictícios e respostas de referência da base.
- `src/components/PracticeRecorder.tsx`: captação áudio somente após permissão; MediaRecorder, Blob URL local e limpeza no fim.
- `src/components/QuickAnswers.tsx`: respostas derivadas da base única de guiões.
- `src/components/RoutingGuide.tsx`: triagem genérica com fontes públicas.
- `src/components/Training.tsx`: exercícios por escolha múltipla e correção.
- `src/components/FrequentlyAsked.tsx`: FAQs de comunicação e limites.
- `src/components/AppErrorBoundary.tsx`: fallback em erro de rendering.

## Dados e validação
`src/data/knowledge.ts` contém guiões e perguntas, tipados em `src/types.ts`.
`src/data/publicSources.ts` contém URL, âmbito, limitações e data de consulta.
`src/lib/search.ts`, `quickAnswers.ts`, `routing.ts` e `greeting.ts` contêm operações de domínio testáveis.
Estatuto dos guiões: «Exemplo», «Por confirmar» ou «Validado»; neste momento nenhum guião está validado institucionalmente.

## Estado e armazenamento
Fluxo e passos da chamada: memória React (sem persistência).
Favoritos: localStorage apenas com IDs de guiões.
Tema: localStorage apenas `dark`/`light`.
Treino e respostas: estado efémero no browser.
Áudio: MediaRecorder → Blob e URL temporário → elemento HTML audio; nenhuma API de envio; URL revogado e microfone desligado na desmontagem.
Síntese de voz: fala o texto selecionado via mecanismo do browser; não recolhe áudio.

## Segurança e publicação
GitHub Pages serve conteúdo estático público; não usar para scripts internos confidenciais, nomes reais, NIF, moradas, tokens, gravações de clientes, ou logos sem licença/autorização.
A página inicial pública é o `index.html` compilado; o `app.html` é a entrada de desenvolvimento. O workflow `build-static-site.yml` gera os `assets` e publica-os na branch. Este mecanismo preserva o historial, mas merece migrar para deploy Pages via artefacto num projeto posterior.

## Acessibilidade
Foco visível, contraste, navegação por teclado, controlos com nomes acessíveis, e estilos responsivos; a validação manual WCAG 2.2 e VoiceOver continua pendente.
