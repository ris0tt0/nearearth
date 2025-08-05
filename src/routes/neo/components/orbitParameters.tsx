import { Tooltip } from '@mui/material';
import React, { FC } from 'react';
import { NearEarthObjectOrbitalData } from '../../../db';
import {
  ConatinerGridContainer,
  ConatinerGridHeaderContainer,
  ConatinerGridItemContainer,
  ElementParam,
  OrbitParamsContainer,
} from './styled';

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
          <Tooltip title="eccentricity" placement="top">
            <ElementParam>e</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.eccentricity}
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          <Tooltip title="semi-major axis" placement="top">
            <ElementParam>a</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.semi_major_axis}
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          <Tooltip title="perihelion distance" placement="top">
            <ElementParam>q</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.perihelion_distance}
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          <Tooltip
            title="inclination; with respect to x-y ecliptic plane"
            placement="top"
          >
            <ElementParam> i</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.inclination}
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          <Tooltip title="longitude of the ascending node" placement="top">
            <ElementParam>node</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.ascending_node_longitude}
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          <Tooltip title="argument of perihelion" placement="top">
            <ElementParam>peri</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.perihelion_argument}
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          <Tooltip title="mean anomaly" placement="top">
            <ElementParam>M</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.mean_anomaly}
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          <Tooltip title="time of perihelion passage" placement="top">
            <ElementParam>tp</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.perihelion_time}
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          <Tooltip title="mean motion" placement="top">
            <ElementParam>n</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.mean_motion}
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          <Tooltip title="aphelion distance" placement="top">
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
