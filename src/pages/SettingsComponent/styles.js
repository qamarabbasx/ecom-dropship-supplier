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

export const StatusRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;
`;

export const StatusItem = styled.div`
  background: #fafafa;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 12px;
`;

export const StatusLabel = styled.div`
  font-size: 12px;
  color: #8c8c8c;
  margin-bottom: 4px;
`;

export const StatusValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1f1f1f;
`;
