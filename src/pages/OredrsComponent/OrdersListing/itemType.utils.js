export const itemTypeLabels = {
  BEST_SELLING: "Best Selling",
  REQUESTED: "Requested",
  PRIVATE_SOURCE: "Private Sourcing",
  THIRD_PARTY: "Third Party",
};

export const formatItemType = (value) => {
  if (!value) return "-";
  const key = String(value).toUpperCase();
  if (itemTypeLabels[key]) return itemTypeLabels[key];
  // Fallback: convert ENUM-like strings to Title Case
  return key
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
};