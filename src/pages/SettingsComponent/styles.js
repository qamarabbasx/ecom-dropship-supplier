import styled from "styled-components";
import { Button } from "antd";
import { media } from "../../theme/breakpoints";

export const Container = styled.div`
  max-width: min(800px, 100%);
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;

  ${media.downMobile`
    padding: 16px;
  `}
`;

export const Section = styled.div`
  background-color: #fff;
  padding: 24px;
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  ${media.downMobile`
    padding: 16px;
  `}
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
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  ${media.downMobile`
    grid-template-columns: 1fr;
    gap: 12px;
  `}
`;

export const StatusItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StatusLabel = styled.span`
  font-size: 13px;
  color: #8c8c8c;
`;

export const StatusValue = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: #262626;
`;

export const StripeActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  flex-wrap: wrap;
  width: 100%;
  clear: both;

  .ant-btn {
    float: none;
    margin: 0;
    height: auto;
    white-space: normal;
    text-align: center;
  }

  ${media.downMobile`
    flex-direction: column;
    align-items: stretch;

    .ant-btn {
      width: 100%;
    }
  `}
`;

export const StripeRefreshButton = styled(Button)`
  height: auto;
  white-space: normal;
`;

export const StripeConnectButton = styled(SaveButton)`
  float: none;
  height: auto;
  white-space: normal;
`;
