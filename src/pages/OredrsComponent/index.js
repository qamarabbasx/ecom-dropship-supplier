import React, { useState } from "react";
import {
  MainContainer,
  MainHeading,
  ProductsHeader,
  StyledButton,
} from "./styles";
import { AudioOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import FilterButtons from "../ProductsComponent/FilterButtons";
import OrdersListing from "./OrdersListing";
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

const OrdersComponent = () => {
  const navigate = useNavigate();
  //   const handleAddProductClick = () => {
  //     navigate("/add_product");
  //   };
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchFilter(value.trim());
  
    if (value.trim() === "") {
      setSearchFilter("");
    }
  };

  const handleDateChange = (dateString) => {
    setSelectedDate(dateString);
  };


  return (
    <MainContainer>
      <MainHeading>Orders</MainHeading>
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
          {/* <StyledButton
            onClick={handleAddProductClick}
          >{`Add Product`}</StyledButton> */}
        </div>
      </ProductsHeader>
      <FilterButtons onDateChange={handleDateChange} />
      <OrdersListing searchFilter={searchFilter} selectedDate={selectedDate} />
    </MainContainer>
  );
};

export default OrdersComponent;