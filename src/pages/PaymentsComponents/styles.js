import styled from "styled-components";
import AntButton from "../../uiKits/Button";
import { Select } from "antd";

// Ant Design Select Option component
const { Option } = Select;

// Styled container for the select elements
export const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: start;
`;

export const CustomSelect = styled(Select)`
  width: 150px;
  .ant-select-selector {
    border: 1px solid #e0e0e0 !important;
    border-radius: 4px;
  }
`;

export const StyledOption = styled(Option)``;

export const MainContainer = styled.div``;

export const MainHeading = styled.h2`
  margin: 0;
  color: #2e2a40;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 111.111% */
`;

export const ProductsHeader = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin-top: 30px;
`;

export const StyledButton = styled(AntButton)`
  font-size: 18px;
  height: 50px;
  padding: 4px 40px;
`;
