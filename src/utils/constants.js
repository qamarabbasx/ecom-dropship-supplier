export const ADD_PRODUCT_PAYLOAD = {
  name: "",
  category: "",
  price: 0,
  MSRP: 0,
  description: "",
  badge: "",
  vendor: "",
  stock_status: "",
  type: "",
  sku: "",
  meta: {
    totalSales: null,
    GMV: null,
    totalInfluencers: null,
    totalComments: null,
    totalVideos: null,
  },
  images: [],
  options: [],
  variants: [],
};

export const STOCK_STATUS = {
  IN_STOCK: "In Stock",
  OUT_OF_STOCK: "Out Of Stock",
  BACK_ORDER: "Back Order",
};
