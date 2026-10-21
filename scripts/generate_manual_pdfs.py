#!/usr/bin/env python3
"""Gerar dois PDFs A4 de consulta a partir da mesma base TS da aplicação.

Sem extração de dados de clientes, documentos privados, rede ou texto operacional inventado.
Utilização: python scripts/generate_manual_pdfs.py .tmp/manual-data.json manuais/
"""
import json
import sys
from datetime import date
from html import escape
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Frame, KeepTogether, PageBreak, PageTemplate, Paragraph,
    Spacer, Table, TableStyle,
)
from reportlab.platypus.tableofcontents import TableOfContents


def register_fonts():
    root = Path('/usr/share/fonts/truetype/dejavu')
    if not (root / 'DejaVuSans.ttf').exists():
        raise RuntimeError('Fonte DejaVu Sans não instalada; parar para evitar glifos inválidos.')
    pdfmetrics.registerFont(TTFont('DV', str(root / 'DejaVuSans.ttf')))
    pdfmetrics.registerFont(TTFont('DVB', str(root / 'DejaVuSans-Bold.ttf')))
    pdfmetrics.registerFontFamily('DV', normal='DV', bold='DVB', italic='DV', boldItalic='DVB')


def text(value):
    return escape(str(value or '')).replace('\n', '<br/>')


class ManualTemplate(BaseDocTemplate):
    def __init__(self, filename, accent, version):
        super().__init__(str(filename), pagesize=A4, leftMargin=18*mm,
                         rightMargin=18*mm, topMargin=19*mm,
                         bottomMargin=18*mm, title='Call Center Pro - Manual de treino',
                         author='Call Center Pro')
        self.accent = accent
        self.version = version
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height,
                      leftPadding=0, bottomPadding=0, rightPadding=0, topPadding=0)
        self.addPageTemplates(PageTemplate(id='normal', frames=frame, onPage=self.decorate))

    def decorate(self, canvas, doc):
        canvas.saveState()
        w, h = A4
        canvas.setFillColor(self.accent)
        canvas.rect(0, h - 9*mm, w, 9*mm, stroke=0, fill=1)
        canvas.setFont('DVB', 8)
        canvas.setFillColor(colors.HexColor('#62748A'))
        canvas.drawString(18*mm, 12*mm, 'CALL CENTER PRO · MATERIAL DE TREINO, NÃO OFICIAL')
        canvas.drawRightString(w - 18*mm, 12*mm, 'v' + self.version + '   |   Página ' + str(doc.page))
        canvas.restoreState()

    def afterFlowable(self, flowable):
        if isinstance(flowable, Paragraph) and hasattr(flowable, '_outline'):
            level, key, label = flowable._outline
            self.canv.bookmarkPage(key)
            self.canv.addOutlineEntry(label, key, level=level, closed=False)
            self.notify('TOCEntry', (level, label, self.page, key))


def build_styles(accent):
    ss = getSampleStyleSheet()
    ordinary = colors.HexColor('#233750')
    subtle = colors.HexColor('#50657A')
    return {
        'cover': ParagraphStyle('CoverCustom', fontName='DVB', fontSize=27, leading=34,
                                textColor=accent, alignment=TA_LEFT, spaceAfter=18),
        'lead': ParagraphStyle('LeadCustom', fontName='DV', fontSize=11, leading=17,
                               textColor=ordinary, spaceAfter=9),
        'h1': ParagraphStyle('HeadingOneCustom', fontName='DVB', fontSize=16, leading=22,
                             textColor=accent, spaceBefore=16, spaceAfter=10, keepWithNext=True),
        'h2': ParagraphStyle('HeadingTwoCustom', fontName='DVB', fontSize=11.4, leading=16,
                             textColor=ordinary, spaceBefore=11, spaceAfter=6, keepWithNext=True),
        'body': ParagraphStyle('BodyCustom', fontName='DV', fontSize=9.3, leading=14,
                               textColor=ordinary, spaceAfter=8),
        'small': ParagraphStyle('SmallCustom', fontName='DV', fontSize=8.2, leading=12.5,
                                textColor=subtle, spaceAfter=7),
        'say': ParagraphStyle('SayCustom', fontName='DVB', fontSize=9.6, leading=15,
                              textColor=ordinary),
        'toc': ParagraphStyle('TOCCustom', fontName='DV', fontSize=9.1, leading=15,
                              textColor=ordinary, leftIndent=10, firstLineIndent=-6),
        'tag': ParagraphStyle('TagCustom', fontName='DVB', fontSize=8, leading=12,
                              textColor=accent, spaceAfter=7),
    }


