import { Select } from "antd";
import styled from "styled-components";

export const AntSelect = styled(Select)`
  &:hover .ant-select-selector {
    border-color: #ed6928 !important;
  }
  .ant-select-selector {
    border-color: #ed6928;
  }
  .ant-select-focused {
    border-color: #ed6928 !important;
  }
`;
