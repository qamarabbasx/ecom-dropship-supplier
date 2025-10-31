import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
const { Dragger } = Upload;

const UploadImages = ({ handleProductImages }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const handlePreview = (file) => {
    setPreviewImage(file.url || URL.createObjectURL(file.originFileObj));
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    console.log("file list ---->", fileList);
    setFileList(newFileList);
    handleProductImages(newFileList.map((file) => file.originFileObj));
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Dragger
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={() => false}
        multiple
        style={{ padding: 20 }}
      >
        {fileList.length >= 8 ? null : uploadButton}
        <p style={{ marginTop: 16 }}>Drag & drop files here, or click to select</p>
      </Dragger>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage("")
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default UploadImages;
