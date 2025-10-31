// UserFormStyles.js
import styled from "styled-components";
import { Button } from "antd";

export const UserFormWrapper = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 24px;

  h3 {
    font-weight: bold;
    font-size: 16px;
    color: #4a4a4a;
    margin-bottom: 24px;
  }

  .ant-form-item {
    display: inline-block;
    width: calc(50% - 12px);
    margin: 0 8px 16px 0;
  }

  .ant-form-item:nth-child(odd) {
    margin-right: 16px;
  }

  .ant-input,
  .ant-select-selector {
    border-radius: 4px;
    font-size: 14px;
  }

  .ant-select {
    width: 100%;
  }
`;

export const StyledButton = styled(Button)`
  display: block;
  margin-top: 24px;
  width: 150px;
  height: 40px;
  background-color: #f37021;
  border-color: #f37021;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;

  &:hover,
  &:focus {
    background-color: #e05e1a;
    border-color: #e05e1a;
  }
`;
