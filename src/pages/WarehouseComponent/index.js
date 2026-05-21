import React, { useState, useEffect } from "react";
import { Input, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import WarehouseListing from "./WarehouseListing";
import WarehouseModal from "./WarehouseModal";
import {
  PageWrapper,
  PageHeader,
  ToolbarContainer,
  SearchInputWrapper,
  ActionButtonsContainer,
  ContentWrapper,
} from "./styles";

const WarehouseComponent = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  // Debounce search filter
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchFilter);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchFilter]);

  const handleOpenModal = (warehouse = null) => {
    setSelectedWarehouse(warehouse || null);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedWarehouse(null);
  };

  const handleModalSuccess = () => {
    handleCloseModal();
  };

  const handleDeleteWarehouse = (warehouseId) => {
    // Note: Backend doesn't support delete, so we show a message
    message.info("Delete functionality will be available soon");
    // If backend supports delete in the future, implement:
    // try {
    //   await deleteWarehouse(warehouseId).unwrap();
    //   message.success("Warehouse deleted successfully");
    // } catch (error) {
    //   message.error(error?.data?.message || "Failed to delete warehouse");
    // }
  };

  return (
    <PageWrapper>
      <PageHeader>
        <h1>Warehouses</h1>
      </PageHeader>

      <ToolbarContainer>
        <SearchInputWrapper>
          <Input
            placeholder="Search by warehouse name or location..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            allowClear
            size="large"
          />
        </SearchInputWrapper>

        <ActionButtonsContainer>
          <Button
            type="primary"
            size="large"
            className="add-btn"
            icon={<PlusOutlined />}
            onClick={() => handleOpenModal()}
            style={{ background: "#FF6B35", borderColor: "#FF6B35" }}
          >
            Add Warehouse
          </Button>
        </ActionButtonsContainer>
      </ToolbarContainer>

      <ContentWrapper>
        <WarehouseListing
          searchFilter={debouncedSearch}
          sortBy="created"
          sortOrder="DESC"
          onEdit={handleOpenModal}
          onDelete={handleDeleteWarehouse}
        />
      </ContentWrapper>

      <WarehouseModal
        visible={modalVisible}
        warehouse={selectedWarehouse}
        onClose={handleCloseModal}
        onSuccess={handleModalSuccess}
      />
    </PageWrapper>
  );
};

export default WarehouseComponent;
