import React, { useState } from "react";
import { MainContainer, MainHeading, ProductsHeader, SearchRow, ActionsRow } from "./styles";
import { Input } from "antd";
import UsersListing from "./UsersListing";
import AntButton from "../../uiKits/Button";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);
const UsersComponent = ({ onAddUser }) => {
  const [searchFilter, setSearchFilter] = useState("");
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchFilter(value.trim());

    if (value.trim() === "") {
      setSearchFilter("");
    }
  };
  const goToForm = () => {
    if (onAddUser) {
      onAddUser();
    }
  };
  return (
    <MainContainer>
      <MainHeading>Users</MainHeading>

      <ProductsHeader>
        <SearchRow>
          <Search
            placeholder="Search users"
            onSearch={(value) => setSearchFilter(value)}
            onChange={handleSearch}
          />
        </SearchRow>
        <ActionsRow>
          <AntButton onClick={goToForm}>Add User</AntButton>
        </ActionsRow>
      </ProductsHeader>
      <UsersListing searchFilter={searchFilter} />
    </MainContainer>
  );
};

export default UsersComponent;
