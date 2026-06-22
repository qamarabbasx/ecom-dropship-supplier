import React, { useRef, useState } from "react";
import { Modal, Button, message, Alert, Typography, Space } from "antd";
import {
  DownloadOutlined,
  InboxOutlined,
  UploadOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useBulkImportProductsMutation } from "../../../api/productApi";
import { BULK_IMPORT_SAMPLE_URL } from "../../../utils/productBulkImport";

const { Text, Paragraph } = Typography;

const DropZone = styled.div`
  border: 2px dashed ${({ $active }) => ($active ? "#f97316" : "#d9d9d9")};
  border-radius: 8px;
  padding: 32px 16px;
  text-align: center;
  background: ${({ $active }) => ($active ? "#fff7ed" : "#fafafa")};
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
`;

const HiddenInput = styled.input`
  display: none;
`;

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const BulkProductUpload = ({ open, onClose }) => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [bulkImport, { isLoading }] = useBulkImportProductsMutation();

  const resetState = () => {
    setFile(null);
    setSubmitted(false);
    setSubmittedEmail("");
    setDragActive(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const validateFile = (selected) => {
    if (!selected) return false;
    const lower = selected.name.toLowerCase();
    const isCsv = lower.endsWith(".csv");
    const isXlsx = lower.endsWith(".xlsx") || lower.endsWith(".xls");
    if (!isCsv && !isXlsx) {
      message.error("Please upload a .xlsx or .csv file");
      return false;
    }
    if (selected.size > MAX_FILE_SIZE) {
      message.error("File size must be 2MB or less");
      return false;
    }
    return true;
  };

  const handleFileSelect = (selected) => {
    if (!validateFile(selected)) return;
    setFile(selected);
    setSubmitted(false);
    setSubmittedEmail("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = e.dataTransfer.files?.[0];
    handleFileSelect(dropped);
  };

  const handleImport = async () => {
    if (!file) {
      message.warning("Please select a file to upload");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await bulkImport(formData).unwrap();
      setSubmitted(true);
      setSubmittedEmail(response.email || "");
      message.success("Import started — check your email for results");
    } catch (err) {
      message.error(err?.data?.message || "Failed to start product import");
    }
  };

  return (
    <Modal
      title="Bulk Product Upload"
      open={open}
      onCancel={handleClose}
      width={640}
      footer={
        submitted
          ? [
              <Button key="close" type="primary" onClick={handleClose}>
                Close
              </Button>,
            ]
          : [
              <Button key="cancel" onClick={handleClose}>
                Cancel
              </Button>,
              <Button
                key="import"
                type="primary"
                icon={<UploadOutlined />}
                loading={isLoading}
                disabled={!file}
                onClick={handleImport}
              >
                Import
              </Button>,
            ]
      }
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {submitted ? (
          <Alert
            type="info"
            showIcon
            icon={<CheckCircleOutlined />}
            message="Import running in the background"
            description={
              <Space direction="vertical" size="small">
                <Paragraph style={{ marginBottom: 0 }}>
                  Your file <Text strong>{file?.name}</Text> is being processed.
                  You can close this window and continue with other tasks.
                </Paragraph>
                {submittedEmail && (
                  <Paragraph style={{ marginBottom: 0 }}>
                    We&apos;ll email the import results to{" "}
                    <Text strong>{submittedEmail}</Text> when processing
                    completes.
                  </Paragraph>
                )}
              </Space>
            }
          />
        ) : (
          <>
            <Paragraph type="secondary" style={{ marginBottom: 0 }}>
              Fill the <Text strong>Product_Upload_Template</Text> sheet in the
              downloaded workbook. See the Instructions tab for guidance.
            </Paragraph>

            <Button
              icon={<DownloadOutlined />}
              href={BULK_IMPORT_SAMPLE_URL}
              download="ecomdropship_product_template.xlsx"
            >
              Download Sample Template
            </Button>

            <DropZone
              $active={dragActive}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
            >
              <InboxOutlined style={{ fontSize: 40, color: "#f97316" }} />
              <Paragraph style={{ margin: "12px 0 4px" }}>
                Drag and drop your .xlsx or .csv file here
              </Paragraph>
              <Text type="secondary">or click to browse (max 2MB)</Text>
              {file && (
                <Paragraph style={{ marginTop: 12, marginBottom: 0 }}>
                  <Text strong>{file.name}</Text>
                </Paragraph>
              )}
            </DropZone>

            <HiddenInput
              ref={inputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(e) => handleFileSelect(e.target.files?.[0])}
            />
          </>
        )}
      </Space>
    </Modal>
  );
};

export default BulkProductUpload;
