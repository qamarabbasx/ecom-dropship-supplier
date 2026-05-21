import styled from "styled-components";

export const ModalContent = styled.div`
  .ant-form {
    .ant-form-item-label > label {
      color: #262626;
      font-weight: 500;
      font-size: 14px;

      .ant-form-item-required::before {
        color: #ff6b35;
      }
    }

    .ant-form-item-control > .ant-control-content input,
    .ant-form-item-control > .ant-control-content textarea,
    .ant-select-selector {
      border-color: #d9d9d9 !important;
      border-radius: 4px;
      font-size: 14px;

      &:hover {
        border-color: #ff6b35 !important;
      }

      &:focus,
      &.ant-input-focused {
        border-color: #ff6b35 !important;
        box-shadow: 0 0 0 2px rgba(255, 107, 53, 0.1);
      }
    }

    .ant-select-focused .ant-select-selector {
      border-color: #ff6b35 !important;
      box-shadow: 0 0 0 2px rgba(255, 107, 53, 0.1);
    }
  }

  .form-buttons {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 24px;

    button {
      padding: 8px 24px;
      border-radius: 4px;
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;
      border: 1px solid #d9d9d9;
      transition: all 0.3s ease;

      &.submit-btn {
        background: #ff6b35;
        color: #ffffff;
        border-color: #ff6b35;

        &:hover {
          background: #ff5520;
          border-color: #ff5520;
          box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
        }

        &:disabled {
          background: #d9d9d9;
          border-color: #d9d9d9;
          cursor: not-allowed;
        }
      }

      &.cancel-btn {
        background: #ffffff;
        color: #262626;

        &:hover {
          border-color: #ff6b35;
          color: #ff6b35;
        }
      }
    }
  }
`;
