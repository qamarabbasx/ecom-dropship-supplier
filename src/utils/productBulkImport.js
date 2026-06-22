const escapeCsvCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

export function downloadCsv(filename, headers, rows) {
  const lines = [
    headers.map(escapeCsvCell).join(","),
    ...rows.map((row) => row.map(escapeCsvCell).join(",")),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const BULK_IMPORT_SAMPLE_URL =
  "/samples/ecomdropship_product_template.xlsx";

export const PRODUCT_BADGE_OPTIONS = [
  { value: "BEST_SELLER", label: "Best Seller" },
  { value: "TRENDING", label: "Trending" },
  { value: "NEW_ARRIVAL", label: "New Arrival" },
  { value: "LIMITED_STOCK", label: "Limited Stock" },
  { value: "HIGH_MARGIN", label: "High Margin" },
  { value: "TIKTOK_VIRAL", label: "TikTok Viral" },
];

export const LEGACY_BADGE_LABELS = {
  SOLD: "Sold",
  NEW: "New",
  INCOMMING: "Incomming",
  TICK_TOK_VERIFIED: "TikTok Verified",
};

export function getBadgeLabel(value) {
  const match = PRODUCT_BADGE_OPTIONS.find((opt) => opt.value === value);
  if (match) return match.label;
  return LEGACY_BADGE_LABELS[value] || value;
}
