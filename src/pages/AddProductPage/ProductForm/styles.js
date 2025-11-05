import styled from "styled-components";
import AntButton from "../../../uiKits/Button";
import AntInput from "../../../uiKits/Input";
import AntSelect from "../../../uiKits/Select";
import AntTextArea from "../../../uiKits/TextArea";

export const MainContainer = styled.div`
  width: 85%;
  margin: 0 auto;
  margin-top: 70px;
`;

export const FirstRow = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;

export const InputWrapper = styled.div`
  width: 24%;
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
`;

export const DescriptionWrapper = styled.div`
  width: 100%;
  margin-top: 60px;
`;

export const StyledTextArea = styled(AntTextArea)``;

export const BottomContainer = styled.div`
  margin-top: 60px;
  display: flex;
  gap: 3%;
`;

export const LeftCol = styled.div`
  width: 63%;
`;

export const RightCol = styled.div`
  width: 32%;
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
  padding: 30px 100px;
  margin-top: 40px;
`;
