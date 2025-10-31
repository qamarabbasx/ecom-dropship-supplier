import React, { useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import image from "../../assets/Icons/image.png";
import { Image } from "antd";

const UploadImages = ({ handleProductImages }) => {
  const [fileList, setFileList] = useState([]);
  const inputRef = useRef();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleFiles = (files) => {
    const newFiles = Array.from(files).map((file) => ({
      uid: Math.random().toString(36).substr(2, 9),
      name: file.name,
      url: URL.createObjectURL(file),
      originFileObj: file,
    }));
    const updatedList = [...fileList, ...newFiles].slice(0, 8);
    setFileList(updatedList);
    handleProductImages(updatedList.map((f) => f.originFileObj));
  };

  const handleInputChange = (e) => {
    handleFiles(e.target.files);
    e.target.value = null;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (uid) => {
    const updatedList = fileList.filter((file) => file.uid !== uid);
    setFileList(updatedList);
    handleProductImages(updatedList.map((f) => f.originFileObj));
  };

  const handleReplace = (uid) => {
    inputRef.current.setAttribute("data-replace", uid);
    inputRef.current.click();
  };

  const handleReplaceInput = (e) => {
    const uid = inputRef.current.getAttribute("data-replace");
    if (uid && e.target.files.length) {
      const file = e.target.files[0];
      const newFile = {
        uid,
        name: file.name,
        url: URL.createObjectURL(file),
        originFileObj: file,
      };
      const updatedList = fileList.map((f) => (f.uid === uid ? newFile : f));
      setFileList(updatedList);
      handleProductImages(updatedList.map((f) => f.originFileObj));
      inputRef.current.removeAttribute("data-replace");
    }
    e.target.value = null;
  };

  const handlePreview = (file) => {
    setPreviewImage(file.url);
    setPreviewOpen(true);
  };

  return (
    <div style={{ margin: "24px 0" }}>
      <div style={{ fontWeight: 500, marginBottom: 8 }}>Product Images</div>
      <div
        style={{
          border: "2px dashed #d9d9d9",
          borderRadius: 8,
          padding: 24,
          display: "flex",
          alignItems: "center",
          gap: 24,
          minHeight: 160,
          flexWrap: "wrap",
        }}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {fileList.length < 8 && (
          <div
            style={{
              width: 192,
              height: 124,
              border: "2px dashed #fa8c16",
              borderRadius: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#fa8c16",
              cursor: "pointer",
              textAlign: "center",
              fontWeight: 500,
              fontSize: 16,
              position: "relative",
            }}
            onClick={() => {
              inputRef.current.removeAttribute("data-replace");
              inputRef.current.click();
            }}
          >
            <img src={image} alt="Upload" style={{ width: 32, height: 32, marginBottom: 8, color: "#fa8c16" }} />
            <span>Click to Upload<br />or Drag and Drop</span>
            <input
              ref={inputRef}
              type="file"
              multiple
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleInputChange}
              onClick={(e) => (e.target.value = null)}
            />
          </div>
        )}
        {fileList.map((file) => (
          <div
            key={file.uid}
            style={{
              width: 120,
              height: 120,
              borderRadius: 8,
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              background: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={file.url}
              alt={file.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
              onClick={() => handlePreview(file)}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                background: "rgba(0,0,0,0.35)",
                opacity: 0,
                transition: "opacity 0.2s",
                zIndex: 2,
                pointerEvents: "none",
              }}
              className="upload-image-overlay"
            >
              <button
                style={{
                  background: "#fff",
                  border: "none",
                  borderRadius: 4,
                  padding: "4px 12px",
                  fontWeight: 500,
                  cursor: "pointer",
                  marginBottom: 4,
                  pointerEvents: "auto",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleReplace(file.uid);
                }}
              >Replace</button>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleReplaceInput}
              />
              <button
                style={{
                  background: "#fff",
                  border: "none",
                  borderRadius: 4,
                  padding: "4px 12px",
                  fontWeight: 500,
                  cursor: "pointer",
                  pointerEvents: "auto",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(file.uid);
                }}
              >Remove</button>
            </div>
          </div>
        ))}
      </div>
      {previewOpen && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage("")
          }}
          src={previewImage}
        />
      )}
      <style>{`
        .upload-image-overlay:hover, .upload-image-overlay:active {
          opacity: 1 !important;
          pointer-events: auto !important;
        }
        div[style*='position: relative']:hover .upload-image-overlay {
          opacity: 1 !important;
          pointer-events: auto !important;
        }
      `}</style>
    </div>
  );
};

export default UploadImages;
