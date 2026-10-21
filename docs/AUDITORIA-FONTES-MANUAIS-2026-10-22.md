# Auditoria de fontes e aprofundamento dos manuais - 22/10/2026

## Objetivo
Aprofundar os dois manuais independentes, explicar cada um dos 17 assuntos e distinguir afirmações verificadas em entidades oficiais de exemplos editoriais de atendimento e procedimentos internos ainda não aprovados.

## Material verificado
1. Coca-Cola Portugal, contactos públicos: https://www.coca-cola.com/pt/pt/about-us/contact-us — documenta contacto de consumidores e remissão para a Coca-Cola Europacific Partners em assuntos comerciais. Não documenta critérios de SAP nem prazos de assistência.
2. Coca-Cola Portugal, FAQ: https://www.coca-cola.com/pt/pt/about-us/faq — conteúdo público de consumidores e aplicação; sem manuais técnicos da operação.
3. Burger King Portugal, suporte: https://www.burgerking.pt/support — categorias públicas de assistência de entrega, recolha, restaurante, informação e sugestões; não documenta permissões da linha telefónica.
4. ASAE, Livro de Reclamações: https://www.asae.gov.pt/reclamacoes-e-denuncias/livro-de-reclamacoes.aspx — formato físico e eletrónico e equivalência geral da reclamação apresentada em ambos, nos casos abrangidos; não descreve workflow de reclamação interno às marcas.
5. União Europeia, EUR-Lex, RGPD artigo 5.º: https://eur-lex.europa.eu/eli/reg/2016/679/pt — minimização dos dados pessoais, sem determinar os campos técnicos de um atendimento.

Fontes consultadas em 22/10/2026. Devem ser revistas se o conteúdo oficial mudar.

## Implementação
- Acrescentado `src/data/verifiedManualGuidance.ts`, que mantém uma coleção pequena e auditável de factos públicos com `sourceId` e limite expresso; os títulos e as explicações distinguem a fonte da interpretação editorial.
- Produzidas 17 fichas aprofundadas, uma por assunto, contendo: significado, três perguntas de diagnóstico não técnico/triagem, como proceder, o que verificar no sistema autorizado e o que nunca presumir.
- `ManualHub.tsx` apresenta primeiro os factos com fonte e limite e, em cada capítulo, a orientação pormenorizada explicitamente classificada como formação.
- `publicSources.ts` inclui EUR-Lex RGPD e datas de consulta atualizadas; `manuals.ts` referencia as fontes em ambos os projetos.
- O exportador `scripts/export-manual-data.mjs` e o gerador Python dos PDFs leem a mesma base. A geração falha se faltar qualquer ficha.
- Os dois PDFs continuam no site público nos mesmos endereços `manuais/manual-coca-cola.pdf` e `manuais/manual-burger-king.pdf`; o workflow GitHub Pages atualiza-os após compilação.

## Lacunas assumidas - sem inventar regras
- Códigos de sintomas, classificações e transações SAP, RF/CC obrigatório, regimes regionais PT32/PT60/PT70, procedimentos de clientes bloqueados, turnos de piquete, SLAs, intervenções técnicas e critérios de emergência da operação Coca-Cola.
- Autorizações de reembolso, alterações/cancelamentos de encomenda, consultas disponíveis por canal, pagamentos, sistema operacional, prazos e responsabilidade de resolução no Burger King.
- Não existem manuais operacionais institucionais com versão, responsável e âmbito comprovados no projeto. A informação pública não permite confirmar essas rotinas.
- Não inserir dados de clientes, gravações reais, documentos internos, credenciais ou informações restritas em site e repositório públicos.

## Controlos
- Testes unitários cobrem todas as 17 fichas, presença de fontes e ausência de validação institucional.
- Testes Playwright verificam guia aprofundado e referências em ambos os manuais. A execução final teve 97 aprovados e 3 ignorados (sem falhas).
- CI aprovou TypeScript, 46 testes Vitest, Vite, npm audit sem vulnerabilidades reportadas e geração de dois PDFs assinados; PDFs Coca-Cola 110 224 bytes, Burger King 100 819 bytes.
- Regressões 320px, WebKit emulado e Safari físico: verificar em CI e no equipamento real, respetivamente.

## Estado final da publicação
- PR #28 integrada com revisão das fontes e 17 explicações de apoio. Build GitHub Pages e deploy da v1.9.7 concluídos com sucesso.
- Navegação, manuais online e geração dos PDFs passaram na CI. O primeiro teste Playwright foi repetido por erro de certificado TLS num fornecedor de browsers; na repetição, 97 testes passaram e 3 foram ignorados.
- A assinatura e integridade geral dos PDFs foram verificadas automaticamente; a renderização visual integral e testes no iPhone Safari/VoiceOver continuam por verificar. Não declarar os guiões como procedimentos oficiais da empresa.
