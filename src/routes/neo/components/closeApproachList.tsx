import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  styled,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { FC, Fragment, useCallback, useState } from 'react';
import { CloseApproachData } from '../../../db';
import { GridFourColumnLoader } from '../../../loaders';
import Logger from 'js-logger';

const CloseScrollerContainer = styled('div')`
  display: flex;
  flex-direction: column;
  max-height: 400px;
  margin-bottom: 0.5rem;
  width: 100%;
  overflow: scroll;
`;

const CloseApproachContainer = styled('section')(
  ({ theme }) => `
  background: ${theme.palette.background.paper};
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: .5rem;
  padding: 1rem;

  h4 {
    color: ${theme.palette.secondary.light};
    margin: 0 0;
  }
`,
);

const CloseApproachGridContainer = styled('div')`
  display: grid;
  width: 100%;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: auto;
`;

const CloseHeaderItemContainer = styled('h4')(
  ({ theme }) => `
  color: ${theme.palette.secondary.light};
  display: flex;
  justify-content: center;
`,
);

const CloseItemContainer = styled('div')`
  display: flex;
  justify-content: center;
`;

const distanceValue = (
  data: CloseApproachData,
  key: string,
  // find better solution
  small: boolean,
  medium: boolean,
) => {
  const astro = parseFloat(data.miss_distance.astronomical);
  const kilo = parseFloat(data.miss_distance.kilometers);
  const lunar = parseFloat(data.miss_distance.lunar);
  const miles = parseFloat(data.miss_distance.miles);

  switch (key) {
    case 'astronomical':
      if (small) return astro.toPrecision(2);
      if (medium) return astro.toPrecision(5);

      return astro;
    case 'kilometers':
      if (small) return kilo.toPrecision(2);
      if (medium) return kilo.toPrecision(5);

      return kilo;
    case 'lunar':
      if (small) return lunar.toPrecision(2);
      if (medium) return lunar.toPrecision(5);

      return lunar;
    case 'miles':
      if (small) return miles.toPrecision(2);
      if (medium) return miles.toPrecision(5);

      return miles;
    default:
      return '';
  }
};

const velocityValue = (
  data: CloseApproachData,
  key: string,
  small: boolean,
  medium: boolean,
) => {
  const kmhr = parseFloat(data.relative_velocity.kilometers_per_hour);
  const kmsec = parseFloat(data.relative_velocity.kilometers_per_second);
  const mhr = parseFloat(data.relative_velocity.miles_per_hour);
  switch (key) {
    case 'kilometers_per_hour':
      if (small) return kmhr.toPrecision(2);
      if (medium) return kmhr.toPrecision(5);

      return kmhr;
    case 'kilometers_per_second':
      if (small) return kmsec.toPrecision(2);
      if (medium) return kmsec.toPrecision(5);

      return kmsec;
    case 'miles_per_hour':
      if (small) return mhr.toPrecision(2);
      if (medium) return mhr.toPrecision(5);

      return mhr;
    default:
      return '';
  }
};

export const CloseApproachDataList: FC<{
  loading: boolean;
  cad?: CloseApproachData[];
}> = ({ loading, cad }) => {
  const [distance, setDistance] = useState('astronomical');
  const [velocity, setVelocity] = useState('kilometers_per_hour');
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down('sm'));
  const medium = useMediaQuery(theme.breakpoints.down('md'));

  const handleDistance = useCallback((_: any, value: string) => {
    setDistance(value);
  }, []);
  const handleVelocity = useCallback((_: any, value: string) => {
    setVelocity(value);
  }, []);

  const items =
    cad?.map((data) => {
      return (
        <Fragment key={`${data.close_approach_date}-${data.orbiting_body}`}>
          <CloseItemContainer>{data.close_approach_date}</CloseItemContainer>
          <CloseItemContainer>{data.orbiting_body}</CloseItemContainer>
          <CloseItemContainer>
            {distanceValue(data, distance, small, medium)}
          </CloseItemContainer>
          <CloseItemContainer>
            {velocityValue(data, velocity, small, medium)}
          </CloseItemContainer>
        </Fragment>
      );
    }) ?? [];

  return (
    <CloseApproachContainer>
      <h4>Close Approach Data</h4>
      <p>
        Lists recorded close encounters to the planets, moon, and the largest
        few main-belt asteroids, with controls to view miss distance and
        relative velocity in multiple measurement units.
      </p>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '.5rem',
        }}
      >
        <FormControl disabled={loading}>
          <FormLabel id="miss-distance-radio-buttons-group">
            Miss Distance
          </FormLabel>
          <RadioGroup
            aria-labelledby="miss-distance-radio-buttons-group"
            name="miss-distance-radio-buttons-group"
            value={distance}
            onChange={handleDistance}
            row={medium ? false : true}
          >
            <FormControlLabel
              value="astronomical"
              control={<Radio size="small" />}
              label="astronomical"
            />
            <FormControlLabel
              value="kilometers"
              control={<Radio size="small" />}
              label="kilometers"
            />
            <FormControlLabel
              value="lunar"
              control={<Radio size="small" />}
              label="lunar"
            />
            <FormControlLabel
              value="miles"
              control={<Radio size="small" />}
              label="miles"
            />
          </RadioGroup>
        </FormControl>
        <FormControl disabled={loading}>
          <FormLabel id="relative-velocity-radio-buttons-group">
            Relative Velocity
          </FormLabel>
          <RadioGroup
            aria-labelledby="relative-velocity-radio-buttons-group"
            name="relative-velocity-radio-buttons-group"
            value={velocity}
            onChange={handleVelocity}
            row={medium ? false : true}
          >
            <FormControlLabel
              value="kilometers_per_hour"
              control={<Radio size="small" />}
              label="km/hr"
            />
            <FormControlLabel
              value="kilometers_per_second"
              control={<Radio size="small" />}
              label="km/s"
            />
            <FormControlLabel
              value="miles_per_hour"
              control={<Radio size="small" />}
              label="m/hr"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      {loading ? (
        <GridFourColumnLoader />
      ) : (
        <>
          <CloseApproachGridContainer>
            <Tooltip title="date and time approach" placement="top">
              <CloseHeaderItemContainer>
                {small ? '' : 'Approach '}Date
              </CloseHeaderItemContainer>
            </Tooltip>
            <Tooltip
              title="close approach body name(planet or other significant solor-system body. All values are with respect to this body"
              placement="top"
            >
              <CloseHeaderItemContainer>Body</CloseHeaderItemContainer>
            </Tooltip>
            <Tooltip
              title="the most likely close-approach distance(body center to NEO center)"
              placement="top"
            >
              <CloseHeaderItemContainer>
                {small ? '' : 'Miss '}Distance
              </CloseHeaderItemContainer>
            </Tooltip>
            <Tooltip
              title="object velocity relative to Body at close approach"
              placement="top"
            >
              <CloseHeaderItemContainer>
                {small ? '' : 'Relative '}Velocity
              </CloseHeaderItemContainer>
            </Tooltip>
          </CloseApproachGridContainer>
          <CloseScrollerContainer>
            <CloseApproachGridContainer>{items}</CloseApproachGridContainer>
          </CloseScrollerContainer>
        </>
      )}
    </CloseApproachContainer>
  );
};
