import styled from "styled-components";
import colors from "../../styles/colors";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 420px;
  width: 100%;
  box-shadow: ${colors.shadowXl};
  color: ${colors.textPrimary};
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  h3 {
    margin: 0 0 1.25rem 0;
    font-size: 1.375rem;
    font-weight: 600;
    color: ${colors.textPrimary};
    letter-spacing: -0.01em;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

export const ModalButton = styled.button<{ variant?: "danger" | "secondary" | "primary" }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${colors.shadowSm};

  ${({ variant }) => {
    if (variant === "danger") {
      return `
        background: linear-gradient(135deg, ${colors.danger} 0%, ${colors.dangerHover} 100%);
        color: white;
        &:hover {
          transform: translateY(-1px);
          box-shadow: ${colors.shadowMd};
        }
      `;
    }
    if (variant === "primary") {
      return `
        background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%);
        color: white;
        &:hover {
          transform: translateY(-1px);
          box-shadow: ${colors.shadowMd};
        }
      `;
    }
    // secondary (default)
    return `
      background-color: ${colors.borderLight};
      color: ${colors.textSecondary};
      &:hover {
        background-color: ${colors.border};
        color: ${colors.textPrimary};
      }
    `;
  }}

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }
`;

