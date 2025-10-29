import styled from "styled-components";
import colors from "../../styles/colors";

export const Container = styled.div`
  margin-bottom: 2rem;
  padding: 0 1rem;
  position: relative;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${colors.label};
  font-weight: 600;
`;

export const Input = styled.input`
  width: 70%;
  padding: 0.75rem;
  padding-left: 2.5rem;
  border: 1px solid ${colors.border};
  border-radius: 25px;
  font-size: 1rem;
  background-color: ${colors.inputBg};
  /* ensure typed text is dark on white background */
  color: ${colors.inputText};

  &::placeholder {
    color: ${colors.placeholder};
    opacity: 1;
  }

  &:focus {
    outline: none;
    border-color: ${colors.buttonBg};
    box-shadow: 0 0 0 2px ${colors.focusRing};
  }
`;

export const Icon = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  svg {
    width: 16px;
    height: 16px;
    fill: ${colors.placeholder};
  }
`;
