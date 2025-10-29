import styled from "styled-components";
import colors from "../../styles/colors";
export const Form = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
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

  &:hover {
    background-color: ${colors.buttonHover};
  }

  &:disabled {
    background-color: ${colors.buttonDisabled};
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 0.75rem;
  }
`;
