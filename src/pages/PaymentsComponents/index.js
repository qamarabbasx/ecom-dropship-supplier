import React, { useState } from "react";
import {
  MainContainer,
  MainHeading,
  ProductsHeader,
  SearchRow,
  FiltersRow,
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
  const [dateFilter, setDateFilter] = useState("Today");
  
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
  const handleDateChange = (value) => {
    setDateFilter(value);
  };
  return (
    <MainContainer>
      <MainHeading>Payment History</MainHeading>
      <ProductsHeader>
        <SearchRow>
          <Search
            placeholder="Search"
            onSearch={(value) => setSearchFilter(value)}
            onChange={handleSearch}
          />
        </SearchRow>
        <FiltersRow>
          <FilterContainer>
            <CustomSelect defaultValue="Today" onChange={handleDateChange}>
              <StyledOption value="Today">Today</StyledOption>
              <StyledOption value="Yesterday">Yesterday</StyledOption>
              <StyledOption value="Last 7 Days">Last 7 Days</StyledOption>
              <StyledOption value="Last 30 Days">Last 30 Days</StyledOption>
              <StyledOption value="This Month">This Month</StyledOption>
              <StyledOption value="Last Month">Last Month</StyledOption>
            </CustomSelect>
          </FilterContainer>
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
        </FiltersRow>
      </ProductsHeader>
      <PaymentsListing
        searchFilter={searchFilter}
        statusFilter={statusFilter}
        dateFilter={dateFilter}
      />
      {/* <InvoiceDetail /> */}
    </MainContainer>
  );
};

export default PaymentsComponent;
