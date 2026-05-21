import styled from "styled-components";

export const FilterPopoverContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 8px 0;
  min-width: 240px;
`;

export const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FilterLabel = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #262626;
  margin-bottom: 4px;
`;

export const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .ant-checkbox-wrapper {
    font-size: 14px;
    color: #595959;
    margin: 0;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #ff6b35;
    border-color: #ff6b35;
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: #ff6b35;
  }
`;

export const FilterButton = styled.button`
  width: 100%;
  height: 32px;
  background: #ff6b35;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 0px;
  transition: background 0.3s ease;

  &:hover {
    background: #ff8555;
  }

  &:active {
    background: #ff5520;
  }
`;
