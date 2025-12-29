import { styled } from '@mui/material';

export const OrbitParamsContainer = styled('section')(
  ({ theme }) => `
  background: ${theme.palette.background.paper};
  padding: 1rem;
`,
);

export const ContainerGridContainer = styled('section')(
  ({ theme }) => `
  background: ${theme.palette.background.paper};
  
  display: grid;
  min-width: 300px;
  grid-template-columns: 50% 50%;

  h4 {
    grid-column-start: 1;
    grid-column-end: 3;
    margin: 0 0;
    color: ${theme.palette.secondary.light};
  }

  p {
    grid-column-start: 1;
    grid-column-end: 3;
  }
`,
);

export const ContainerGridItemContainer = styled('span')`
  display: flex;
  justify-content: center;
`;

export const ElementParam = styled('span')`
  font-weight: bold;
`;
