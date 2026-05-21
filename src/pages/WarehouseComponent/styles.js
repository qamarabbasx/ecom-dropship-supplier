import styled from "styled-components";

export const PageWrapper = styled.div`
  padding: 24px;
  background: #f9fafb;
  min-height: 100vh;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h1 {
    margin: 0;
    color: #2e2a40;
    font-size: 28px;
    font-weight: 600;
  }
`;

export const ToolbarContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

export const SearchInputWrapper = styled.div`
  flex: 1;
  min-width: 250px;

  .ant-input {
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    padding: 8px 12px;
    font-size: 14px;

    &:hover {
      border-color: #ff6b35;
    }

    &:focus {
      border-color: #ff6b35;
      box-shadow: 0 0 0 2px rgba(255, 107, 53, 0.1);
    }

    &::placeholder {
      color: #8c8c8c;
    }
  }
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 12px;

  button {
    padding: 8px 24px;
    border-radius: 4px;
    border: none;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;

    &.add-btn {
      background: #ff6b35;
      color: #ffffff;

      &:hover {
        background: #ff5520;
        box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
      }

      &:active {
        background: #e55100;
      }
    }

    &.export-btn {
      background: #ffffff;
      color: #262626;
      border: 1px solid #d9d9d9;

      &:hover {
        border-color: #ff6b35;
        color: #ff6b35;
      }
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;

export const ContentWrapper = styled.div`
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  overflow: hidden;
`;

export const FilterArea = styled.div`
  background: #fafafa;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;

  .filter-label {
    color: #595959;
    font-size: 14px;
    font-weight: 500;
  }

  .filter-chip {
    background: #f0f0f0;
    color: #262626;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 8px;

    .close-icon {
      cursor: pointer;
      color: #8c8c8c;
      font-weight: bold;

      &:hover {
        color: #ff6b35;
      }
    }
  }
`;

export const EmptyStateWrapper = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #8c8c8c;

  svg {
    font-size: 64px;
    color: #d9d9d9;
    margin-bottom: 20px;
  }

  h3 {
    color: #262626;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    margin-bottom: 24px;
  }

  button {
    padding: 8px 24px;
    background: #ff6b35;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    transition: all 0.3s ease;

    &:hover {
      background: #ff5520;
      box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
    }
  }
`;
