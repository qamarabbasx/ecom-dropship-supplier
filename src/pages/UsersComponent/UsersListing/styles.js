import styled from "styled-components";

// Container for the table
export const StyledTableContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  margin-top: 40px;
  padding: 20px 0 32px;

  .ant-table {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: #fff;
  }

  .ant-table-thead > tr > th {
    background-color: #fafafa;
    font-weight: 600;
    font-size: 14px;
    color: #595959;
    border-bottom: 1px solid #f0f0f0;
    padding: 16px;
  }

  .ant-table-tbody > tr > td {
    vertical-align: middle;
    font-size: 14px;
    color: #262626;
    border-bottom: 1px solid #f0f0f0;
    padding: 16px;
  }

  .ant-table-tbody > tr:hover > td {
    background: #fafafa;
  }

  /* Pagination Styling */
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
`;
