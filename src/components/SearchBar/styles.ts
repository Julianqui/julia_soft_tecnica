import styled from "styled-components";
import colors from "../../styles/colors";

export const Container = styled.div`
  margin-bottom: 1.5rem;
  padding: 0;
  position: relative;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.625rem;
  color: ${colors.label};
  font-weight: 600;
  font-size: 0.9375rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1.125rem;
  border: 2px solid ${colors.border};
  border-radius: 10px;
  font-size: 0.9375rem;
  background-color: ${colors.inputBg};
  color: ${colors.inputText};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &::placeholder {
    color: ${colors.placeholder};
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
`;

