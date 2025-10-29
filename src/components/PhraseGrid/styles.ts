import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;
  margin: 0 auto;
  max-width: 1200px;

  /* Desktop: 3 columns */
  grid-template-columns: repeat(3, 1fr);

  /* Tablet: 2 columns */
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    padding: 0.75rem;
  }

  /* Mobile: 1 column */
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 0.5rem;
    padding: 0.5rem;
  }
`;
