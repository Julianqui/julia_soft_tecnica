import styled from "styled-components";
import colors from "../../styles/colors";

export const Card = styled.div`
  position: relative;
  padding: 1.25rem 3rem 1.25rem 1.5rem;
  border: 1px solid ${colors.border};
  border-radius: 12px;
  background-color: ${colors.cardBackground};
  box-shadow: ${colors.shadowSm};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${colors.shadowMd};
    border-color: ${colors.borderDark};
  }

  &:focus {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }
`;

export const Text = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.6;
  word-wrap: break-word;
  color: ${colors.textPrimary};
  overflow-wrap: anywhere;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 400;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 28px;
  height: 28px;
  border: none;
  background-color: transparent;
  color: ${colors.deleteIcon};
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;

  &:hover {
    background-color: ${colors.deleteHoverBg};
    color: ${colors.deleteHoverColor};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }
`;
