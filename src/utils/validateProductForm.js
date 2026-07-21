const REQUIRED_ADD_PRODUCT_FIELDS = [
  { key: "name", label: "Product Title", isValid: (value) => Boolean(value?.trim()) },
  {
    key: "category",
    label: "Product Category",
    isValid: (value) => Boolean(String(value ?? "").trim()),
  },
  {
    key: "description",
    label: "Product Description",
    isValid: (value) => Boolean(value?.trim()),
  },
  { key: "type", label: "Product Type", isValid: (value) => Boolean(value?.trim()) },
  {
    key: "price",
    label: "Product Price",
    isValid: (value) =>
      value !== "" && value !== null && value !== undefined && !Number.isNaN(Number(value)),
  },
  {
    key: "MSRP",
    label: "MSRP",
    isValid: (value) =>
      value !== "" && value !== null && value !== undefined && !Number.isNaN(Number(value)),
  },
  { key: "badge", label: "Product Badge", isValid: (value) => Boolean(value?.trim()) },
  { key: "sku", label: "Product SKU", isValid: (value) => Boolean(value?.trim()) },
  {
    key: "stock_status",
    label: "Stock Status",
    isValid: (value) => Boolean(value?.trim()),
  },
];

export const hasProductVariants = (payload) =>
  Array.isArray(payload?.variants) && payload.variants.length > 0;

export const calculateVariantStockTotal = (variants = []) =>
  variants.reduce((sum, variant) => sum + (Number(variant.totalStock) || 0), 0);

const isValidStockValue = (value) =>
  value !== "" &&
  value !== null &&
  value !== undefined &&
  !Number.isNaN(Number(value)) &&
  Number(value) >= 0 &&
  Number.isInteger(Number(value));

export const getFieldErrorMessage = (label) => `${label} is required`;

export const validateAddProductFields = (payload) => {
  const missingFields = REQUIRED_ADD_PRODUCT_FIELDS.filter(
    ({ key, isValid }) => !isValid(payload[key])
  );

  if (!hasProductVariants(payload) && !isValidStockValue(payload.totalStock)) {
    missingFields.push({
      key: "totalStock",
      label: "Stock",
    });
  }

  if (missingFields.length === 0) {
    return { isValid: true, missingFields: [] };
  }

  return {
    isValid: false,
    missingFields: missingFields.map(({ key, label }) => ({
      key,
      label,
      message: getFieldErrorMessage(label),
    })),
  };
};

export const resolveProductStock = (payload) => {
  if (hasProductVariants(payload)) {
    return calculateVariantStockTotal(payload.variants);
  }

  if (payload.totalStock === "" || payload.totalStock == null) {
    return 0;
  }

  return parseInt(payload.totalStock, 10);
};
