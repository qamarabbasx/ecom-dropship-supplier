import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 24px;
  background: #f5f5f5;
  min-height: 100vh;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`;

export const Breadcrumb = styled.div`
  font-size: 12px;
  color: #8c8c8c;
  margin-bottom: 8px;
`;

export const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #262626;
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

export const ActionButton = styled.button`
  padding: 8px 16px;
  border: 1px solid ${props => props.danger ? "#ff4d4f" : "#d9d9d9"};
  background: #fff;
  color: ${props => props.danger ? "#ff4d4f" : "#262626"};
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.danger ? "#ff7875" : "#40a9ff"};
    color: ${props => props.danger ? "#ff7875" : "#40a9ff"};
  }
`;

export const ContentContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 24px;
`;

export const DetailsSection = styled.div`
  margin-top: 16px;
`;

export const ProductTable = styled.div`
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
`;

export const TableHeader = styled.div`
  display: flex;
  background: #fafafa;
  padding: 12px 16px;
  font-weight: 600;
  font-size: 13px;
  color: #595959;
  border-bottom: 1px solid #f0f0f0;
`;

export const ProductRow = styled.div`
  display: flex;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.div`
  width: ${props => props.width || "auto"};
  font-size: 14px;
  color: #262626;
`;

export const ProductImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 6px;
  background: #f5f5f5;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SummarySection = styled.div`
  max-width: 400px;
  margin-left: auto;
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  margin-bottom: 24px;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
`;

export const SummaryLabel = styled.span`
  color: #595959;
`;

export const SummaryValue = styled.span`
  color: #262626;
  font-weight: 500;
`;

export const GrandTotal = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  margin-top: 12px;
  border-top: 2px solid #f0f0f0;
`;

export const AddressSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const AddressCard = styled.div`
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  background: #fafafa;
`;

export const AddressTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AddressText = styled.div`
  font-size: 13px;
  color: #595959;
  line-height: 1.6;
`;

export const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  background-color: ${props => props.color};
  color: ${props => props.textColor};
`;
