
import getStatusInfo from "./statusUtils";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export const getColumns = ({ onView, onEdit, onDelete } = {}) => [
  //----------------------------------
  // ✅ PRODUCT (Image + Title + Variants)
  //----------------------------------
  {
    title: "Product",
    dataIndex: "name",
    key: "product",
    width: 250,
    sorter: (a, b) => String(a.name || "").localeCompare(String(b.name || "")),
    sortDirections: ["ascend", "descend"],
    render: (text, record) => {
      const imageUrl = record.images?.[0]?.url;

      return (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={record.name}
              style={{
                width: 50,
                height: 50,
                borderRadius: 8,
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: 50,
                height: 50,
                background: "#f5f5f5",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#888",
                fontSize: 12,
              }}
            >
              No Image
            </div>
          )}

          <div>
            <div
              style={{
                fontWeight: 500,
                fontSize: 14,
                marginBottom: 2,
              }}
            >
              {record.name}
            </div>

            <div style={{ color: "#8c8c8c", fontSize: 12 }}>
              {record.variants?.length || 0} Variants
            </div>
          </div>
        </div>
      );
    },
  },

  //----------------------------------
  // SKU COLUMN
  //----------------------------------
  {
    title: "SKU",
    dataIndex: "sku",
    key: "sku",
    width: 120,
    sorter: (a, b) => String(a.sku || "").localeCompare(String(b.sku || "")),
    sortDirections: ["ascend", "descend"],
  },

  //----------------------------------
  // CATEGORY
  //----------------------------------
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    width: 150,
    sorter: (a, b) => String(a?.category?.name || "").localeCompare(String(b?.category?.name || "")),
    sortDirections: ["ascend", "descend"],
    render: (cat, record) => (
      <span style={{ color: "#8c8c8c" }}>
        {record?.category?.name || "-"}
      </span>
    ),
  },


  //----------------------------------
  // SUPPLIER
  //----------------------------------
  {
    title: "Supplier",
    dataIndex: "supplier",
    key: "supplier",
    width: 150,
    sorter: (a, b) => String(a?.owner?.name || "").localeCompare(String(b?.owner?.name || "")),
    sortDirections: ["ascend", "descend"],
    render: (sup, record) => (
      <span style={{ color: "#8c8c8c" }}>
        {record?.owner ? `${record.owner?.firstName} ${record.owner?.lastName}` : "-"}
      </span>
    ),
  },

  //----------------------------------
  // STOCK
  //----------------------------------
  {
    title: "Stock",
    dataIndex: "totalStock",
    key: "stock",
    width: 100,
    align: "center",
    sorter: (a, b) => {
      const totalA = typeof a.totalStock === "number"
        ? a.totalStock
        : Array.isArray(a.variants)
          ? a.variants.reduce((s, v) => s + (v.totalStock || 0), 0)
          : 0;
      const totalB = typeof b.totalStock === "number"
        ? b.totalStock
        : Array.isArray(b.variants)
          ? b.variants.reduce((s, v) => s + (v.totalStock || 0), 0)
          : 0;
      return totalA - totalB;
    },
    sortDirections: ["ascend", "descend"],
    render: (_, record) => {
      // Prefer explicit totalStock, fall back to variants sum or show status
      if (typeof record.totalStock === "number") return record.totalStock;
      if (Array.isArray(record.variants) && record.variants.length) {
        return record.variants.reduce((s, v) => s + (v.totalStock || 0), 0);
      }
      return 0;
      // return record.stock_status || "-";
    },
  },

  //----------------------------------
  // PRICE
  //----------------------------------
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    width: 100,
    align: "right",
    sorter: (a, b) => Number(a.price || 0) - Number(b.price || 0),
    sortDirections: ["ascend", "descend"],
    render: (price) => {
      if (price === undefined || price === null) return "-";
      return `$${Number(price).toFixed(2)}`;
    },
  },

  //----------------------------------
  // STATUS (Color Tags)
  //----------------------------------
  {
    title: "Status",
    dataIndex: "stock_status",
    key: "status",
    width: 120,
    sorter: (a, b) => String(a.stock_status || a.badge || "").localeCompare(String(b.stock_status || b.badge || "")),
    sortDirections: ["ascend", "descend"],
    render: (stock_status, record) => {
      const info = getStatusInfo(stock_status, record);
      console.log(info);
      return <span style={info.style}>{info.text}</span>;
    },
  },

  //----------------------------------
  // ADDED DATE
  //----------------------------------
  {
    title: "Added",
    dataIndex: "created",
    key: "date",
    width: 160,
    defaultSortOrder: "descend",
    sorter: (a, b) => new Date(a.created || 0).getTime() - new Date(b.created || 0).getTime(),
    sortDirections: ["ascend", "descend"],
    render: (date) => {
      if (!date) return "-";
      try {
        return new Date(date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
      } catch (e) {
        return "-";
      }
    },
  },

  //----------------------------------
  // ACTION ICONS
  //----------------------------------
  {
    title: "Action",
    key: "action",
    width: 120,
    align: "center",
    render: (_, record) => (
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <EyeOutlined
          style={{ fontSize: 18, cursor: "pointer", color: "#595959" }}
          onClick={() => onView ? onView(record) : console.log("View", record.id)}
        />
        <EditOutlined
          style={{ fontSize: 18, cursor: "pointer", color: "#595959" }}
          onClick={() => onEdit && onEdit(record)}
        />
        <DeleteOutlined
          style={{ fontSize: 18, cursor: "pointer", color: "red" }}
          onClick={() => onDelete ? onDelete(record) : console.log("Delete", record.id)}
        />
      </div>
    ),
  },
];