def quote_table(phrase, styles, accent):
    p = Paragraph('“' + text(phrase) + '”', styles['say'])
    tbl = Table([[p]], colWidths=[173*mm], hAlign='LEFT')
    tbl.setStyle(TableStyle([
        ('BACKGROUND', (0,0),(-1,-1),colors.HexColor('#F3F7FC')),
        ('LINEBEFORE',(0,0),(0,-1),3,accent),
        ('LEFTPADDING',(0,0),(-1,-1),12),
        ('RIGHTPADDING',(0,0),(-1,-1),12),
        ('TOPPADDING',(0,0),(-1,-1),9),
        ('BOTTOMPADDING',(0,0),(-1,-1),9),
    ]))
    return tbl


def append_heading(story, label, style, level, index):
    para = Paragraph(text(label), style)
    para._outline = (level, 'topic-' + str(index), label)
    story.append(para)


def p(story, value, style):
    story.append(Paragraph(text(value), style))


def build_pdf(src, project, outdir):
    guide = src['manualGuides'][project]
    scripts = [x for x in src['procedures'] if x['project'] == project]
    replies = src['callSafetyPhrases'][project]
    accent = colors.HexColor('#C42839' if project == 'coca-cola' else '#C66B21')
    styles = build_styles(accent)
    out = outdir / ('manual-' + project + '.pdf')
    doc = ManualTemplate(out, accent, '1.9.6')
    story = []
    story.append(Spacer(1, 26*mm))
    p(story, 'CALL CENTER PRO', styles['tag'])
    p(story, guide['title'], styles['cover'])
    p(story, guide['subtitle'], styles['lead'])
    p(story, 'GUIA DE ESTUDO E CONSULTA · ' + str(len(scripts)) + ' GUIÕES', styles['tag'])
    p(story, 'Conteúdo derivado da base de treino da aplicação Call Center Pro, versão 1.9.6. '
             'Inclui frases para dizer ao cliente, pontos a confirmar e situações a evitar. '
             'Os procedimentos da operação não foram institucionalmente validados.', styles['lead'])
    p(story, 'Este documento não permite confirmar avarias, encomendas, reembolsos, visitas, '
             'prazos ou competências da linha. Verifica sempre o sistema e os manuais autorizados. '
             'Não escrevas NIF, moradas, nomes ou informações reais de clientes neste PDF.', styles['body'])
    p(story, 'Data de edição: 21/10/2026. Apenas para formação e referência pessoal.', styles['small'])
    story.append(PageBreak())

    append_heading(story, 'Índice de consulta', styles['h1'], 0, 0)
    toc = TableOfContents()
    toc.levelStyles = [styles['toc'], ParagraphStyle('TOC2', parent=styles['toc'], leftIndent=22)]
    story.append(toc)
    story.append(Spacer(1, 10*mm))
    p(story, 'Como consultar: procura o assunto no índice, identifica o objetivo, '
             'lê apenas a frase «O QUE DIZER» ao cliente e usa «CONFIRMAR» / «EVITAR» '
             'para a tua verificação interna.', styles['body'])
    story.append(PageBreak())

    append_heading(story, '1. Como utilizar este manual', styles['h1'], 0, 1)
    p(story, guide['introduction'], styles['body'])
    p(story, 'Abertura sugerida:', styles['h2'])
    story.append(quote_table(guide['opening'], styles, accent))
    p(story, 'No início da chamada, adapta «bom dia» ou «boa tarde» à situação. '
             'As frases apresentadas são exemplos de formação, não um procedimento obrigatório.', styles['small'])
    for phase in guide['phases']:
        p(story, phase['title'], styles['h2'])
        p(story, phase['guidance'], styles['body'])
        p(story, 'ATENÇÃO: ' + phase['notice'], styles['small'])

    append_heading(story, '2. Princípios essenciais', styles['h1'], 0, 2)
    for rule in guide['principles']:
        p(story, '•  ' + rule, styles['body'])

    append_heading(story, '3. Respostas rápidas perante dúvidas', styles['h1'], 0, 3)
    p(story, 'Estas frases são exemplos de comunicação prudente. Não implicam que o assunto '
             'tenha sido resolvido ou encaminhado.', styles['body'])
    for reply in replies:
        p(story, reply['question'], styles['h2'])
        story.append(quote_table(reply['say'], styles, accent))
        p(story, 'CONFIRMAR: ' + reply['verify'], styles['small'])

    append_heading(story, '4. Guiões por assunto', styles['h1'], 0, 4)
    p(story, 'Os capítulos seguintes reproduzem os passos existentes na base de apoio. '
             'Não substituir pelos procedimentos internos sem revisão e aprovação formal.', styles['body'])
    for ix, procedure in enumerate(scripts, 1):
        story.append(PageBreak())
        append_heading(story, '4.' + str(ix) + '  ' + procedure['title'], styles['h1'], 0, 100 + ix)
        p(story, procedure['category'] + '  ·  ' + procedure['summary'], styles['body'])
        p(story, 'ESTADO: ' + ('Exemplo de treino' if procedure['status'] == 'exemplo' else 'Por confirmar na operação'),
          styles['tag'])
        for idx, step in enumerate(procedure['steps'], 1):
            phrase = step['say']
            hd = Paragraph('ETAPA ' + str(idx) + '  ·  ' + text(step['title']), styles['h2'])
            story.append(KeepTogether([hd, quote_table(phrase, styles, accent)]))
            p(story, 'CONFIRMAR: ' + step['verify'], styles['body'])
            p(story, 'EVITAR: ' + step['avoid'], styles['body'])
            if step.get('note'):
                p(story, 'NOTA DE TREINO: ' + step['note'], styles['small'])
            choice = src['closingOptions'].get(procedure['id'], [None] * len(procedure['steps']))[idx - 1]
            if choice:
                p(story, 'Se o sistema efetivamente confirmou:', styles['small'])
                story.append(quote_table(choice['confirmed'], styles, accent))
                p(story, 'Se ainda não existe confirmação:', styles['small'])
                story.append(quote_table(choice['pending'], styles, accent))
                p(story, 'Estas alternativas exigem uma verificação feita por ti no sistema autorizado. '
                         'A aplicação não confirma qualquer estado.', styles['small'])
        p(story, 'ORIGEM: ' + procedure.get('source', 'Não documentada'), styles['small'])
        p(story, 'Validação institucional: não efetuada.', styles['small'])

    story.append(PageBreak())
    append_heading(story, '5. Dúvidas frequentes do manual', styles['h1'], 0, 5)
    for faq in guide['frequentlyAsked']:
        p(story, faq['question'], styles['h2'])
        p(story, faq['response'], styles['body'])
        p(story, 'Origem: ' + ('informação de fonte pública' if faq['status']=='informacao-publica' else 'formulação de treino'), styles['small'])

    append_heading(story, '6. Fontes e limites', styles['h1'], 0, 6)
    p(story, 'As páginas oficiais suportam apenas a informação pública nelas publicada. '
             'Não confirmam procedimentos internos, competências do operador nem SLAs.', styles['body'])
    source_ids = set(guide['factIds'])
    if project == 'burger-king':
        source_ids.update(('reclamacoes','reclamacoes-asae'))
    for source in src['publicSources']:
        if source['id'] not in source_ids:
            continue
        p(story, source['title'] + ' — ' + source['publisher'], styles['h2'])
        p(story, source['scope'], styles['body'])
        p(story, 'LIMITAÇÃO: ' + source['limitation'], styles['small'])
        p(story, source['url'], styles['small'])
        p(story, 'Consulta registada no projeto: ' + source['confirmed'], styles['small'])
    p(story, 'ATUALIZAÇÃO: este PDF é uma cópia estática. Confirma na aplicação '
             'se existe uma versão mais recente antes de o utilizares para estudo.', styles['body'])
    doc.multiBuild(story)
    if out.stat().st_size < 10000 or out.read_bytes()[:5] != b'%PDF-':
        raise RuntimeError('PDF inválido ou demasiado pequeno: ' + str(out))
    return out


def main():
    if len(sys.argv) != 3:
        raise SystemExit('Uso: generate_manual_pdfs.py JSON DIRETÓRIO')
    register_fonts()
    src = json.loads(Path(sys.argv[1]).read_text(encoding='utf-8'))
    if len(src.get('procedures', [])) != 17:
        raise ValueError('Catálogo diferente de 17 guiões; não publicar PDF incompleto.')
    outdir = Path(sys.argv[2])
    outdir.mkdir(parents=True, exist_ok=True)
    for project in ('coca-cola', 'burger-king'):
        result = build_pdf(src, project, outdir)
        print('PDF verificado:', result, result.stat().st_size, 'bytes')


if __name__ == '__main__':
    main()
