import React, { useState } from "react";
import { Input, InputNumber, Form } from "antd";

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  form,
  ...restProps
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const row = await form.validateFields();
      handleSave({ ...record, ...row });
      toggleEdit();
    } catch (err) {
      console.log("Save failed:", err);
    }
  };

  let childNode = children;

  if (editable && isEditing) {
    childNode =
      dataIndex === "price" || dataIndex === "qty" ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[{ required: true, message: `${title} is required.` }]}
        >
          {dataIndex === "price" ? (
            <InputNumber min={0} step={1} onBlur={save} autoFocus />
          ) : (
            <Input onBlur={save} autoFocus />
          )}
        </Form.Item>
      ) : (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[{ required: true, message: `${title} is required.` }]}
        >
          <Input onBlur={save} autoFocus />
        </Form.Item>
      );
  } else {
    childNode = (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default EditableCell;
