import React, { useState } from "react";
import { Button, Dropdown, Tag, Space, message, Spin, Modal } from "antd";
import { EyeOutlined, /* EditOutlined, */ DeleteOutlined, DownOutlined, LoadingOutlined } from "@ant-design/icons";
import { formatItemType } from "./itemType.utils";

const statusConfig = {
  CANCEL: { color: "#FFE8E0", textColor: "#FF6B35", text: "Canceled" },
  CANCELED: { color: "#FFE8E0", textColor: "#FF6B35", text: "Canceled" },
  SHIPPED: { color: "#E0F2FF", textColor: "#0091FF", text: "Shipped" },
  DELIVERED: { color: "#E0F9F4", textColor: "#00B894", text: "Completed" },
  DILEVERED: { color: "#E0F9F4", textColor: "#00B894", text: "Completed" },
  FULL_FILLED: { color: "#E0F9F4", textColor: "#00B894", text: "Completed" },
  PROCESSING: { color: "#F3E5FF", textColor: "#9B59B6", text: "Processing" },
  PENDING: { color: "#F5F5F5", textColor: "#595959", text: "Pending" },
  DRAFT: { color: "#F5F5F5", textColor: "#595959", text: "Draft" },
};

// Unique status list without duplicates
const uniqueStatuses = [
  { key: "PENDING", label: "Pending" },
  { key: "PROCESSING", label: "Processing" },
  { key: "SHIPPED", label: "Shipped" },
  { key: "DELIVERED", label: "Completed" },
  { key: "CANCELED", label: "Canceled" },
  { key: "DRAFT", label: "Draft" },
];

// Status cell component with loading state
const StatusCell = ({ status, record, updateOrderStatus }) => {
  const [isLoading, setIsLoading] = useState(false);
  const config = statusConfig[status] || { color: "#F5F5F5", textColor: "#595959", text: status };

  const handleStatusChange = async ({ key }) => {
    setIsLoading(true);
    try {
      await updateOrderStatus({ orderId: record.id, status: key }).unwrap();
      message.success("Order status updated successfully");
    } catch (error) {
      const errorMessage = error?.data?.response || error?.data?.message || "Failed to update order status";
      message.error(errorMessage);
      console.error("Status update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const items = uniqueStatuses.map(({ key, label }) => ({
    key,
    label,
    disabled: isLoading,
  }));

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleStatusChange,
      }}
      trigger={["click"]}
      disabled={isLoading}
    >
      <Tag
        style={{
          cursor: isLoading ? "not-allowed" : "pointer",
          minWidth: "100px",
          textAlign: "center",
          backgroundColor: config.color,
          color: config.textColor,
          border: "none",
          fontWeight: 500,
          opacity: isLoading ? 0.7 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 14, color: config.textColor }} spin />} />
        ) : (
          <Space>
            {config.text}
            <DownOutlined style={{ fontSize: "10px" }} />
          </Space>
        )}
      </Tag>
    </Dropdown>
  );
};

const getColumns = (onEditOrder, onViewOrder, updateOrderStatus, deleteOrder) => [
  {
    title: "Order ID",
    dataIndex: "id",
    key: "id",
    width: 100,
    sorter: true,
  },
  {
    title: "Order Number",
    dataIndex: "orderTrackingId",
    key: "orderTrackingId",
    width: 120,
    render: (orderTrackingId) => orderTrackingId || "-",
  },
  {
    title: "Order Type",
    key: "orderType",
    width: 150,
    render: (_, record) => {
      const orderType = record?.orderItems?.[0]?.product?.category?.name;
      return orderType || "Home Delivery";
    },
  },
  {
    title: "Items",
    key: "items",
    width: 80,
    align: "center",
    render: (_, record) => {
      const totalQty = record.orderItems?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
      return totalQty;
    },
  },
  {
    title: "Item Type",
    key: "itemType",
    width: 180,
    render: (_, record) => {
      const itemType = record?.orderItems[0]?.product?.type;
      return formatItemType(itemType);
    },
    sorter: true,
  },
  {
    title: "Customer Name",
    key: "customerName",
    width: 180,
    render: (_, record) => {
      const customer = record?.customer;
      if (!customer) return "-";
      return `${customer.firstName || ""} ${customer.lastName || ""}`.trim() || "-";
    },
    sorter: true,
  },
  {
    title: "Supplier Name",
    key: "supplierName",
    width: 180,
    render: (_, record) => {
      const supplier = record?.orderItems[0]?.product?.owner;
      if (!supplier) return "-";
      return `${supplier.firstName || ""} ${supplier.lastName || ""}`.trim() || "-";
    },
    sorter: true,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 150,
    render: (status, record) => (
      <StatusCell status={status} record={record} updateOrderStatus={updateOrderStatus} />
    ),
  },
  {
    title: "Action",
    key: "action",
    width: 120,
    align: "center",
    render: (_, record) => {
      const handleDelete = () => {
        Modal.confirm({
          title: "Delete Order",
          content: "Are you sure you want to delete this order? This action cannot be undone.",
          okText: "Delete",
          okType: "danger",
          cancelText: "Cancel",
          onOk: async () => {
            try {
              await deleteOrder(record.id).unwrap();
              message.success("Order deleted successfully");
            } catch (error) {
              const errorMessage = error?.data?.response || error?.data?.message || "Failed to delete order";
              message.error(errorMessage);
            }
          },
        });
      };

      return (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => onViewOrder && onViewOrder(record)}
          />
          {/* Temporarily hidden — re-enable when order edit is ready
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            onClick={() => onEditOrder && onEditOrder(record)}
          />
          */}
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={handleDelete}
          />
        </Space>
      );
    },
  },
];

export default getColumns;
