import styled from "styled-components";
import colors from "../../styles/colors";

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 1rem;

  @media (max-width: 600px) {
    padding: 0.75rem;
  }
`;

export const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid ${colors.border};
  border-radius: 25px;
  font-size: 1rem;
  color: ${colors.formInputText};
  background-color: ${colors.formInputBg};

  &::placeholder {
    color: ${colors.formPlaceholder};
    opacity: 1;
  }

  &:focus {
    outline: none;
    border-color: ${colors.buttonBg};
    box-shadow: 0 0 0 2px ${colors.focusRing};
  }

  &[aria-invalid="true"] {
    border-color: #dc3545;
  }
`;

export const CharCount = styled.span<{ $isNearLimit: boolean; $isOverLimit: boolean }>`
  font-size: 0.875rem;
  color: ${({ $isNearLimit, $isOverLimit }) =>
    $isOverLimit ? "#dc3545" : $isNearLimit ? "#ffc107" : colors.cardText};
  text-align: right;
  margin-top: -0.25rem;
  padding-right: 0.5rem;
`;

export const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: -0.25rem;
  padding-left: 0.75rem;
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${colors.buttonBg};
  color: ${colors.label};
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  align-self: flex-start;

  &:hover:not(:disabled) {
    background-color: ${colors.buttonHover};
  }

  &:disabled {
    background-color: ${colors.buttonDisabled};
    cursor: not-allowed;
  }

  &:focus {
    outline: 2px solid ${colors.buttonBg};
    outline-offset: 2px;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 0.75rem;
  }
`;
