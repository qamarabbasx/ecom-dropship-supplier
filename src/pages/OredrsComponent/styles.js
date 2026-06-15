import styled from "styled-components";
import AntButton from "../../uiKits/Button";
import { media } from "../../theme/breakpoints";

export const MainContainer = styled.div`
  max-width: 100%;
`;

export const MainHeading = styled.h2`
  margin: 0;
  color: #2e2a40;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
`;

export const ProductsHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 30px;
  gap: 12px;
  flex-wrap: wrap;
  max-width: 100%;

  ${media.downTablet`
    flex-direction: column;
    align-items: stretch;
    margin-top: 20px;
  `}
`;

export const SearchRow = styled.div`
  flex: 1 1 280px;
  min-width: 0;
  max-width: 100%;

  .ant-input-search {
    width: 100% !important;
    max-width: 100%;
  }

  ${media.downTablet`
    flex: 1 1 100%;
    width: 100%;
  `}
`;

export const ActionsRow = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;

  ${media.downTablet`
    width: 100%;
    justify-content: flex-start;
  `}
`;

export const ToolbarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 16px;
  gap: 8px;
  flex-wrap: wrap;
  max-width: 100%;

  .ant-space {
    flex-wrap: wrap;
    max-width: 100%;
  }

  ${media.downMobile`
    justify-content: flex-start;

    .ant-picker {
      max-width: 100%;
      min-width: 0;
    }

    .ant-btn {
      flex-shrink: 0;
    }
  `}
`;

export const StyledButton = styled(AntButton)`
  font-size: 14px;
  height: 40px;
  padding: 4px 24px;
  background: #ff6b35;
  border-color: #ff6b35;
  white-space: nowrap;

  &:hover {
    background: #ff8555 !important;
    border-color: #ff8555 !important;
  }

  ${media.downTablet`
    width: 100%;
  `}
`;
