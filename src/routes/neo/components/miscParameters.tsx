import { styled, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';
import { NearEarthObject, NearEarthObjectOrbitalData } from '../../../db';
import {
  ContainerGridContainer,
  ContainerGridItemContainer,
  ElementParam,
  OrbitParamsContainer,
} from './styled';
import { GridTwoColumnLoader } from '../../../loaders';
import Logger from 'js-logger';
import { NavLinkStyled } from '../../../components/styled';
import { format } from 'date-fns';

const HazardContainer = styled('div')(
  ({ theme }) => `
    display: flex;
    width: 100%;
    
    .hazard {
      display: flex;
      width: 100%;
      justify-content: center;
      background: ${theme.palette.warning.dark};
      color: ${theme.palette.warning.contrastText};
    }

    .not-hazard {
      display: flex;
      width: 100%;
      justify-content: center;
    }`,
);

export const MiscellaneousParameters: FC<{
  loading: boolean;
  data?: NearEarthObject;
}> = ({ loading, data }) => {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down('sm'));
  const medium = useMediaQuery(theme.breakpoints.down('md'));

  const firstObservation = new Date(
    data?.orbital_data?.first_observation_date ?? 0,
  );
  const firstDate = medium
    ? format(firstObservation, 'M/d/Y h:mm bbb')
    : format(firstObservation, 'LLL do Y h:mm bbb');

  const lastObservation = new Date(
    data?.orbital_data?.last_observation_date ?? 0,
  );
  const lastDate = medium
    ? format(lastObservation, 'M/d/Y h:mm bbb')
    : format(lastObservation, 'LLL do Y h:mm bbb');

  return (
    <OrbitParamsContainer>
      <ContainerGridContainer>
        <h4>Miscellaneous Data</h4>
        <p>
          Provides additional reference details such as absolute magnitude,
          hazard classification, observation history, and links to official NASA
          resources.
        </p>
        {loading ? (
          <GridTwoColumnLoader />
        ) : (
          <>
            <ContainerGridItemContainer>
              <Tooltip
                title="number of observations (all types) used in fit"
                placement="top"
              >
                <ElementParam>Observations (total)</ElementParam>
              </Tooltip>
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              {data?.orbital_data?.observations_used ?? ''}
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              <Tooltip
                title="is potentially hazardous asteroid"
                placement="top"
              >
                <ElementParam>Hazardous</ElementParam>
              </Tooltip>
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              <HazardContainer>
                {data?.is_potentially_hazardous_asteroid ? (
                  <div className="hazard">yes</div>
                ) : (
                  <div className="not-hazard">no</div>
                )}
              </HazardContainer>
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              <Tooltip
                title="absolute magnitude, at 1 au from Sun and observer"
                placement="top"
              >
                <ElementParam>Absolute Magnitude</ElementParam>
              </Tooltip>
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              {data?.absolute_magnitude_h ?? ''}
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              <Tooltip
                title="number of days spanned by data-arc"
                placement="top"
              >
                <ElementParam>Data-arc Span</ElementParam>
              </Tooltip>
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              {data?.orbital_data?.data_arc_in_days ?? ''} days
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              <Tooltip
                title="date of first observation used in the fit"
                placement="top"
              >
                <ElementParam>First Obs. Used</ElementParam>
              </Tooltip>
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>{firstDate}</ContainerGridItemContainer>
            <ContainerGridItemContainer>
              <Tooltip
                title="date of last observation used in the fit"
                placement="top"
              >
                <ElementParam>Last Obs. Used</ElementParam>
              </Tooltip>
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>{lastDate}</ContainerGridItemContainer>
            <ContainerGridItemContainer>
              <Tooltip title="nasa jpl resource url" placement="top">
                <ElementParam>Nasa JPL URL</ElementParam>
              </Tooltip>
            </ContainerGridItemContainer>
            <ContainerGridItemContainer>
              <NavLinkStyled to={data?.nasa_jpl_url ?? ''} target="_blank">
                link
              </NavLinkStyled>
            </ContainerGridItemContainer>
          </>
        )}
      </ContainerGridContainer>
    </OrbitParamsContainer>
  );
};
