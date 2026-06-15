import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 24px;
  background: #ffffffff;
  min-height: 100vh;
`;

export const PageHeader = styled.div`
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

export const FormContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 32px;
`;

export const FormSection = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 24px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.columns === 1
      ? "1fr"
      : props.columns === 2
      ? "repeat(2, 1fr)"
      : "repeat(3, 1fr)"};
  gap: 20px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 1024px) {
    grid-template-columns: ${(props) =>
      props.columns === 3 ? "repeat(2, 1fr)" : "1fr"};
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #262626;
  margin-bottom: 8px;
`;

export const SubmitButton = styled.button`
  background: #ff6b35;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 32px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #ff8555;
  }

  &:active {
    background: #ff5520;
  }
`;
