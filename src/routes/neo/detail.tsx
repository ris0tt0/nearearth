import { Box, Skeleton, styled, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NeoParams } from '..';
import { NearEarthObject } from '../../db';
import { useCommands } from '../../hooks/useCommands';
import { CloseApproachDataList } from './components/closeApproachList';
import { MiscellaneousParameters } from './components/miscParameters';
import { NeoOrbitParameters } from './components/orbitParameters';

const ContainerStyled = styled('main')(
  ({ theme }) => `
  display: flex;
  flex-direction: column;

  h2 {
    color: ${theme.palette.secondary.light};
    margin-bottom: 0;
  }

  h3 {
    color: ${theme.palette.secondary.light};
    margin-top: 0;
  }
`,
);

const NeoParamsContainer = styled('div')`
  display: flex;
  width: 100%;
`;

export const NeoDetailRoute: FC = () => {
  const commands = useCommands();
  const { neoId } = useParams<NeoParams>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [neoData, setNeoData] = useState<NearEarthObject | null>(null);

  useEffect(() => {
    if (neoId) {
      setIsLoading(true);
      commands
        .requestNeo(neoId)
        .then((neo) => {
          setNeoData(neo);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [neoId]);

  if (error)
    return (
      <ContainerStyled>
        <Box sx={{ height: 600 }}>
          <h2>Error loading the Near Earth Object</h2>
          <p>
            This is usually because the SPK-ID is not correct and/or not found
            in the NEO Lookup.
          </p>
        </Box>
      </ContainerStyled>
    );

  return (
    <ContainerStyled>
      {isLoading ? (
        <Typography variant="h2" width={150}>
          <Skeleton />
        </Typography>
      ) : (
        <h2>{neoData?.name}</h2>
      )}
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
          <h3>Classification:</h3>
          {isLoading ? (
            <Skeleton width={100} />
          ) : (
            <p>{neoData?.orbital_data.orbit_class.orbit_class_type}</p>
          )}
        </Box>
        <Box
          sx={{ display: 'flex', marginLeft: '1rem', alignItems: 'baseline' }}
        >
          <h3>SPKID:</h3>
          {isLoading ? (
            <Skeleton width={100} />
          ) : (
            <p>{neoData?.neo_reference_id}</p>
          )}
        </Box>
      </Box>
      <p>
        The central NEO Detail page presents a comprehensive view of an
        asteroid's trajectory and physical characteristics.{' '}
        <strong>Orbit Parameters</strong> describe the object's path around the
        Sun, including orbital elements such as eccentricity, semi-major axis,
        inclination, and orbital period, which together define the shape and
        behavior of the asteroid's orbit. <strong>Miscellaneous Data</strong>{' '}
        provides additional reference information, including absolute magnitude,
        potentially hazardous status, observation dates, and links to official
        NASA JPL resources. The <strong>Close Approach Data</strong> section
        lists recorded encounters to the planets, moon, and the largest few
        main-belt asteroids, allowing users to analyze how near the object has
        come over time. This section includes two selectable radio groups:{' '}
        <strong>Miss Distance</strong>, which can be viewed in astronomical
        units, kilometers, lunar distances, or miles; and{' '}
        <strong>Relative Velocity</strong>, which can be displayed in kilometers
        per hour, kilometers per second, or miles per hour. These unit toggles
        allow users to interpret approach data in the format most meaningful to
        them.
      </p>
      <NeoParamsContainer>
        <NeoOrbitParameters loading={isLoading} data={neoData?.orbital_data} />
        <MiscellaneousParameters
          loading={isLoading}
          data={neoData ?? undefined}
        />
      </NeoParamsContainer>
      <CloseApproachDataList
        loading={isLoading}
        cad={neoData?.close_approach_data}
      />
    </ContainerStyled>
  );
};
