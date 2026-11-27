import type { Token, Tokens } from 'marked';

function stripInlineMarkdown(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/→/g, '->')
    .replace(/←/g, '<-')
    .replace(/≥/g, '>=')
    .replace(/≤/g, '<=')
    .replace(/×/g, 'x')
    .replace(/[✓✔]/g, '[x]')
    .replace(/[^\x20-\x7E\xA0-\xFF\u2013\u2014\u2018\u2019\u201C\u201D\u2022\u20AC\n]/g, '')
    .trim();
}

async function waitForLayoutStability(doc: Document | null | undefined): Promise<void> {
  if (doc && 'fonts' in doc && doc.fonts?.ready) {
    await doc.fonts.ready.catch(() => undefined);
  }
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

export async function exportHtmlElementToPdf(
  element: HTMLElement,
  fileBaseName: string
): Promise<void> {
  const [{ jsPDF }, { default: html2canvas }] = await Promise.all([
    import('jspdf'),
    import('html2canvas'),
  ]);

  await waitForLayoutStability(element.ownerDocument);

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const safeName = fileBaseName.replace(/[^a-zA-Z0-9._-]/g, '_');

  const sections = Array.from(
    element.querySelectorAll<HTMLElement>(
      'section.cover, section.page, div.cover, div.page, div.sheet, section.sheet'
    )
  );

  if (sections.length > 0) {
    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      if (i > 0) pdf.addPage();
      const isCover = sec.classList.contains('cover');
      const canvas = await html2canvas(sec, {
        scale: 2,
        useCORS: true,
        backgroundColor: isCover ? '#10253f' : '#ffffff',
        windowWidth: 900,
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const margin = isCover ? 0 : 10;
      const availW = pageWidth - margin * 2;
      const availH = pageHeight - margin * 2;
      let drawW = availW;
      let drawH = (canvas.height * drawW) / canvas.width;
      if (drawH > availH) {
        drawH = availH;
        drawW = (canvas.width * drawH) / canvas.height;
      }
      const offsetX = (pageWidth - drawW) / 2;
      const offsetY = isCover ? 0 : margin;
      pdf.addImage(imgData, 'JPEG', offsetX, offsetY, drawW, drawH);
      canvas.width = 0;
      canvas.height = 0;
    }
    pdf.save(`${safeName}.pdf`);
    return;
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    windowWidth: Math.max(element.scrollWidth, 860),
  });

  const margin = 10;
  const printableWidth = pageWidth - margin * 2;
  const printableHeight = pageHeight - margin * 2;
  const pageSliceHeightPx = Math.max(1, Math.floor((canvas.width * printableHeight) / printableWidth));

  for (let yPx = 0; yPx < canvas.height; yPx += pageSliceHeightPx) {
    const sliceH = Math.min(pageSliceHeightPx, canvas.height - yPx);
    if (yPx > 0) pdf.addPage();

    const sliceCanvas = document.createElement('canvas');
    sliceCanvas.width = canvas.width;
    sliceCanvas.height = sliceH;
    const ctx = sliceCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
      ctx.drawImage(canvas, 0, yPx, canvas.width, sliceH, 0, 0, canvas.width, sliceH);
    }

    const sliceImgData = sliceCanvas.toDataURL('image/jpeg', 0.94);
    const sliceDrawH = (sliceH * printableWidth) / canvas.width;
    pdf.addImage(sliceImgData, 'JPEG', margin, margin, printableWidth, sliceDrawH);
    sliceCanvas.width = 0;
    sliceCanvas.height = 0;
  }

  canvas.width = 0;
  canvas.height = 0;
  pdf.save(`${safeName}.pdf`);
}

export async function exportHtmlStringToPdf(
  html: string,
  fileBaseName: string
): Promise<void> {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.left = '-10000px';
  iframe.style.top = '0';
  iframe.style.width = '900px';
  iframe.style.height = '1300px';
  iframe.style.border = '0';
  iframe.setAttribute('aria-hidden', 'true');
  iframe.setAttribute('sandbox', 'allow-same-origin');

  try {
    await new Promise<void>((resolve, reject) => {
      let settled = false;
      const timer = window.setTimeout(() => {
        if (!settled) {
          settled = true;
          reject(new Error('Timed out loading report for PDF export'));
        }
      }, 10000);

      iframe.onload = () => {
        if (!settled) {
          settled = true;
          window.clearTimeout(timer);
          resolve();
        }
      };
      iframe.onerror = () => {
        if (!settled) {
          settled = true;
          window.clearTimeout(timer);
          reject(new Error('Failed to load report for PDF export'));
        }
      };
      iframe.srcdoc = html;
      document.body.appendChild(iframe);
    });

    await waitForLayoutStability(iframe.contentDocument);

    const body = iframe.contentDocument?.body;
    if (!body) {
      throw new Error('Unable to access rendered report document');
    }
    await exportHtmlElementToPdf(body, fileBaseName);
  } finally {
    if (iframe.parentNode) {
      iframe.parentNode.removeChild(iframe);
    }
  }
}

