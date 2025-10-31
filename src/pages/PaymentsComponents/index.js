import React, { useState } from "react";
import {
  MainContainer,
  MainHeading,
  ProductsHeader,
  FilterContainer,
  CustomSelect,
  StyledOption,
} from "./styles";
import { AudioOutlined } from "@ant-design/icons";
import { Input } from "antd";
import PaymentsListing from "./PaymentsListing";
import InvoiceDetail from "../Invoice";
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);

const onSearch = (value, _e, info) => console.log(info?.source, value);
const PaymentsComponent = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchFilter(value.trim());

    if (value.trim() === "") {
      setSearchFilter("");
    }
  };
  const handleStatusChange = (value) => {
    setStatusFilter(value);
  };
  return (
    <MainContainer>
      <MainHeading> Product Payment History</MainHeading>
      <ProductsHeader>
        <div>
          <Search
            placeholder="input search text"
            onSearch={(value) => setSearchFilter(value)}
            onChange={handleSearch}
            style={{
              width: 300,
            }}
          />
        </div>
        <div>
          <FilterContainer>
            <CustomSelect defaultValue="ALL" onChange={handleStatusChange}>
              <StyledOption value="ALL">All</StyledOption>
              <StyledOption value="APPROVED">Approved</StyledOption>
              <StyledOption value="COMPLETED">Completed</StyledOption>
              <StyledOption value="FAILED">Failed</StyledOption>
              <StyledOption value="PENDING">Pending</StyledOption>
              <StyledOption value="CANCELLED">Cancelled</StyledOption>
            </CustomSelect>
          </FilterContainer>
        </div>
      </ProductsHeader>
      <PaymentsListing
        searchFilter={searchFilter}
        statusFilter={statusFilter}
      />
      {/* <InvoiceDetail /> */}
    </MainContainer>
  );
};

export default PaymentsComponent;
