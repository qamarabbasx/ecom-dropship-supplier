// StyledComponents.js
import styled from "styled-components";

export const StyledTableWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #dcd6d6;
  margin-top: 40px;
  padding: 20px 0 32px;

  .ant-table-thead > tr > th {
    background-color: #f5f5f5;
    font-weight: bold;
  }

  .ant-pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    padding: 0 16px;
  }

  .ant-pagination-total-text {
    flex: 1;
    font-size: 14px;
    color: #8c8c8c;
  }

  .ant-pagination-prev,
  .ant-pagination-next {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    min-width: 32px;
    height: 32px;
  }

  .ant-pagination-item {
    display: none;
  }

  .loading-wrapper {
    display: flex;
    justify-content: center;
    padding: 40px 0;
  }
`;

export const StyledStatus = styled.span`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 15px;
  color: white;
  background-color: ${(props) => props.statusColor || "#d9d9d9"};
`;
