// StyledComponents.js
import styled from "styled-components";

export const StyledTableWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #dcd6d6;
  margin-top: 40px;

  .ant-table-thead > tr > th {
    background-color: #f5f5f5;
    font-weight: bold;
  }

  .ant-pagination {
    display: flex;
    justify-content: flex-end;
  }
`;

export const StyledStatus = styled.span`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 15px;
  color: white;
  background-color: ${(props) => props.statusColor || "#d9d9d9"};
`;
