import styled from "styled-components";
import colors from "../../styles/colors";

export const Card = styled.div`
  position: relative;
  padding: 1rem 3rem 1rem 1rem;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  background-color: ${colors.cardBackground};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const Text = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  word-wrap: break-word;
  color: ${colors.cardText};
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
  color: ${colors.deleteIcon};
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;

  z-index: 2;

  &:hover {
    background-color: ${colors.deleteHoverBg};
    color: ${colors.deleteHoverColor};
  }
`;
