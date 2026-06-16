import React from "react";
import { Button, Upload, Tag } from "antd";
import upload from "../../../assets/Icons/upload.png";
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const VARIANT_STATUS = {
  inStock: { text: "In Stock", bg: "#E6FFF0", color: "#2E8A3A" },
  outOfStock: { text: "Out Of Stock", bg: "#FFF0F0", color: "#C0392B" },
};

const getVariantStatusStyle = (status) => {
  const normalized = String(status || "").toLowerCase().replace(/_/g, " ").trim();
  return normalized === "in stock" ? VARIANT_STATUS.inStock : VARIANT_STATUS.outOfStock;
};

export const getColumns = (
  handleDelete,
  handleImageChange,
  handleEdit,
  handleSave,
  handleCancel,
  editingKey
) => [
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
          className="variant-image-upload"
        >
          {text ? (
            <img
              src={text}
              alt="variant"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={upload}
                alt="Upload"
                style={{ width: 28, height: 28 }}
              />
            </div>
          )}
        </Upload>
      ),
    },
    {
      title: "Groups",
      dataIndex: "name",
      key: "name",
      width: 140,
      ellipsis: true,
      render: (text) => {
        const groups = String(text || "").split(" / ").filter(Boolean);
        const colors = ["#fecaca", "#bbf7d0", "#fef08a"];
        const textColors = ["#991b1b", "#166534", "#854d0e"];

        return (
          <div
            style={{
              display: "flex",
              gap: "6px",
              flexWrap: "wrap",
              maxWidth: 140,
            }}
          >
            {groups.map((group, index) => (
              <Tag
                key={`${group}-${index}`}
                style={{
                  backgroundColor: colors[index % colors.length],
                  color: textColors[index % textColors.length],
                  border: "none",
                  borderRadius: "4px",
                  padding: "2px 10px",
                  fontSize: "14px",
                  margin: 0,
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
      width: 140,
      editable: true,
      render: (text) => (
        <span style={{ fontWeight: "500" }}>${Number(text || 0).toFixed(2)}</span>
      ),
    },
    {
      title: "QTY",
      dataIndex: "totalStock",
      key: "qty",
      width: 120,
      editable: true,
      render: (text) => <span style={{ fontWeight: "500" }}>{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (text) => {
        const status = getVariantStatusStyle(text);
        return (
          <Tag
            style={{
              backgroundColor: status.bg,
              color: status.color,
              border: "none",
              borderRadius: "6px",
              padding: "4px 16px",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {status.text}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (text, record) => {
        // Normalize key types when comparing: editingKey is stored as a string in state
        // but record.key can be a number. Compare as strings to avoid mismatches
        // so the action buttons toggle correctly when editing.
        const editable = String(editingKey) === String(record.key);
        console.log(
          "Rendering action buttons for record key:",
          record.key,
          "with editingKey:",
          editingKey,
          "-> editable:",
          editable
        );
        return editable ? (
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              type="text"
              onClick={() => handleSave(record.key)}
              icon={
                <SaveOutlined style={{ color: "#10b981", fontSize: "18px" }} />
              }
              style={{ padding: "4px 8px" }}
            />
            <Button
              type="text"
              onClick={handleCancel}
              icon={
                <CloseOutlined style={{ color: "#ef4444", fontSize: "18px" }} />
              }
              style={{ padding: "4px 8px" }}
            />
          </div>
        ) : (
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              type="text"
              onClick={() => handleEdit(record)}
              icon={
                <EditOutlined style={{ color: "#10b981", fontSize: "18px" }} />
              }
              style={{ padding: "4px 8px" }}
            />
            <Button
              type="text"
              onClick={() => handleDelete(record.key)}
              icon={
                <DeleteOutlined style={{ color: "#ef4444", fontSize: "18px" }} />
              }
              style={{ padding: "4px 8px" }}
            />
          </div>
        );
      },
    },
  ];
