import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ActionIcons } from "./styles";

export const columns = [
  {
    title: "Product",
    key: "product",
    render: (text, record) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Uncomment if you have images */}
        {/* <img
          src={record.image || img} // Use a fallback image if needed
          alt={record.name}
          style={{ width: 40, height: 40, marginRight: 10 }}
        /> */}
        <div>
          <div>{record.name || "Unnamed Product"}</div>
          <small>{record.variants?.length || 0} Variants</small>{" "}
        </div>
      </div>
    ),
  },
  {
    title: "SKU",
    dataIndex: "sku",
    key: "sku",
  },
  {
    title: "Category",
    dataIndex: "categories",
    key: "categories",
    render: (categories) => categories?.name || "N/A", // Access the correct field
  },
  {
    title: "Stock",
    dataIndex: "totalStock",
    key: "totalStock",
    sorter: true,
    render: (text, record) => {
      console.log('\n\n I am here 1 \n\n', record);
  
      // Check if variants are available
      if (record.variants && record.variants.length > 0) {
        console.log('\n\n I am here 2 \n\n', record.variants);
  
        // If variants are available, sum their totalStock
        const totalStock = record.variants.reduce((total, variant) => {
          return total + (variant.totalStock || 0); // Add stock for each variant, default to 0 if no stock is provided
        }, 0);
  
        return totalStock;
      } else {
        // If no variants, show stock as 1
        return 1;
      }
    },
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    sorter: true,
    render: (price) => `$${price?.toFixed(2)}`,
  },
  {
    title: "Status",
    dataIndex: "stock_status",
    key: "stock_status",
    render: (status) => {
      const color =
        status === "Low Stock"
          ? "#ff4d4f"
          : status === "Published"
          ? "#52c41a"
          : "#bfbfbf";
      return <span style={{ color }}>{status}</span>;
    },
  },
  {
    title: "Added",
    dataIndex: "created",
    key: "created",
    render: (date) => new Date(date).toLocaleDateString(),
  },
  // {
  //   title: "Action",
  //   key: "action",
  //   render: () => (
  //     <ActionIcons>
  //       <EyeOutlined />
  //       <EditOutlined />
  //       <DeleteOutlined />
  //     </ActionIcons>
  //   ),
  // },
];
