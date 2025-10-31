// UserForm.js
import React from "react";
import { Form, Input, Select, Button, message } from "antd";
import { UserFormWrapper, StyledButton } from "./styles";
import { useCreateUserMutation } from "../../../api/authApi";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const UserForm = () => {
  const [form] = Form.useForm();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      // Remove the confirmPassword field before sending to the backend
      const { confirmPassword, ...userData } = values;
      await createUser(userData).unwrap();
      message.success("User created successfully");
      navigate("/dashboard");
    } catch (err) {
      message.error(err.data?.message || "Failed to create user");
    }
  };
  return (
    <UserFormWrapper>
      <h3>Users / Add User</h3>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="First Name" name="firstName">
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName">
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          label="Email Address"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder="Email Address" />
        </Form.Item>
        <Form.Item label="Phone Number" name="phoneNumber">
          <Input placeholder="Phone Number" />
        </Form.Item>
        <Form.Item
          label="User Role"
          name="role"
          rules={[{ required: true, message: "Please select a user role" }]}
        >
          <Select placeholder="Select a role">
            <Option value="ADMIN">Admin</Option>
            <Option value="SUPPLIER">Supplier</Option>
            <Option value="DROPSHIPPER">Dropshipper</Option>
            <Option value="WARE_HOUSE">Warehouse</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter a password" }]}
          hasFeedback
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
        <StyledButton type="primary" htmlType="submit">
          Add User
        </StyledButton>
      </Form>
    </UserFormWrapper>
  );
};

export default UserForm;
