import html2pdf from 'html2pdf.js';

declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    pagebreak?: {
      mode?: string | string[];
      before?: string | string[];
      after?: string | string[];
      avoid?: string | string[];
    };
  }
}

export async function exportToPDF(filename: string = 'resume.pdf'): Promise<void> {
  const element = document.getElementById('resume-preview');
  if (!element) return;

  const captureHeight = Math.floor(element.offsetWidth * 297 / 210);

  const opt = {
    margin: 0,
    filename,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      scrollX: 0,
      scrollY: 0,
      height: captureHeight,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait' as const,
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  await html2pdf().set(opt).from(element).save();
}
