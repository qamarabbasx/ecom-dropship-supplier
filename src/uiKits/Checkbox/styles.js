import { Checkbox } from "antd";
import styled from "styled-components";

export const AntCheckbox = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #ed6928;
    border-color: #ed6928;
  }
  &:hover {
    .ant-checkbox-inner {
      background-color: transparent !important;
      border-color: #ed6928 !important;
    }
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: #ed6928 !important;
      border-color: #ed6928 !important;
    }
  }
`;
