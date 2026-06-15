import styled from "styled-components";
import { media } from "../../../theme/breakpoints";

export const TableWrapper = styled.div`
  padding: 20px 0 32px;
  margin-top: 20px;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  .loading-wrapper {
    display: flex;
    justify-content: center;
    padding: 40px 0;
  }

  .ant-table {
    background: #fff;
    border-radius: 8px;
    border: 1px solid #f0f0f0;
  }

  ${media.upDesktop`
    .ant-table {
      width: 100%;
    }
  `}

  ${media.downTablet`
    .ant-table {
      min-width: 640px;
    }
  `}

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

  /* Status Tag Styling */
  .ant-tag {
    border-radius: 4px;
    border: none;
    font-size: 13px;
    padding: 4px 12px;
    min-width: 120px;
    text-align: center;
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

  .ant-table-selection-column {
    padding-left: 16px;
  }
  
  .ant-checkbox-wrapper {
    margin: 0;
  }
`;

export const OrdersHeader = styled.div`
  margin-bottom: 24px;
  h2 {
    margin: 0 0 4px;
    font-size: 22px;
    font-weight: 600;
  }
`;

export const Subtitle = styled.p`
  margin: 0 0 20px;
  color: #555;
  font-size: 12px;
`;

export const Tabs = styled.div`
  display: flex;
  gap: 32px;
  border-bottom: 1px solid #ececec;
  margin-bottom: 16px;
`;

export const TabButton = styled.button`
  background: none;
  border: none;
  padding: 0 0 12px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  color: ${(p) => (p.$active ? "#000" : "#777")};

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: ${(p) => (p.$active ? "100%" : "0")};
    background: #ff8c00;
    transition: width 0.25s ease;
  }
`;
