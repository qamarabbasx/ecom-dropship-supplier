import React, { useState } from "react";
import { Popover, Checkbox, Select, Button } from "antd";
import {
  FilterPopoverContent,
  FilterSection,
  FilterLabel,
  CheckboxGroup,
  FilterButton,
} from "./styles";
import { useGetCustomersQuery, useGetProductOwnersQuery } from "../../../api/authApi";

const { Option } = Select;

const FilterDrawer = ({
  visible,
  onClose,
  onApplyFilter,
  children,
  statusMap = null,
  initialStatus = "All",
  // ownerType: 'customer' (default) or 'product' to fetch owners from products/owners
  ownerType = "customer",
  // label for the select field
  ownerLabel = "Customer",
  // key to use when returning selected values in onApplyFilter (e.g., 'customer' or 'owner')
  ownerKey = "customer",
}) => {
  const [orderType, setOrderType] = useState([]);
  const [status, setStatus] = useState(initialStatus || "All");
  const [ownerSelection, setOwnerSelection] = useState([]);

  const { data: customersData, isLoading: loadingCustomers } =
    useGetCustomersQuery();
  const { data: productOwnersData, isLoading: loadingProductOwners } =
    useGetProductOwnersQuery();

  const handleOrderTypeChange = (checkedValues) => {
    setOrderType(checkedValues);
  };

  const handleApplyFilter = () => {
    const result = {
      orderType,
      status,
    };
    result[ownerKey] = ownerSelection;
    onApplyFilter(result);
    onClose();
  };

  const handleReset = () => {
    setOrderType([]);
    setStatus("All");
    setOwnerSelection([]);
    const result = { orderType: [], status: "All" };
    result[ownerKey] = [];
    onApplyFilter(result);
  };
  console.log(productOwnersData )
  const content = (
    <FilterPopoverContent>
      <FilterSection>
        <FilterLabel>Status</FilterLabel>
        <Select
          value={status}
          onChange={setStatus}
          style={{ width: "100%" }}
          size="large"
        >
          <Option value="All">All</Option>
          {statusMap
            ? Object.entries(statusMap).map(([key, val]) => (
                <Option key={key} value={key}>
                  {val.text}
                </Option>
              ))
            : [
                <Option key="Pending" value="Pending">
                  Pending
                </Option>,
                <Option key="Processing" value="Processing">
                  Processing
                </Option>,
                <Option key="Shipped" value="Shipped">
                  Shipped
                </Option>,
                <Option key="Completed" value="Completed">
                  Completed
                </Option>,
                <Option key="Canceled" value="Canceled">
                  Canceled
                </Option>,
                <Option key="Draft" value="Draft">
                  Draft
                </Option>,
              ]}
        </Select>
      </FilterSection>

      <FilterSection>
        <FilterLabel>{ownerLabel}</FilterLabel>
        <Select
          mode="multiple"
          value={ownerSelection}
          onChange={setOwnerSelection}
          style={{ width: "100%" }}
          size="large"
          placeholder={`Select ${ownerLabel.toLowerCase()}s`}
          loading={ownerType === "product" ? loadingProductOwners : loadingCustomers}
          maxTagCount="responsive"
        >
          {(ownerType === "product" ? productOwnersData?.owners : customersData?.data)?.map((cust) => {
            // Support multiple shapes returned by different endpoints.
            const id = cust?.id || cust?.owner_id || cust?.customer_id || cust?.user_id;
            const firstName = cust?.owner_firstName || cust?.firstName || cust?.name || "";
            const lastName = cust?.owner_lastName || cust?.lastName || "";
            const display = `${firstName}${lastName ? ` ${lastName}` : ""}`.trim() || "-";
            return (
              <Option key={id} value={id}>
                {display}
              </Option>
            );
          })}
        </Select>
      </FilterSection>

      <div
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          marginTop: "16px",
        }}
      >
        <Button onClick={handleReset} style={{ flex: 1 }}>
          Reset
        </Button>
        <FilterButton onClick={handleApplyFilter} style={{ flex: 1 }}>
          Filter
        </FilterButton>
      </div>
    </FilterPopoverContent>
  );

  return (
    <Popover
      content={content}
      title="Filter"
      trigger="click"
      open={visible}
      onOpenChange={(visible) => {
        if (!visible) onClose();
      }}
      placement="bottomRight"
      overlayStyle={{ width: 280 }}
    >
      {children}
    </Popover>
  );
};

export default FilterDrawer;
