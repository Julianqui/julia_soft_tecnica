import styled from "styled-components";
import colors from "../../styles/colors";

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 0;
  padding: 0;

  @media (max-width: 600px) {
    padding: 0;
  }
`;

export const Input = styled.input`
  flex: 1;
  padding: 0.875rem 1.125rem;
  border: 2px solid ${colors.border};
  border-radius: 10px;
  font-size: 0.9375rem;
  color: ${colors.formInputText};
  background-color: ${colors.formInputBg};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &::placeholder {
    color: ${colors.formPlaceholder};
    opacity: 0.7;
  }

  &:hover {
    border-color: ${colors.borderDark};
  }

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 4px ${colors.focusRing};
    background-color: ${colors.cardBackground};
  }

  &[aria-invalid="true"] {
    border-color: ${colors.danger};
  }
`;

export const CharCount = styled.span<{ $isNearLimit: boolean; $isOverLimit: boolean }>`
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${({ $isNearLimit, $isOverLimit }) =>
    $isOverLimit ? colors.danger : $isNearLimit ? "#ea580c" : colors.textSecondary};
  text-align: right;
  margin-top: -0.25rem;
  padding-right: 0.25rem;
`;

export const ErrorMessage = styled.div`
  color: ${colors.danger};
  font-size: 0.8125rem;
  font-weight: 500;
  margin-top: -0.25rem;
  padding: 0.5rem 0.75rem;
  background-color: ${colors.dangerLight};
  border-radius: 8px;
  border-left: 3px solid ${colors.danger};
`;

export const Button = styled.button`
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%);
  color: ${colors.buttonText};
  border: none;
  border-radius: 10px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  align-self: flex-start;
  box-shadow: ${colors.shadowSm};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${colors.shadowMd};
    background: linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: ${colors.buttonDisabled};
    color: ${colors.textTertiary};
    cursor: not-allowed;
    box-shadow: none;
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 0.875rem;
  }
`;
