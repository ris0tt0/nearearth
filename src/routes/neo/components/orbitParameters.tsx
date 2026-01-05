import { Tooltip } from '@mui/material';
import React, { FC } from 'react';
import { NearEarthObjectOrbitalData } from '../../../db';
import {
  ContainerGridContainer,
  ContainerGridItemContainer,
  ElementParam,
  OrbitParamsContainer,
} from './styled';
import { GridTwoColumnLoader } from '../../../loaders';
import Logger from 'js-logger';

export const NeoOrbitParameters: FC<{
  loading: boolean;
  data?: NearEarthObjectOrbitalData;
}> = ({ loading, data }) => {
  Logger.info('neo orbit', data);
  return (
    <OrbitParamsContainer>
      <ContainerGridContainer>
        <h4>Orbit parameters</h4>
        <p>
          Displays the key orbital elements that define the NEO's path around
          the Sun, including its shape, orientation, and orbital period.
        </p>
        {loading ? (
          <GridTwoColumnLoader />
        ) : (
          <>
            <ContainerGridItemContainer>
              <Tooltip title="eccentricity" placement="top">
                <ElementParam>e</ElementParam>
              </Tooltip>
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              {data?.eccentricity ?? ''}
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              <Tooltip title="semi-major axis" placement="top">
                <ElementParam>a</ElementParam>
              </Tooltip>
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              {data?.semi_major_axis ?? ''}
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              <Tooltip title="perihelion distance" placement="top">
                <ElementParam>q</ElementParam>
              </Tooltip>
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              {data?.perihelion_distance ?? ''}
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              <Tooltip
                title="inclination; with respect to x-y ecliptic plane"
                placement="top"
              >
                <ElementParam> i</ElementParam>
              </Tooltip>
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              {data?.inclination ?? ''}
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              <Tooltip title="longitude of the ascending node" placement="top">
                <ElementParam>node</ElementParam>
              </Tooltip>
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              {data?.ascending_node_longitude ?? ''}
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              <Tooltip title="argument of perihelion" placement="top">
                <ElementParam>peri</ElementParam>
              </Tooltip>
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              {data?.perihelion_argument ?? ''}
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              <Tooltip title="mean anomaly" placement="top">
                <ElementParam>M</ElementParam>
              </Tooltip>
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              {data?.mean_anomaly ?? ''}
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              <Tooltip title="time of perihelion passage" placement="top">
                <ElementParam>tp</ElementParam>
              </Tooltip>
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              {data?.perihelion_time ?? ''}
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              <Tooltip title="mean motion" placement="top">
                <ElementParam>n</ElementParam>
              </Tooltip>
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              {data?.mean_motion ?? ''}
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              <Tooltip title="aphelion distance" placement="top">
                <ElementParam>Q</ElementParam>
              </Tooltip>
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              {data?.aphelion_distance ?? ''}
            </ContainerGridItemContainer>
          </>
        )}
      </ContainerGridContainer>
    </OrbitParamsContainer>
  );
};
