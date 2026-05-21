import styled from "styled-components";

export const TableWrapper = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.06);

  .ant-table {
    background: #ffffff;

    .ant-table-thead > tr > th {
      background: #fafafa;
      color: #595959;
      font-weight: 600;
      border-bottom: 1px solid #f0f0f0;
      padding: 12px 16px;
      font-size: 14px;
    }

    .ant-table-tbody > tr {
      &:hover > td {
        background: #fafafa;
      }

      > td {
        padding: 12px 16px;
        border-bottom: 1px solid #f0f0f0;
        color: #262626;
        font-size: 14px;
      }
    }

    .ant-table-pagination-left {
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .ant-pagination-item-active {
      border-color: #ff6b35;
      background: #ff6b35;

      a {
        color: #ffffff;
      }
    }

    .ant-pagination-item:hover a {
      color: #ff6b35;
    }

    .ant-pagination-prev:hover .ant-pagination-item-link,
    .ant-pagination-next:hover .ant-pagination-item-link {
      border-color: #ff6b35;
      color: #ff6b35;
    }
  }
`;

export const NoDataMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #8c8c8c;
  font-size: 14px;

  svg {
    font-size: 48px;
    color: #d9d9d9;
    margin-bottom: 16px;
  }
`;
