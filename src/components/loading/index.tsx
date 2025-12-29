import { LinearProgress, styled } from '@mui/material';
import React, { FC } from 'react';

const LoaderContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70vh;
`;

export const LoadingFull: FC = () => (
  <LoaderContainer>
    <LinearProgress sx={{ width: '200px' }} />
  </LoaderContainer>
);
