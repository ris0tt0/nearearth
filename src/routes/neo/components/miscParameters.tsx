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
          <Tooltip
            title="number of observations (all types) used in fit"
            placement="top"
          >
            <ElementParam># obs. used (total)</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.observations_used}
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          <Tooltip title="number of days spanned by data-arc" placement="top">
            <ElementParam>data-arc span</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.data_arc_in_days} days
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          <Tooltip
            title="date of first observation used in the fit"
            placement="top"
          >
            <ElementParam>first obs. used</ElementParam>
          </Tooltip>
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          {data.first_observation_date}
        </ConatinerGridItemContainer>
        <ConatinerGridItemContainer>
          <Tooltip
            title="date of last observation used in the fit"
            placement="top"
          >
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
