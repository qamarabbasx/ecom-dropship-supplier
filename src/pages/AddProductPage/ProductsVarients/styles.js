import styled from "styled-components";
import AntButton from "../../../uiKits/Button";
import AntInput from "../../../uiKits/Input";

export const MainContainer = styled.div`
  border: 1px solid #b5b3b3;
  border-radius: 5px;
`;

export const StyledButton = styled(AntButton)``;

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
  .react-tagsinput {
    border: 1px solid #bdbdbd;
    border-radius: 6px;
  }
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
`;
export const OptionValues = styled.div`
  width: 70%;
  .react-tagsinput-tag {
    background-color: #f2f2f2;
    border-radius: 10px;
    border: 1px solid #f2f2f2;
  }
`;

export const IconWrapper = styled.span`
  padding-bottom: 5px;
  cursor: pointer;
`;

export const VariantsWrapper = styled.div`
  margin-top: 10px;
  padding: 20px;
`;
