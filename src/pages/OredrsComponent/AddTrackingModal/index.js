import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Input, Select, Button, Spin, message } from "antd";
import {
  useDetectCarrierMutation,
  useAddOrderTrackingMutation,
  useUpdateOrderTrackingMutation,
} from "../../../api/authApi";

const DEFAULT_CARRIERS = [
  { code: "usps", name: "USPS" },
  { code: "ups", name: "UPS" },
  { code: "fedex", name: "FedEx" },
  { code: "dhl", name: "DHL" },
  { code: "amazon", name: "Amazon Logistics" },
  { code: "other", name: "Other" },
];

const AddTrackingModal = ({ visible, order, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [carriers, setCarriers] = useState(DEFAULT_CARRIERS);
  const detectTimer = useRef(null);

  const [detectCarrier, { isLoading: isDetecting }] = useDetectCarrierMutation();
  const [addTracking, { isLoading: isAdding }] = useAddOrderTrackingMutation();
  const [updateTracking, { isLoading: isUpdating }] = useUpdateOrderTrackingMutation();

  const isEditing = Boolean(order?.carrierTrackingNumber);
  const isSubmitting = isAdding || isUpdating;

  useEffect(() => {
    if (!visible) return;
    if (isEditing && order) {
      form.setFieldsValue({
        trackingNumber: order.carrierTrackingNumber,
        carrierCode: order.carrierCode || "other",
      });
    } else {
      form.resetFields();
      form.setFieldsValue({ carrierCode: undefined });
    }
  }, [visible, order, form, isEditing]);

  useEffect(() => {
    return () => {
      if (detectTimer.current) clearTimeout(detectTimer.current);
    };
  }, []);

  const runDetect = async (trackingNumber) => {
    const tn = String(trackingNumber || "").trim();
    if (!tn || tn.length < 8) return;
    try {
      const result = await detectCarrier({ trackingNumber: tn }).unwrap();
      if (result?.supportedCarriers?.length) {
        setCarriers(result.supportedCarriers);
      }
      if (result?.carrierCode) {
        form.setFieldsValue({ carrierCode: result.carrierCode });
      }
    } catch (error) {
      // Detection is best-effort; user can still pick manually.
      console.warn("Carrier detection failed", error);
    }
  };

  const handleTrackingChange = (e) => {
    const value = e.target.value;
    if (detectTimer.current) clearTimeout(detectTimer.current);
    detectTimer.current = setTimeout(() => runDetect(value), 400);
  };

  const handleSubmit = async (values) => {
    if (!order?.id) return;
    try {
      const selected = carriers.find((c) => c.code === values.carrierCode);
      const payload = {
        orderId: order.id,
        trackingNumber: values.trackingNumber.trim(),
        carrierCode: values.carrierCode,
        carrier: selected?.name,
      };

      if (isEditing) {
        await updateTracking(payload).unwrap();
        message.success("Tracking updated successfully");
      } else {
        await addTracking(payload).unwrap();
        message.success("Tracking added successfully");
      }
      onSuccess?.();
      onClose?.();
    } catch (error) {
      message.error(
        error?.data?.message || error?.data?.response || "Failed to save tracking"
      );
    }
  };

  return (
    <Modal
      title={isEditing ? "Edit Tracking" : "Add Tracking"}
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="trackingNumber"
          label="Tracking Number"
          rules={[{ required: true, message: "Please enter a tracking number" }]}
        >
          <Input
            placeholder="Enter carrier tracking number"
            onChange={handleTrackingChange}
            onBlur={(e) => runDetect(e.target.value)}
            suffix={isDetecting ? <Spin size="small" /> : null}
          />
        </Form.Item>

        <Form.Item
          name="carrierCode"
          label="Carrier"
          rules={[{ required: true, message: "Please select a carrier" }]}
          extra="Auto-detected from the tracking number — you can override"
        >
          <Select
            placeholder="Select carrier"
            options={carriers.map((c) => ({
              value: c.code,
              label: c.name,
            }))}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            {isEditing ? "Update Tracking" : "Add Tracking"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTrackingModal;
