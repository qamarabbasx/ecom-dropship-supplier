import styled from "styled-components";

// Container for the table
export const StyledTableContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  margin-top: 40px;

  .ant-table {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
  }

  .ant-table-thead > tr > th {
    background-color: #f7f7f7;
    font-weight: bold;
  }

  .ant-table-tbody > tr > td {
    padding: 16px;
  }

  .ant-pagination {
    padding: 16px;
  }
`;
