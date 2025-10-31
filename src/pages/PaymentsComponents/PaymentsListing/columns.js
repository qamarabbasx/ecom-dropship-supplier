// Columns.js
export const columns = [
  {
    title: "ID Invoice",
    dataIndex: "invoiceId",
    key: "invoiceId",
  },
  {
    title: "Order Number",
    dataIndex: "orderNumber",
    key: "orderNumber",
  },
  {
    title: "Recipient Name",
    dataIndex: "recipientName",
    key: "recipientName",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      let color;
      switch (status) {
        case "Completed":
          color = "#52c41a";
          break;
        case "Rejected":
          color = "#f5222d";
          break;
        case "Processing":
        default:
          color = "#d9d9d9";
      }
      return (
        <span
          style={{
            backgroundColor: color,
            padding: "5px 10px",
            borderRadius: "15px",
            color: "#fff",
          }}
        >
          {status}
        </span>
      );
    },
  },
];
