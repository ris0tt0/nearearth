import { Paper, styled } from '@mui/material';
import React, { FC } from 'react';

const DetailRouteContainer = styled(Paper)`
  morgin: 0.5rem;
  padding: 0.5rem;
`;

const InformationStyledContainer = styled('div')`
  display: flex;
  gap: 1rem;
`;

export const NeoDetailInfo: FC<{
  name: string;
  type: string;
  spkid: string;
}> = ({ name, type, spkid }) => {
  return (
    <DetailRouteContainer>
      <h3>{name}</h3>
      <InformationStyledContainer>
        <div>Classification {type}</div>
        <div>SPKID {spkid}</div>
      </InformationStyledContainer>
    </DetailRouteContainer>
  );
};
