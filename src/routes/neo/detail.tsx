import { Paper, styled } from '@mui/material';
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
    <div>
      <div>orbit params</div>
      <div>eccentricity {data.eccentricity}</div>
      <div>semi_major_axis {data.semi_major_axis}</div>
      <div>perihelion_distance {data.perihelion_distance}</div>
      <div>inclination {data.inclination}</div>
      <div>ascending_node_longitude {data.ascending_node_longitude}</div>
      <div>perihelion_argument {data.perihelion_argument}</div>
      <div>mean_anomaly {data.mean_anomaly}</div>
      <div>perihelion_time {data.perihelion_time}</div>
      <div>orbital_period {data.orbital_period}</div>
      <div>mean_motion {data.mean_motion}</div>
      <div>aphelion_distance {data.aphelion_distance}</div>
    </div>
  );
};

export const MiscellaneousParameters: FC<{
  data: NearEarthObjectOrbitalData;
}> = ({ data }) => {
  return (
    <div>
      <div>Miscellaneous</div>
      <div>orbit_determination_date {data.orbit_determination_date}</div>
      <div>observations_used {data.observations_used}</div>
      <div>data_arc_in_days {data.data_arc_in_days} days</div>
      <div>first_observation_date {data.first_observation_date}</div>
      <div>last_observation_date {data.last_observation_date}</div>
    </div>
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

export const NeoDetailRoute: FC = () => {
  const neo = useLoaderData<NearEarthObject>();

  return (
    <div>
      <NeoDetailInfo
        name={neo.name}
        type={neo.orbital_data.orbit_class.orbit_class_type}
        spkid={neo.neo_reference_id}
      />
      <NeoOrbitParameters data={neo.orbital_data} />
      <MiscellaneousParameters data={neo.orbital_data} />
      <CloseApproachList cad={neo.close_approach_data} />
    </div>
  );
};
