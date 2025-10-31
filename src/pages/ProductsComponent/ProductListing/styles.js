import styled from "styled-components";

export const TableWrapper = styled.div`
  .ant-table {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
  }

  .ant-table-thead > tr > th {
    background-color: #f9fafb;
    font-weight: 600;
  }

  .ant-table-tbody > tr > td {
    vertical-align: middle;
  }

  .ant-pagination {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }
`;

export const ActionIcons = styled.div`
  display: flex;
  justify-content: space-around;

  svg {
    cursor: pointer;
    &:hover {
      color: #1890ff;
    }
  }
`;
