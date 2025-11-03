import styled from "styled-components";
import { Button } from "antd";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const Section = styled.div`
  background-color: #fff;
  padding: 24px;
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const SaveButton = styled(Button)`
  background-color: #fa8c16;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  float: right;
  height: auto;

  &:hover {
    background-color: #d87a13 !important;
    color: #fff !important;
  }

  &.ant-btn-loading {
    background-color: #fa8c16;
  }
`;
