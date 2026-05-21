/**
 * PDF export palette aligned with ECOM apps (primary #ff7a45, slate text, light surfaces).
 */
export const pdfBrand = {
  primary: [255, 122, 69],
  primarySoft: [255, 245, 240],
  text: [17, 24, 39],
  textMuted: [107, 119, 140],
  border: [237, 240, 246],
  rowAlt: [248, 250, 252],
  white: [255, 255, 255],
};

export const pdfAutoTableBase = {
  theme: "plain",
  headStyles: {
    fillColor: pdfBrand.primary,
    textColor: pdfBrand.white,
    fontStyle: "bold",
    lineColor: pdfBrand.border,
    lineWidth: 0.1,
  },
  styles: {
    fontSize: 8,
    cellPadding: 4,
    textColor: pdfBrand.text,
    lineColor: pdfBrand.border,
    lineWidth: 0.1,
  },
  alternateRowStyles: {
    fillColor: pdfBrand.rowAlt,
  },
  bodyStyles: {
    fillColor: pdfBrand.white,
  },
};

/**
 * Embeds logo; returns horizontal space used (width + gap) for laying out title, or 0 on failure.
 */
export function addPdfLogo(doc, logoSrc, x, y, options = {}) {
  if (!logoSrc) return 0;
  const w = options.width ?? 26;
  const h = options.height ?? 9;
  const gapAfter = options.gapAfter ?? 4;
  for (const fmt of [options.format, "PNG", "JPEG"].filter(Boolean)) {
    if (!fmt) continue;
    try {
      doc.addImage(logoSrc, fmt, x, y, w, h);
      return w + gapAfter;
    } catch {
      /* try next */
    }
  }
  return 0;
}

/**
 * Top band + optional logo + title + subtitle. Returns Y (mm) for the first meta line below the band.
 */
export function drawExportReportHeader(doc, options = {}) {
  const {
    title,
    subtitle = "ECOM",
    logoSrc,
    margin = 14,
    bandHeight = 28,
  } = options;
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.setFillColor(...pdfBrand.primarySoft);
  doc.rect(0, 0, pageWidth, bandHeight, "F");

  const logoY = Math.max(2, (bandHeight - 9) / 2);
  const titleX = margin + (logoSrc ? addPdfLogo(doc, logoSrc, margin, logoY) : 0);

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...pdfBrand.primary);
  doc.text(title, titleX, 16);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...pdfBrand.textMuted);
  doc.text(subtitle, titleX, 22);

  return bandHeight + 12;
}

/** Logo + title row for portrait A4 in points (admin invoice). */
export function drawExportReportHeaderPt(doc, options = {}) {
  const {
    title,
    subtitle = "ECOM",
    logoSrc,
    margin = 60,
    bandHeight = 52,
  } = options;
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.setFillColor(...pdfBrand.primarySoft);
  doc.rect(0, 0, pageWidth, bandHeight, "F");

  const logoW = 70;
  const logoH = 24;
  const logoY = (bandHeight - logoH) / 2;
  let titleX = margin;
  if (logoSrc) {
    const used = addPdfLogo(doc, logoSrc, margin, logoY, {
      width: logoW,
      height: logoH,
      gapAfter: 16,
    });
    if (used) titleX = margin + used;
  }

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...pdfBrand.primary);
  doc.text(title, titleX, bandHeight / 2 - 2);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...pdfBrand.textMuted);
  doc.text(subtitle, titleX, bandHeight / 2 + 10);

  return bandHeight + 18;
}
