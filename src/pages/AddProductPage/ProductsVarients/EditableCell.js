import React from "react";
import { Input, InputNumber, Form } from "antd";

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  form,
  editing,
  ...restProps
}) => {
  let childNode = children;

  if (editable && editing) {
    if (dataIndex === "price" || dataIndex === "totalStock") {
      childNode = (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[{ required: true, message: title + ' is required.' }]}
        >
          <InputNumber
            min={0}
            step={dataIndex === "price" ? 0.01 : 1}
            autoFocus
            style={{ width: "60px" }}
            formatter={(value) => dataIndex === "price" ? `$${Number(value ?? 0).toFixed(2)}` : value}
            parser={(value) => dataIndex === "price" ? value.replace(/\$\s?/g, '') : value}
          />
        </Form.Item>
      );
    } else {
      childNode = (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[{ required: true, message: title + ' is required.' }]}
        >
          <Input autoFocus style={{ width: "60px" }} />
        </Form.Item>
      );
    }
  } else {
    childNode = (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default EditableCell;
