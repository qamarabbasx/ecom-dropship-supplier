import styled from "styled-components";

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 40px;
  margin-top: 40px;

  .ant-btn {
    background-color: #f9fafb;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    font-weight: 500;

    &:hover {
      border-color: #1890ff;
      color: #1890ff;
    }
  }

  .ant-picker {
    border-radius: 6px;
    border: 1px solid #d9d9d9;

    .ant-picker-suffix {
      color: #5a5a5a;
    }
  }
`;
