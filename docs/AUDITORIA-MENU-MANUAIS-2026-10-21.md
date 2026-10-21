# Auditoria de navegação e manuais | Call Center Pro | 21/10/2026

## Objetivo e evidência
O utilizador forneceu captura do menu no iPhone e pediu apenas cinco acessos primários: Início, Coca-Cola, Burger King, Manual Coca-Cola e Manual Burger King. Pediu ainda os dois manuais em PDFs separados, para estudo e consulta, mantendo ferramentas úteis sem excesso de informação visual.

Foi comparada a versão v1.9.5 com o código real (React + TypeScript + Vite), a base única `src/data/knowledge.ts`, os guias editoriais `src/data/manuals.ts`, as respostas `src/data/callSafetyPhrases.ts` e o workflow de publicação GitHub Pages.

## Achados
1. **Menu demasiado extenso:** havia 14 acessos na navegação lateral e quatro no rodapé móvel; a pesquisa e recursos de treino competiam com os cinco escolhidos.
2. **Não eliminar funcionalidades válidas:** pesquisa, favoritos, triagem, FAQ, simulações, formação, fontes e histórico devem permanecer recuperáveis.
3. **Documentação apenas online:** os dois manuais eram consultáveis por capítulo na aplicação, sem PDF para guardar.
4. **Risco de divergência editorial:** PDFs copiados e mantidos à mão poderiam afastar-se dos 17 guiões ativos.
5. **Risco de interpretação:** os guiões não possuem validação institucional. Um PDF disponível para download não é um manual interno oficial.
6. **Compatibilidade:** ecrãs a partir de 320 px, foco do Safari, navegação com teclado e zoom voluntário não devem regredir.

## Solução implementada em revisão
- Cinco itens primários no menu lateral e cinco atalhos móveis correspondentes (títulos abreviados «Manual CC» e «Manual BK» no rodapé).
- Pesquisa preservada no cabeçalho e nos acessos secundários.
- Recursos secundários reunidos em painel `details` na página inicial, inicialmente fechado, com nove acessos e cartões existentes preservados.
- Dois links PDF em destaque na página inicial e um link de transferência em cada manual.
- Gerador reprodutível: `scripts/export-manual-data.mjs` compila as estruturas TypeScript com `esbuild` já incluído no projeto e extrai os dados públicos; `scripts/generate_manual_pdfs.py` utiliza ReportLab (versão fixada pelo CI) para gerar PDFs A4 com índice, fases, respostas curtas, 17 guiões distribuídos por área, verificações, avisos e fontes.
- O workflow atualiza `manuais/*.pdf` na branch, juntamente com `index.html` e assets, após testes.
- Os testes de qualidade geram e validam ambos os PDFs antes de permitir a integração.

## Riscos residuais
- O gerador depende de ambiente Python e DejaVu Sans no runner GitHub. Se a geração falhar, a pipeline deve falhar antes da publicação.
- O PDF descarregado é estático; os guiões online podem mudar. É importante confirmar a versão.
- A geração reproduz textos públicos da base de estudo. Não adicionar manuais confidenciais, números privados, dados de clientes ou procedimentos não autorizados.
- A publicação não comprova aprovação institucional e não autoriza a utilização num computador de trabalho.
- Verificação no Safari/VoiceOver de iPhone físico e leitura visual dos PDFs finais continuam pendentes da execução e auditoria da release.

## Critérios de aceitação
1. Menu principal exibe apenas os cinco acessos pretendidos.
2. Nove áreas secundárias continuam acessíveis a partir do Início, e a Pesquisa do cabeçalho funciona.
3. Existem dois PDFs separados e descarregáveis com conteúdo derivado dos guiões e sem dados reais.
4. Vite, TypeScript, Vitest, npm audit, Playwright desktop/móvel/WebKit, geração de PDFs e publicação passam.
5. Navegação e layout não provocam overflow horizontal a 320 px.
