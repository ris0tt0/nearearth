import { Paper, styled, Tooltip } from '@mui/material';
import React, { FC } from 'react';
import { useLoaderData } from 'react-router-dom';
import { UnorderedListItemStyled } from '../../components/styled';
import {
  CloseApproachData,
  NearEarthObject,
  NearEarthObjectOrbitalData,
} from '../../db';

const DetailRouteContainer = styled(Paper)`
  morgin: 0.5rem;
  padding: 0.5rem;
`;

const InformationStyledContainer = styled('div')`
  display: flex;
  gap: 1rem;
`;

const CloseScrollerContainer = styled(Paper)`
  display: flex;
  height: 200px;
  width: 100%;
  overflow: scroll;
`;

const CloaseApproachContainer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const OrbitParamsContainer = styled('div')`
  padding: 0.5rem;
  margin: 0.5rem;
`;

const ConatinerGridContainer = styled('div')`
  display: inline-grid;
  min-width: 300px;
  grid-template-columns: 50% 50%;
`;

const ConatinerGridHeaderContainer = styled('div')(
  ({ theme }) => `
  display: flex;
  font-weight: bold;
  grid-column-start: 1;
  grid-column-end: 3;
  border-bottom: solid 1px ${theme.palette.primary.light};
`,
);

const ConatinerGridItemContainer = styled('div')`
  display: flex;
  justify-content: center;
`;

const ElementParam = styled('div')`
  font-weight: bold;
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

export const NeoOrbitParameters: FC<{ data: NearEarthObjectOrbitalData }> = ({
  data,
}) => {
  return (
    <OrbitParamsContainer>
      <ConatinerGridContainer>
        <ConatinerGridHeaderContainer>
          orbit params
        </ConatinerGridHeaderContainer>
        <ConatinerGridItemContainer>
          <Tooltip title="eccentricity">
            <ElementParam>e</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.eccentricity}
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          <Tooltip title="semi-major axis">
            <ElementParam>a</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.semi_major_axis}
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          <Tooltip title="perihelion distance">
            <ElementParam>q</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.perihelion_distance}
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          <Tooltip title="inclination; with respect to x-y ecliptic plane">
            <ElementParam> i</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.inclination}
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          <Tooltip title="longitude of the ascending node">
            <ElementParam>node</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.ascending_node_longitude}
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          <Tooltip title="argument of perihelion">
            <ElementParam>peri</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.perihelion_argument}
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          <Tooltip title="mean anomaly">
            <ElementParam>M</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.mean_anomaly}
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          <Tooltip title="time of perihelion passage">
            <ElementParam>tp</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.perihelion_time}
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          <Tooltip title="mean motion">
            <ElementParam>n</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.mean_motion}
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          <Tooltip title="aphelion distance">
            <ElementParam>Q</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.aphelion_distance}
        </ConatinerGridItemContainer>
      </ConatinerGridContainer>
    </OrbitParamsContainer>
  );
};

export const MiscellaneousParameters: FC<{
  data: NearEarthObjectOrbitalData;
}> = ({ data }) => {
  return (
    <OrbitParamsContainer>
      <ConatinerGridContainer>
        <ConatinerGridHeaderContainer>
          Miscellaneous
        </ConatinerGridHeaderContainer>
        <ConatinerGridItemContainer>
          <Tooltip title="number of observations (all types) used in fit">
            <ElementParam># obs. used (total)</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.observations_used}
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          <Tooltip title="number of days spanned by data-arc">
            <ElementParam>data-arc span</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.data_arc_in_days} days
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          <Tooltip title="date of first observation used in the fit">
            <ElementParam>first obs. used</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.first_observation_date}
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          <Tooltip title="date of last observation used in the fit">
            <ElementParam>last obs. used</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.last_observation_date}
        </ConatinerGridItemContainer>
      </ConatinerGridContainer>
    </OrbitParamsContainer>
  );
};

export const CloseApproachList: FC<{ cad: CloseApproachData[] }> = ({
  cad,
}) => {
  const items = cad.map((data) => {
    return (
      <UnorderedListItemStyled key={data.close_approach_date_full}>
        {data.close_approach_date} {data.orbiting_body}
      </UnorderedListItemStyled>
    );
  });

  return (
    <CloaseApproachContainer>
      <div>Close Approach Data</div>
      <CloseScrollerContainer>
        <ul>{items}</ul>
      </CloseScrollerContainer>
    </CloaseApproachContainer>
  );
};

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
      <CloseApproachList cad={neo.close_approach_data} />
    </ContainerStyled>
  );
};
