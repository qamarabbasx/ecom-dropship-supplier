import React, {useState} from "react";
import {
  MainContainer,
  MainHeading,
  ProductsHeader,
  StyledButton,
} from "./styles";
import { AudioOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import ProductListing from "./ProductListing";
import FilterButtons from "./FilterButtons";
const { Search } = Input;

const ProductsComponent = () => {
  const navigate = useNavigate();
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleAddProductClick = () => {
    navigate("/add_product");
  };

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
      <MainHeading>Products</MainHeading>
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
          <StyledButton
            onClick={handleAddProductClick}
          >{`Add Product`}</StyledButton>
        </div>
      </ProductsHeader>
      <FilterButtons onDateChange={handleDateChange} />
      <ProductListing
        searchFilter={searchFilter}
        selectedDate={selectedDate}
      />
    </MainContainer>
  );
};

export default ProductsComponent;
