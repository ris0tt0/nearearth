import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  styled,
  Tooltip,
} from '@mui/material';
import React, { FC, Fragment, useCallback, useState } from 'react';
import { CloseApproachData } from '../../../db';
import { GridFourColumnLoader } from '../../../loaders';

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

const distanceValue = (data: CloseApproachData, key: string) => {
  switch (key) {
    case 'astronomical':
      return data.miss_distance.astronomical;
    case 'kilometers':
      return data.miss_distance.kilometers;
    case 'lunar':
      return data.miss_distance.lunar;
    case 'miles':
      return data.miss_distance.miles;
    default:
      return '';
  }
};

const velocityValue = (data: CloseApproachData, key: string) => {
  switch (key) {
    case 'kilometers_per_hour':
      return data.relative_velocity.kilometers_per_hour;
    case 'kilometers_per_second':
      return data.relative_velocity.kilometers_per_second;
    case 'miles_per_hour':
      return data.relative_velocity.miles_per_hour;
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
            {distanceValue(data, distance)}
          </CloseItemContainer>
          <CloseItemContainer>
            {velocityValue(data, velocity)}
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
            row
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
            row
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
              <CloseHeaderItemContainer>Approach Date</CloseHeaderItemContainer>
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
              <CloseHeaderItemContainer>Miss Distance</CloseHeaderItemContainer>
            </Tooltip>
            <Tooltip
              title="object velocity relative to Body at close approach"
              placement="top"
            >
              <CloseHeaderItemContainer>
                Relative Velocity
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
