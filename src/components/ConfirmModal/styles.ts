import styled from "styled-components";
import colors from "../../styles/colors";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #000000;

  h3 {
    margin: 0 0 1rem 0;
    font-size: 1.25rem;
    color: #000000;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

export const ModalButton = styled.button<{ variant?: "danger" | "secondary" | "primary" }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  ${({ variant }) => {
    if (variant === "danger") {
      return `
        background-color: #dc3545;
        color: white;
        &:hover {
          background-color: #c82333;
        }
      `;
    }
    if (variant === "primary") {
      return `
        background-color: ${colors.buttonBg};
        color: white;
        &:hover {
          background-color: ${colors.buttonHover};
        }
      `;
    }
    // secondary (default)
    return `
      background-color: #6c757d;
      color: white;
      &:hover {
        background-color: #5a6268;
      }
    `;
  }}

  &:focus {
    outline: 2px solid ${colors.buttonBg};
    outline-offset: 2px;
  }
`;

