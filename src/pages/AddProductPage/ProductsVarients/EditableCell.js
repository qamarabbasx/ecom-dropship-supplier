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
    childNode =
      dataIndex === "price" || dataIndex === "totalStock" ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[{ required: true, message: `${title} is required.` }]}
        >
          <InputNumber 
            min={0} 
            step={1} 
            autoFocus 
            style={{ width: "100%" }}
            formatter={(value) => dataIndex === "price" ? `$ ${value}` : value}
            parser={(value) => dataIndex === "price" ? value.replace(/\$\s?/g, '') : value}
          />
        </Form.Item>
      ) : (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[{ required: true, message: `${title} is required.` }]}
        >
          <Input autoFocus />
        </Form.Item>
      );
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
