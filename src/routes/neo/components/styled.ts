import { styled } from '@mui/material';

export const OrbitParamsContainer = styled('div')`
  padding: 0.5rem;
  margin: 0.5rem;
`;

export const ConatinerGridContainer = styled('div')`
  display: inline-grid;
  min-width: 300px;
  grid-template-columns: 50% 50%;
`;

export const ConatinerGridHeaderContainer = styled('div')(
  ({ theme }) => `
  display: flex;
  font-weight: bold;
  grid-column-start: 1;
  grid-column-end: 3;
  border-bottom: solid 1px ${theme.palette.primary.light};
`,
);

export const ConatinerGridItemContainer = styled('div')`
  display: flex;
  justify-content: center;
`;

export const ElementParam = styled('div')`
  font-weight: bold;
`;