export async function exportMarkdownToPdf(
  title: string,
  sourcePath: string,
  markdown: string,
  fileBaseName: string
): Promise<void> {
  const [{ jsPDF }, { marked }] = await Promise.all([import('jspdf'), import('marked')]);

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const marginX = 16;
  const maxWidth = pageWidth - marginX * 2;
  const bottomLimit = pageHeight - 18;

  let y = 18;

  const ensureSpace = (neededMm: number) => {
    if (y + neededMm > bottomLimit) {
      pdf.addPage();
      y = 18;
    }
  };

  pdf.setFillColor(16, 37, 63);
  pdf.rect(0, 0, pageWidth, 26, 'F');
  pdf.setFillColor(7, 93, 104);
  pdf.rect(0, 26, pageWidth, 1.5, 'F');

  pdf.setTextColor(72, 197, 178);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.text('CBA CONSULT  |  OPPORTUNITIES 2027', marginX, 10);

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  const titleLines = pdf.splitTextToSize(stripInlineMarkdown(title), maxWidth);
  pdf.text(titleLines[0] || 'Portfolio Brief', marginX, 18);

  pdf.setTextColor(196, 209, 223);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.text(sourcePath, marginX, 23);

  y = 35;

  const writeWrappedText = (
    text: string,
    fontSize: number,
    style: 'normal' | 'bold' | 'italic',
    color: [number, number, number],
    indent = 0,
    lineHeight = 4.6,
    spaceAfter = 2.5
  ) => {
    const clean = stripInlineMarkdown(text);
    if (!clean) return;
    pdf.setFont('helvetica', style);
    pdf.setFontSize(fontSize);
    pdf.setTextColor(color[0], color[1], color[2]);

    const lines = pdf.splitTextToSize(clean, maxWidth - indent) as string[];
    for (const line of lines) {
      ensureSpace(lineHeight);
      pdf.text(line, marginX + indent, y);
      y += lineHeight;
    }
    y += spaceAfter;
  };

  const tokens = marked.lexer(markdown);

  const renderToken = (token: Token) => {
    switch (token.type) {
      case 'heading': {
        const h = token as Tokens.Heading;
        const size = h.depth === 1 ? 14 : h.depth === 2 ? 12 : 10.5;
        const color: [number, number, number] =
          h.depth <= 2 ? [16, 37, 63] : [7, 93, 104];
        y += h.depth === 1 ? 3 : 2;
        ensureSpace(9);
        writeWrappedText(h.text, size, 'bold', color, 0, size * 0.45, 2);
        if (h.depth <= 2) {
          pdf.setDrawColor(218, 227, 233);
          pdf.setLineWidth(0.3);
          pdf.line(marginX, y - 1, pageWidth - marginX, y - 1);
          y += 2;
        }
        break;
      }
      case 'paragraph': {
        const p = token as Tokens.Paragraph;
        writeWrappedText(p.text, 9.5, 'normal', [23, 36, 58], 0, 4.6, 2.5);
        break;
      }
      case 'list': {
        const list = token as Tokens.List;
        list.items.forEach((item, idx) => {
          const prefix = list.ordered ? `${idx + 1}. ` : '• ';
          writeWrappedText(
            `${prefix}${item.text}`,
            9.2,
            'normal',
            [23, 36, 58],
            3,
            4.5,
            1.4
          );
        });
        y += 1.5;
        break;
      }
      case 'blockquote': {
        const bq = token as Tokens.Blockquote;
        ensureSpace(8);
        writeWrappedText(bq.text, 9, 'italic', [64, 83, 107], 4, 4.4, 2.5);
        break;
      }
      case 'code': {
        const code = token as Tokens.Code;
        writeWrappedText(code.text, 8, 'normal', [64, 83, 107], 3, 4, 2.5);
        break;
      }
      case 'table': {
        const table = token as Tokens.Table;
        const headerLine = table.header.map((c) => stripInlineMarkdown(c.text)).join('  |  ');
        ensureSpace(10);
        writeWrappedText(headerLine, 8.5, 'bold', [16, 37, 63], 0, 4.2, 1.2);
        for (const row of table.rows) {
          const rowLine = row.map((c) => stripInlineMarkdown(c.text)).join('  |  ');
          writeWrappedText(rowLine, 8.2, 'normal', [64, 83, 107], 0, 4.0, 1.2);
        }
        y += 2;
        break;
      }
      case 'hr': {
        ensureSpace(4);
        pdf.setDrawColor(218, 227, 233);
        pdf.setLineWidth(0.3);
        pdf.line(marginX, y, pageWidth - marginX, y);
        y += 4;
        break;
      }
      default:
        break;
    }
  };

  for (const token of tokens) {
    renderToken(token);
  }

  const totalPages = pdf.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    pdf.setPage(p);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(130, 145, 162);
    pdf.text('CBa Consult · Opportunities 2027', marginX, pageHeight - 9);
    pdf.text(`Page ${p} of ${totalPages}`, pageWidth - marginX, pageHeight - 9, {
      align: 'right',
    });
  }

  const safeName = fileBaseName.replace(/[^a-zA-Z0-9._-]/g, '_');
  pdf.save(`${safeName}.pdf`);
}
