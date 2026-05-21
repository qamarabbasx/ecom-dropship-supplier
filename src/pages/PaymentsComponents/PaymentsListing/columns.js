// Columns.js
import { Tag } from "antd";

export const columns = [
  {
    title: "ID Invoice",
    dataIndex: "invoiceId",
    key: "invoiceId",
    width: 120,
  },
  {
    title: "Oder Number",
    dataIndex: "orderNumber",
    key: "orderNumber",
    width: 130,
  },
  {
    title: "Recipient Name",
    dataIndex: "recipientName",
    key: "recipientName",
    width: 180,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    width: 120,
    render: (amount) => (
      <span style={{ fontWeight: 500 }}>{amount}</span>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: 130,
  },
  {
    title: "TYPE",
    dataIndex: "type",
    key: "type",
    width: 120,
    render: (type) => (
      <span style={{ textTransform: "capitalize" }}>{type}</span>
    ),
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    width: 130,
    render: (status) => {
      let color;
      switch (status?.toLowerCase()) {
        case "completed":
        case "approved":
          color = "#52c41a";
          break;
        case "rejected":
        case "failed":
        case "cancelled":
          color = "#ff4d4f";
          break;
        case "pending":
          color = "#faad14";
          break;
        case "processing":
        default:
          color = "#8c8c8c";
      }
      return (
        <Tag
          color={color}
          style={{
            borderRadius: "12px",
            padding: "2px 12px",
            fontWeight: 500,
            textTransform: "capitalize",
          }}
        >
          {status}
        </Tag>
      );
    },
  },
];
