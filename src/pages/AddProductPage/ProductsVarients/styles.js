import styled from "styled-components";
import AntButton from "../../../uiKits/Button";
import AntInput from "../../../uiKits/Input";
import { media } from "../../../theme/breakpoints";

export const MainContainer = styled.div`
  border: 1px solid #b5b3b3;
  border-radius: 5px;
`;

export const StyledButton = styled(AntButton)``;
export const OrangeButton = styled(AntButton)`
  background: #f88e48;
  border-color: #f88e48;
  color: #fff;
  &:hover, &:focus {
    background: #ef7a33;
    border-color: #ef7a33;
    color: #fff;
  }
`;

export const StyledInput = styled(AntInput)`
  background: #fff;
  line-height: 2;
`;

export const FirstRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid #b5b3b3;
  svg {
    cursor: pointer;
  }
`;

export const StyledHeading = styled.h3`
  color: #1e293b;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 0px;
`;

export const OptionForm = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  padding: 20px;
  gap: 16px;
  flex-wrap: wrap;
  .react-tagsinput {
    border: 1px solid #bdbdbd;
    border-radius: 6px;
  }

  ${media.downMobile`
    flex-direction: column;
    align-items: stretch;
    padding: 16px;
  `}
`;

export const StyledLabel = styled.h3`
  color: var(--black-fonts-headings, #2d2e2e);
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const OptionNames = styled.div`
  width: 20%;
  min-width: 0;

  ${media.downMobile`
    width: 100%;
  `}
`;
export const OptionValues = styled.div`
  width: 70%;
  min-width: 0;
  flex: 1;

  ${media.downMobile`
    width: 100%;
  `}
  .react-tagsinput-tag {
    background-color: #f2f2f2;
    border-radius: 10px;
    border: 1px solid #f2f2f2;
    display: inline-flex;
    margin-right: 8px;
    padding: 6px 10px;
    gap: 6px;
  }
`;

export const IconWrapper = styled.span`
  padding-bottom: 5px;
  cursor: pointer;
`;

export const VariantsWrapper = styled.div`
  margin-top: 10px;
  padding: 20px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  ${media.downMobile`
    padding: 12px;
  `}

  .ant-table {
    font-size: 16px;
  }

  .ant-table-thead > tr > th {
    background-color: #f9fafb;
    color: #1f2937;
    font-weight: 600;
    font-size: 16px;
    border-bottom: 2px solid #e5e7eb;
    padding: 16px;
  }

  .ant-table-tbody > tr > td {
    padding: 16px;
    vertical-align: middle;
  }

  .ant-table-tbody > tr:hover > td {
    background-color: #f9fafb;
  }

  .ant-upload-wrapper.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select {
    border: 2px dashed #f88e48;
    border-radius: 8px;
    background-color: #fff;
  }

  .ant-upload-wrapper.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select:hover {
    border-color: #f88e48;
  }

  .variants-empty {
    margin-top: 16px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 12px;
    background: #fff;
  }

  .variants-empty-row {
    display: flex;
    gap: 16px;
    align-items: center;
    flex-wrap: wrap;
  }

  .variants-empty-row > div {
    padding: 12px;
    background: #fafafa;
    border-radius: 6px;
    min-width: 80px;
    text-align: left;
    color: #6b7280;
    font-size: 14px;
  }
`;
