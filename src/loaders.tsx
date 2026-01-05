import {
  Skeleton,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { FC } from 'react';

const GridFourColumnSection = styled('section')(
  ({ theme }) => `
    display: grid;
    background: ${theme.palette.background.paper};
    grid-template-columns: 25% 25% 25% 25%;
    grid-template-rows: auto;
    margin-bottom: 1rem;
`,
);

const GridTwoColumnSection = styled('section')(
  ({ theme }) => `
    display: grid;
    background: ${theme.palette.background.paper};
    grid-template-columns: 25% 25%;
    grid-template-rows: auto;
    margin-bottom: 1rem;
`,
);

const GridHeader: FC = () => (
  <Typography variant="h3" sx={{ margin: '1rem' }}>
    <Skeleton />
  </Typography>
);

const GridItem: FC = () => {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down('sm'));

  return <Skeleton sx={{ margin: small ? '0 0.5rem' : '0 3rem' }} />;
};

export const GridTwoColumnLoader: FC = () => {
  return (
    <>
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
    </>
  );
};

export const GridFourColumnLoader: FC = () => {
  return (
    <GridFourColumnSection>
      <GridHeader />
      <GridHeader />
      <GridHeader />
      <GridHeader />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
    </GridFourColumnSection>
  );
};
