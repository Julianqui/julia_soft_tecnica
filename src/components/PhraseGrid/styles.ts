import styled from "styled-components";
import colors from "../../styles/colors";

export const Grid = styled.div`
  display: grid;
  gap: 1.25rem;
  padding: 0;
  margin: 0;

  /* Desktop: 2 columns for better readability */
  grid-template-columns: repeat(2, 1fr);

  /* Tablet: 2 columns */
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  /* Mobile: 1 column */
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 0.875rem;
  }
`;

export const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem 2rem;
  color: ${colors.textSecondary};
  font-size: 1rem;
  font-weight: 500;
  background: linear-gradient(135deg, ${colors.borderLight} 0%, ${colors.border} 100%);
  border-radius: 12px;
  border: 2px dashed ${colors.borderDark};
`;
