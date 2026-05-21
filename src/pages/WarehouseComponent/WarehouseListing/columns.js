import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const getColumns = (handleEdit, handleDelete) => [
  {
    title: "Warehouse Name",
    dataIndex: "name",
    key: "name",
    width: 180,
    sorter: true,
    render: (text) => <span style={{ color: "#262626", fontWeight: 500 }}>{text || "-"}</span>,
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
    width: 200,
    render: (text) => <span style={{ color: "#262626" }}>{text || "-"}</span>,
  },
  {
    title: "Managers",
    dataIndex: "managers",
    key: "managers",
    width: 240,
    render: (managers) => {
      if (Array.isArray(managers) && managers.length > 0) {
        const display = managers
          .map((m) => m?.name?.trim() || m?.email || "")
          .filter(Boolean)
          .join(", ");
        return <span style={{ color: "#262626" }}>{display}</span>;
      }
      return <span style={{ color: "#8c8c8c" }}>No managers</span>;
    },
  },
  {
    title: "Products",
    dataIndex: "products",
    key: "products",
    width: 100,
    render: (products) => {
      const count = Array.isArray(products) ? products.length : 0;
      return <span style={{ color: "#595959" }}>{count}</span>;
    },
  },
  {
    title: "Actions",
    key: "actions",
    width: 120,
    fixed: "right",
    render: (_, record) => (
      <div style={{ display: "flex", gap: "12px" }}>
        <EditOutlined
          onClick={() => handleEdit(record)}
          style={{
            cursor: "pointer",
            color: "#FF6B35",
            fontSize: "16px",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#FF5520")}
          onMouseLeave={(e) => (e.target.style.color = "#FF6B35")}
        />
        <DeleteOutlined
          onClick={() => handleDelete(record.id)}
          style={{
            cursor: "pointer",
            color: "#FF6B35",
            fontSize: "16px",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#C0392B")}
          onMouseLeave={(e) => (e.target.style.color = "#FF6B35")}
        />
      </div>
    ),
  },
];
