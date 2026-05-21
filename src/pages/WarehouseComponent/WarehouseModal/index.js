import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button, Spin, message } from "antd";
import {
  useCreateWareHouseMutation,
  useUpdateWareHouseManagerMutation,
  useGetWareHouseManagersQuery,
} from "../../../api/authApi";
import { ModalContent } from "./styles";

const WarehouseModal = ({ visible, warehouse, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [createWarehouse, { isLoading: isCreating }] = useCreateWareHouseMutation();
  const [updateManager, { isLoading: isUpdating }] = useUpdateWareHouseManagerMutation();
  const { data: managersData, isLoading: isLoadingManagers } = useGetWareHouseManagersQuery({
    page: 1,
    limit: 1000,
  });

  const isEditing = !!warehouse;
  const isLoading = isCreating || isUpdating || isLoadingManagers;

  const managers = managersData?.data || [];

  useEffect(() => {
    if (visible) {
      if (isEditing && warehouse) {
        form.setFieldsValue({
          name: warehouse.name,
          location: warehouse.location,
          managers: Array.isArray(warehouse.managers)
            ? warehouse.managers.map((m) => m.id)
            : [],
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, warehouse, form, isEditing]);

  const handleSubmit = async (values) => {
    try {
      if (isEditing && warehouse) {
        // For editing, assign all selected managers
        const managerIds = Array.isArray(values.managers) ? values.managers : [];
        if (managerIds.length > 0) {
          await Promise.all(
            managerIds.map((managerId) =>
              updateManager({ warehouseId: warehouse.id, managerId }).unwrap()
            )
          );
          message.success("Warehouse managers updated successfully");
        } else {
          message.warning("No managers selected");
        }
      } else {
        // Create new warehouse (no manager in payload), then assign all selected managers
        const payload = {
          name: values.name,
          location: values.location,
        };
        const managerIds = Array.isArray(values.managers) ? values.managers : [];
        const created = await createWarehouse(payload).unwrap();
        const createdWarehouseId = created?.data?.id;
        if (createdWarehouseId && managerIds.length > 0) {
          await Promise.all(
            managerIds.map((managerId) =>
              updateManager({ warehouseId: createdWarehouseId, managerId }).unwrap()
            )
          );
        }
        message.success("Warehouse created successfully");
      }
      onSuccess();
      onClose();
    } catch (error) {
      message.error(error?.data?.message || "An error occurred");
    }
  };

  return (
    <Modal
      title={isEditing ? "Edit Warehouse Managers" : "Create Warehouse"}
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={500}
      centered
    >
      <ModalContent>
        <Spin spinning={isLoading}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={true}
          >
            {!isEditing && (
              <>
                <Form.Item
                  label="Warehouse Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter warehouse name",
                    },
                    {
                      min: 2,
                      message: "Warehouse name must be at least 2 characters",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter warehouse name"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  label="Location"
                  name="location"
                  rules={[
                    {
                      required: true,
                      message: "Please enter location",
                    },
                    {
                      min: 2,
                      message: "Location must be at least 2 characters",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter warehouse location"
                    size="large"
                  />
                </Form.Item>
              </>
            )}

            <Form.Item
              label="Managers"
              name="managers"
              rules={[
                {
                  required: true,
                  message: "Please select at least one manager",
                },
              ]}
            >
              <Select
                placeholder="Select warehouse managers"
                size="large"
                mode="multiple"
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={managers.map((manager) => {
                  const fullName = `${manager.firstName || ""} ${manager.lastName || ""}`.trim();
                  const warehouseName = manager.warehouse?.name;
                  const label = warehouseName
                    ? `${fullName} (${manager.email}) - Currently: ${warehouseName}`
                    : `${fullName} (${manager.email}) - Available`;
                  return {
                    label,
                    value: manager.id,
                  };
                })}
              />
            </Form.Item>

            <div className="form-buttons">
              <Button
                className="cancel-btn"
                onClick={onClose}
                size="large"
              >
                Cancel
              </Button>
              <Button
                className="submit-btn"
                htmlType="submit"
                loading={isLoading}
                size="large"
              >
                {isEditing ? "Update Managers" : "Create Warehouse"}
              </Button>
            </div>
          </Form>
        </Spin>
      </ModalContent>
    </Modal>
  );
};

export default WarehouseModal;
