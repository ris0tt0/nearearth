import { styled } from '@mui/material';
import React, { FC } from 'react';
import { useLoaderData } from 'react-router-dom';
import { NearEarthObject } from '../../db';
import { CloseApproachDataList } from './components/closeApproachList';
import { NeoDetailInfo } from './components/headerInfoDetail';
import { NeoOrbitParameters } from './components/orbitParameters';
import { MiscellaneousParameters } from './components/miscParameters';

const ContainerStyled = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const NeoParamsContainer = styled('div')(({ theme }) => {
  return {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
    border: `1px ${theme.palette.primary.dark} solid`,
  };
});

export const NeoDetailRoute: FC = () => {
  const neo = useLoaderData<NearEarthObject>();

  return (
    <ContainerStyled>
      <NeoDetailInfo
        name={neo.name}
        type={neo.orbital_data.orbit_class.orbit_class_type}
        spkid={neo.neo_reference_id}
      />
      <NeoParamsContainer>
        <NeoOrbitParameters data={neo.orbital_data} />
        <MiscellaneousParameters data={neo.orbital_data} />
      </NeoParamsContainer>
      <CloseApproachDataList cad={neo.close_approach_data} />
    </ContainerStyled>
  );
};
