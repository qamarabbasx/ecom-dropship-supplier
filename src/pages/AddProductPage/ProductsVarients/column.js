import React from "react";
import { Button, Upload, Tag } from "antd";
import upload from "../../../assets/Icons/upload.png";
import { UploadOutlined, DeleteOutlined, EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";

export const getColumns = (handleDelete, handleImageChange, handleEdit, handleSave, handleCancel, editingKey) => [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    width: 100,
    render: (text, record) => (
      <Upload
        name="image"
        listType="picture-card"
        showUploadList={false}
        beforeUpload={() => false}
        onChange={(info) => handleImageChange(info, record.key)}
        style={{ border: "2px dashed #f88e48" }}
      >
        {text ? (
          <img src={text} alt="variant" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ color: "#f88e48", fontSize: "1px" }}>
          <img src={upload} alt="Upload" style={{ width: 32, height: 32, color: "#fa8c16" }} />
          </div>
        )}
      </Upload>
    ),
  },
  {
    title: "Groups",
    dataIndex: "name",
    key: "name",
    width: 350,
    render: (text) => {
      const groups = text.split(" / ");
      const colors = ["#fecaca", "#bbf7d0", "#fef08a"]; // Red, Green, Yellow backgrounds
      const textColors = ["#991b1b", "#166534", "#854d0e"]; // Darker text colors
      
      return (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <span style={{ fontWeight: "500", marginRight: "8px" }}>{text.split(" / ")[0]}</span>
          {groups.slice(1).map((group, index) => (
            <Tag
              key={index}
              style={{
                backgroundColor: colors[index % colors.length],
                color: textColors[index % textColors.length],
                border: "none",
                borderRadius: "4px",
                padding: "2px 12px",
                fontSize: "14px",
              }}
            >
              {group}
            </Tag>
          ))}
        </div>
      );
    },
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    width: 100,
    editable: true,
    render: (text) => <span style={{ fontWeight: "500" }}>${text}</span>,
  },
  {
    title: "QTY",
    dataIndex: "totalStock",
    key: "qty",
    width: 80,
    editable: true,
    render: (text) => <span style={{ fontWeight: "500" }}>{text}</span>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 150,
    render: (text) => (
      <Tag
        style={{
          backgroundColor: text === "In Stock" ? "#d1fae5" : "#fee2e2",
          color: text === "In Stock" ? "#065f46" : "#991b1b",
          border: "none",
          borderRadius: "6px",
          padding: "4px 16px",
          fontSize: "14px",
          fontWeight: "500",
        }}
      >
        {text}
      </Tag>
    ),
  },
  {
    title: "",
    key: "action",
    width: 120,
    render: (text, record) => {
      const editable = editingKey === record.key;
      return editable ? (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="text"
            onClick={() => handleSave(record.key)}
            icon={<SaveOutlined style={{ color: "#10b981", fontSize: "18px" }} />}
            style={{ padding: "4px 8px" }}
          />
          <Button
            type="text"
            onClick={handleCancel}
            icon={<CloseOutlined style={{ color: "#ef4444", fontSize: "18px" }} />}
            style={{ padding: "4px 8px" }}
          />
        </div>
      ) : (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="text"
            onClick={() => handleEdit(record)}
            icon={<EditOutlined style={{ color: "#10b981", fontSize: "18px" }} />}
            style={{ padding: "4px 8px" }}
          />
          <Button
            type="text"
            onClick={() => handleDelete(record.key)}
            icon={<DeleteOutlined style={{ color: "#ef4444", fontSize: "18px" }} />}
            style={{ padding: "4px 8px" }}
          />
        </div>
      );
    },
  },
];
