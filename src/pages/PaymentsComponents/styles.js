import styled from "styled-components";
import AntButton from "../../uiKits/Button";
import { Select } from "antd";
import { media } from "../../theme/breakpoints";

const { Option } = Select;

export const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const CustomSelect = styled(Select)`
  width: 150px;
  min-width: 0;

  ${media.downMobile`
    width: 100%;
  `}

  .ant-select-selector {
    border: 1px solid #e0e0e0 !important;
    border-radius: 4px;
  }
`;

export const StyledOption = styled(Option)``;

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

export const FiltersRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  flex-shrink: 0;

  ${media.downTablet`
    width: 100%;
  `}
`;

export const StyledButton = styled(AntButton)`
  font-size: 14px;
  height: 40px;
  padding: 4px 24px;
`;
