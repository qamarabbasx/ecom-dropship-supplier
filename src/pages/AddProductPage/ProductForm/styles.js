import styled from "styled-components";
import AntButton from "../../../uiKits/Button";
import AntInput from "../../../uiKits/Input";
import AntSelect from "../../../uiKits/Select";
import AntTextArea from "../../../uiKits/TextArea";
import { media } from "../../../theme/breakpoints";

export const MainContainer = styled.div`
  width: 85%;
  max-width: 100%;
  margin: 0 auto;
  margin-top: 70px;
  box-sizing: border-box;

  ${media.downTablet`
    width: 100%;
    padding: 0 8px;
    margin-top: 32px;
  `}

  ${media.downMobile`
    padding: 0;
    margin-top: 24px;
  `}
`;

export const FirstRow = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  flex-wrap: wrap;

  ${media.downMobile`
    flex-direction: column;
    gap: 16px;
  `}
`;

export const InputWrapper = styled.div`
  width: 24%;
  min-width: 0;
  flex: 1 1 calc(25% - 15px);

  ${media.downTablet`
    flex: 1 1 calc(50% - 10px);
    width: calc(50% - 10px);
  `}

  ${media.downMobile`
    flex: 1 1 100%;
    width: 100%;
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

export const StyledInput = styled(AntInput)`
  height: 45px;
  background-color: #fff;
  width: 100%;
`;

export const StyledSelect = styled(AntSelect)`
  width: 100%;
  height: 45px;
`;

export const ImagesWrapper = styled.div`
  width: 100%;
  margin-top: 60px;
  .ant-upload-wrapper {
    padding: 20px;
    border: 1px dashed #b5b3b3;
  }
  .ant-upload-wrapper.ant-upload-picture-card-wrapper:hover {
    border-color: #ed6928;
  }

  ${media.downMobile`
    margin-top: 32px;
  `}
`;

export const DescriptionWrapper = styled.div`
  width: 100%;
  margin-top: 60px;

  ${media.downMobile`
    margin-top: 32px;
  `}
`;

export const StyledTextArea = styled(AntTextArea)``;

export const BottomContainer = styled.div`
  margin-top: 60px;
  display: flex;
  flex-wrap: wrap;
  gap: 3%;
  align-items: flex-start;

  ${media.downTablet`
    flex-direction: column;
    gap: 24px;
    margin-top: 40px;
  `}
`;

export const LeftCol = styled.div`
  width: 63%;
  min-width: 0;

  ${media.downTablet`
    width: 100%;
  `}
`;

export const RightCol = styled.div`
  width: 32%;
  min-width: 0;

  ${media.downTablet`
    width: 100%;
  `}
`;

export const FormActions = styled.div`
  width: 63%;
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;

  ${media.downTablet`
    width: 100%;
    margin-top: 0;
    order: 3;
  `}
`;

export const ProductOrganization = styled.div`
  border-radius: 5px;
  border: 1px solid #b5b3b3;
  padding: 20px;
`;

export const ProductMetaData = styled.div`
  border-radius: 5px;
  border: 1px solid #b5b3b3;
  padding: 20px;
  margin-top: 20px;
  background-color: #fff;
`;

export const StyledSaveButton = styled(AntButton)`
  padding: 14px 36px;
  background: #f88e48;
  border-color: #f88e48;
  color: #fff;
  &:hover, &:focus {
    background: #ef7a33;
    border-color: #ef7a33;
    color: #fff;
  }

  ${media.downMobile`
    width: 100%;
  `}
`;
