import React from "react";
import { Button, Upload, Tag } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";

export const getColumns = (handleDelete, handleImageChange) => [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (text, record) => (
      <Upload
        name="image"
        listType="picture-card"
        showUploadList={false}
        beforeUpload={() => false}
        onChange={(info) => handleImageChange(info, record.key)}
      >
        {text ? (
          <img src={text} alt="variant" style={{ width: "100%" }} />
        ) : (
          <UploadOutlined />
        )}
      </Upload>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    editable: true,
    render: (text) => `$${text}`,
  },
  {
    title: "QTY",
    dataIndex: "totalStock",
    key: "qty",
    editable: true,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => (
      <Tag color={text === "In Stock" ? "green" : "volcano"}>
        {text.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Button
        onClick={() => handleDelete(record.key)}
        icon={<DeleteOutlined />}
      />
    ),
  },
];
