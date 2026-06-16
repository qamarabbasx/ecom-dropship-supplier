import React, { useState } from "react";
import { Upload, message, Spin } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import user_icon from "../../assets/Images/user_icon.png";
import uploadProfileImageToS3 from "../../utils/profileUpload";
import { useUpdateUserMutation } from "../../api/authApi";
import {
  AvatarSection,
  AvatarWrapper,
  AvatarImage,
  AvatarInitials,
  UploadOverlay,
} from "./styles";

const ProfileAvatarUpload = ({ userProfile, onUpdated }) => {
  const [uploading, setUploading] = useState(false);
  const [updateUser] = useUpdateUserMutation();

  const initials = `${userProfile?.firstName?.[0] || ""}${userProfile?.lastName?.[0] || ""}`.toUpperCase() || "?";

  const handleUpload = async (file) => {
    setUploading(true);
    try {
      const { url } = await uploadProfileImageToS3(file);
      await updateUser({ profileUrl: url }).unwrap();
      message.success("Profile picture updated");
      onUpdated?.();
    } catch (error) {
      message.error(error?.message || "Failed to upload profile picture");
    } finally {
      setUploading(false);
    }
    return false;
  };

  return (
    <AvatarSection>
      <AvatarWrapper>
        {uploading ? (
          <Spin />
        ) : userProfile?.profileUrl ? (
          <AvatarImage src={userProfile.profileUrl} alt="Profile" />
        ) : initials !== "?" ? (
          <AvatarInitials>{initials}</AvatarInitials>
        ) : (
          <AvatarImage src={user_icon} alt="Default profile" />
        )}
        <Upload
          accept="image/jpeg,image/png,image/jpg"
          showUploadList={false}
          beforeUpload={handleUpload}
          disabled={uploading}
        >
          <UploadOverlay aria-label="Upload profile picture">
            <CameraOutlined />
          </UploadOverlay>
        </Upload>
      </AvatarWrapper>
    </AvatarSection>
  );
};

export default ProfileAvatarUpload;
