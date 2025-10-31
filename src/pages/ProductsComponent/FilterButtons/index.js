import React from "react";
import { Button, DatePicker, Dropdown, Menu } from "antd";
import {
  ExportOutlined,
  CalendarOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { ButtonWrapper } from "./styles";

const FilterButtons = ({ onDateChange }) => {
  const menu = (
    <Menu>
      <Menu.Item key="1">Filter by Stock</Menu.Item>
      <Menu.Item key="2">Filter by Price</Menu.Item>
      <Menu.Item key="3">Filter by Status</Menu.Item>
    </Menu>
  );

  return (
    <ButtonWrapper>
      {/* <Button icon={<ExportOutlined />} size="large">
        Export
      </Button> */}

      <DatePicker
        placeholder="Select Dates"
        size="large"
        style={{ marginLeft: "8px" }}
        suffixIcon={<CalendarOutlined />}
        format="YYYY-MM-DD"
        onChange={(date, dateString) => onDateChange(dateString)}
      />
      
    </ButtonWrapper>
  );
};

export default FilterButtons;
