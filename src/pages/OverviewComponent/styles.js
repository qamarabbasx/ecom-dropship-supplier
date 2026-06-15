import styled from "styled-components";
import { media } from "../../theme/breakpoints";

export const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 100%;
  box-sizing: border-box;

  ${media.downMobile`
    padding: 0;
  `}
`;

export const StatisticContainer = styled.div`
  margin-bottom: 20px;
  .ant-row {
    justify-content: space-between;
  }
`;

export const TableContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 100%;

  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .ant-table-wrapper {
    width: 100%;
    max-width: 100%;
  }

  .ant-table {
    background: #fff;
    border-radius: 8px;

    .ant-table-thead > tr > th {
      background-color: #f5f5f5;
      white-space: nowrap;
    }

    .ant-table-tbody > tr > td {
      white-space: nowrap;
    }
  }

  ${media.downTablet`
    .ant-table-container {
      overflow-x: auto !important;
      -webkit-overflow-scrolling: touch;
    }
  `}
`;

export const OverviewHeader = styled.div`
  margin-top: 20px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const OverviewHeading = styled.h2`
  margin: 0;
  color: #2e2a40;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 111.111% */
`;
