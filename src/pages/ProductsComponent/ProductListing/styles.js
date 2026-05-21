import styled from "styled-components";

export const TableWrapper = styled.div`
  /* Horizontal scroll on small screens */
  @media (max-width: 768px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    .ant-table {
      min-width: 700px;
      width: max-content;
      display: block;
    }
  }

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

  .ant-table-expanded-row > td {
    background-color: #fafafa;
    padding: 16px 24px !important;
  }

  .ant-table-expand-icon {
    width: auto;
    margin-right: 16px;
  }
`;

export const ExpandedRowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  div:first-child {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  strong {
    font-size: 13px;
    font-weight: 600;
    color: #1f1f1f;
    display: block;
    margin-bottom: 8px;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 13px;
    line-height: 1.5;
  }

  .ant-btn {
    font-size: 13px;
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
