import React, { useState } from "react";
import { MainContainer, MainHeading, ProductsHeader } from "./styles";
import { Input } from "antd";
import UsersListing from "./UsersListing";
import AntButton from "../../uiKits/Button";
import { useNavigate } from "react-router-dom";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);
const UsersComponent = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchFilter(value.trim());

    if (value.trim() === "") {
      setSearchFilter("");
    }
  };
  const navigate = useNavigate();
  const goToForm = () => {
    navigate("/add_user"); // Redirects to the UserForm component
  };
  return (
    <MainContainer>
      <MainHeading>Users</MainHeading>

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
        <AntButton onClick={goToForm}>Add User</AntButton>
      </ProductsHeader>
      <UsersListing searchFilter={searchFilter} />
    </MainContainer>
  );
};

export default UsersComponent;
