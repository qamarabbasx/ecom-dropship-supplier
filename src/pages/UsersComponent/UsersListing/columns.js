import React from "react";
import { Tag, Tooltip, Button, Select } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";

export const columns = ({ editingUserId, onEditClick, onSaveClick, onCancelClick, setNewRole, setNewStatus, newRole, newStatus, originalRole, originalStatus, }) => [
  {
    title: "User Name",
    key: "userName",
    render: (_, record) => `${record.firstName} ${record.lastName}`,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "User Role",
    dataIndex: "role",
    key: "role",
    render: (text, record) => {
      // If it's the row being edited, display a dropdown, else display the text
      return editingUserId === record.id ? (
        <Select
          value={newRole}
          onChange={setNewRole}
          style={{ width: 120 }}
        >
          <Select.Option value="SUPPLIER">Supplier</Select.Option>
          <Select.Option value="DROPSHIPPER">Drop Shipper</Select.Option>
        </Select>
      ) : (
        text
      );
    },
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    render: (text, record) => {
      const status = record.subscription ? record.subscription.status : text;
      let color;
      let displayStatus = status;
  
      // Check for 'Pending Approval' status
      if (status === "APPROVAL_PENDING") {
        color = "orange";
        displayStatus = "Pending Approval";
      } else if (status === "ACVTIVE") {
        color = "green";
        displayStatus = "Active"
      } else if (!status) {
        color = "red";
        displayStatus = "In-active"
      } else {
        color = "red";
        displayStatus = status;
      }
  
      return editingUserId === record.id ? (
        <Select
          value={newStatus}
          onChange={setNewStatus}
          style={{ width: 120 }}
        >
          <Select.Option value="ACVTIVE">Active</Select.Option>
          <Select.Option value="APPROVAL_PENDING">Pending Approval</Select.Option>
        </Select>
      ) : (
        <Tag color={color}>{displayStatus}</Tag>
      );
    },
  },
  {
    title: "Actions",
    key: "actions",
    render: (text, record) => (
      <div>
        {editingUserId === record.id ? (
          <div>
            <Tooltip title="Save">
              <Button
                icon={<SaveOutlined />}
                onClick={() => onSaveClick(record)}
                style={{ marginRight: 8 }}
              />
            </Tooltip>
            <Tooltip title="Cancel">
              <Button
                icon={<CloseOutlined />}
                onClick={() => onCancelClick(record)}
                style={{ marginRight: 8 }}
              />
            </Tooltip>
          </div>
        ) : (
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => onEditClick(record)}
              style={{ marginRight: 8 }}
            />
          </Tooltip>
        )}
      </div>
    ),
  },
];
