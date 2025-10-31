import React from "react";
import { Tag, Dropdown, Menu, Button } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  DownOutlined,
} from "@ant-design/icons";

const columns = [
  {
    title: "Order ID",
    dataIndex: "id",
    key: "id",
    sorter: true,
  },
  {
    title: "Order Number",
    dataIndex: "orderTrackingId",
    key: "orderTrackingId",
  },
  {
    title: "Order Type",
    dataIndex: "orderType",
    key: "orderType",
  },
  {
    title: "Items",
    dataIndex: "items",
    key: "items",
    sorter: true,
  },
  {
    title: "Customer Name",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "Added",
    dataIndex: "created",
    key: "created",
    render: (date) => new Date(date).toLocaleDateString(),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      let color;
      switch (status) {
        case "Completed":
          color = "green";
          break;
        case "Pending":
          color = "gray";
          break;
        case "Canceled":
          color = "red";
          break;
        case "Shipped":
          color = "blue";
          break;
        default:
          color = "gray";
      }
      return (
        <Tag color={color}>
          {status}
          <DownOutlined style={{ marginLeft: "4px" }} />
        </Tag>
      );
    },
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <div>
        <Button type="text" icon={<EyeOutlined />} />
        <Button type="text" icon={<EditOutlined />} />
        <Button type="text" icon={<DeleteOutlined />} />
      </div>
    ),
  },
];

export default columns;
