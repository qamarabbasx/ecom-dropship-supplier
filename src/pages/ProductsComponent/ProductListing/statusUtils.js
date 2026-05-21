export const STATUS_MAP = {
  IN_STOCK: { text: "In Stock", bg: "#E6FFF0", color: "#2E8A3A" },
  LOW_STOCK: { text: "Low Stock", bg: "#FFF3E6", color: "#D46B08" },
  OUT_OF_STOCK: { text: "Out Of Stock", bg: "#FFF0F0", color: "#C0392B" },
  DRAFT: { text: "Draft", bg: "#F5F5F5", color: "#8C8C8C" },
  BACK_ORDER: { text: "Back Order", bg: "#FFF7E6", color: "#D48806" },
};

export function getStatusInfo(stock_status, record = {}) {
  const mapped = STATUS_MAP[stock_status];
  if (mapped) {
    return {
      text: mapped.text,
      style: {
        display: "inline-block",
        padding: "6px 12px",
        borderRadius: 12,
        fontWeight: 600,
        fontSize: 12,
        background: mapped.bg,
        color: mapped.color,
      },
    };
  }

  // Fallback to badge or raw status
  const fallbackText = record.badge || stock_status || "-";
  return {
    text: fallbackText,
    style: {
      display: "inline-block",
      padding: "6px 12px",
      borderRadius: 12,
      fontWeight: 600,
      fontSize: 12,
      background: "#F5F5F5",
      color: "#8C8C8C",
    },
  };
}

export default getStatusInfo;
