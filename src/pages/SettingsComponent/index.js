import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Container, Section, Title, SaveButton } from "./styles";
import { useGetUserProfileQuery } from "../../api/authApi";
import { useChangePasswordMutation } from "../../api/authApi";
import { useUpdateUserMutation } from "../../api/authApi";

const ProfileSettings = () => {
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const { data: userProfile, error, refetch } = useGetUserProfileQuery();

  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();

  const handleProfileSave = async (values) => {
    console.log("Profile Information:", values);
    const { firstName, lastName, phoneNumber } = values;
    try {
      const response = await updateUser({ firstName, lastName, phoneNumber });
      if (response.error) {
        throw new Error(response.error.message);
      }
      message.success("Profile updated successfully!");
      refetch();
    } catch (error) {
      message.error("Failed to update profile. Please try again.");
      console.error(error);
    }
  };

  const handlePasswordSave = async (values) => {
    const { newPassword, confirmPassword, currentPassword } = values;

    if (newPassword !== confirmPassword) {
      message.error("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await changePassword({ password: newPassword });
      if (response.error) {
        throw new Error(response.error.message);
      }
      message.success("Password updated successfully!");
      passwordForm.resetFields();
    } catch (error) {
      message.error("Failed to update password. Please try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (error) {
      message.error("Failed to load profile information");
    } else if (userProfile) {
      profileForm.setFieldsValue({
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        userName: `${userProfile.firstName} ${userProfile.lastName}`,
        email: userProfile.email,
        phoneNumber: userProfile.phoneNumber,
      });
    }
  }, [userProfile, error, profileForm]);

  return (
    <Container>
      <Section>
        <Title>Profile Information</Title>
        <Form layout="vertical" form={profileForm} onFinish={handleProfileSave}>
          <Form.Item name="firstName" label="First Name">
            <Input />
          </Form.Item>

          <Form.Item name="lastName" label="Last Name">
            <Input />
          </Form.Item>

          <Form.Item name="userName" label="User Name">
            <Input disabled />
          </Form.Item>

          <Form.Item name="email" label="Email Address">
            <Input disabled />
          </Form.Item>

          <Form.Item name="phoneNumber" label="Phone Number">
            <Input />
          </Form.Item>

          <Form.Item>
            <SaveButton htmlType="submit" loading={isUpdatingUser}>{isUpdatingUser ? "Updating..." : "Save Changes"}</SaveButton>
          </Form.Item>
        </Form>
      </Section>

      <Section>
        <Title>Password</Title>
        <Form
          layout="vertical"
          form={passwordForm}
          onFinish={handlePasswordSave}
        >
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[
              { required: true, message: "Please enter your current password" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            dependencies={["currentPassword"]}
            rules={[
              { required: true, message: "Please enter your new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue("currentPassword") === value) {
                    return Promise.reject(new Error("New password must be different from current password"));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <SaveButton htmlType="submit" loading={isChangingPassword}>{isChangingPassword ? "Changing..." : "Change Password"}</SaveButton>
          </Form.Item>
        </Form>
      </Section>
    </Container>
  );
};

export default ProfileSettings;
