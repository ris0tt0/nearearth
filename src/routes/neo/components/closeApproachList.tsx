import { Paper, styled, Tooltip } from '@mui/material';
import React, { FC } from 'react';
import { CloseApproachData } from '../../../db';

const CloseScrollerContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
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

const CloseApproachGridContainer = styled('div')`
  display: grid;
  width: 100%;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-areas:
    'header header header header'
    'content content content content';
`;

const CloseHeaderItemContainer = styled(Paper)(
  ({ theme }) => `
  display: flex;
  gird-area: header;
  justify-content: center;
  font-weight: bold;
  border: 1px ${theme.palette.primary.light} solid;
`,
);

const CloseItemContainer = styled('div')`
  display: flex;
  gird-area: content;
  justify-content: center;
`;

const CloseApproachDataListRow: FC<{ cad: CloseApproachData }> = ({ cad }) => {
  return (
    <>
      <CloseItemContainer>{cad.close_approach_date}</CloseItemContainer>
      <CloseItemContainer>{cad.orbiting_body}</CloseItemContainer>
      <CloseItemContainer>{cad.miss_distance.astronomical}</CloseItemContainer>
      <CloseItemContainer>
        {cad.relative_velocity.kilometers_per_hour}
      </CloseItemContainer>
    </>
  );
};

export const CloseApproachDataList: FC<{ cad: CloseApproachData[] }> = ({
  cad,
}) => {
  const items = cad.map((data) => {
    return (
      <CloseApproachDataListRow key={data.close_approach_date} cad={data} />
    );
  });

  return (
    <CloaseApproachContainer>
      <h3>Close Approach Data</h3>
      <CloseApproachGridContainer>
        <Tooltip title="date and time approach" placement="top">
          <CloseHeaderItemContainer>date/time</CloseHeaderItemContainer>
        </Tooltip>
        <Tooltip
          title="close approach body name(planet or other significant solor-system body. All values are with respect to this body"
          placement="top"
        >
          <CloseHeaderItemContainer>body</CloseHeaderItemContainer>
        </Tooltip>
        <Tooltip
          title="the most likely close-approach distance(body center to NEO center)"
          placement="top"
        >
          <CloseHeaderItemContainer>distance</CloseHeaderItemContainer>
        </Tooltip>
        <Tooltip
          title="object velocity relative to Body at close approach"
          placement="top"
        >
          <CloseHeaderItemContainer>V-relative</CloseHeaderItemContainer>
        </Tooltip>
      </CloseApproachGridContainer>
      <CloseScrollerContainer>
        <CloseApproachGridContainer>{items}</CloseApproachGridContainer>
      </CloseScrollerContainer>
    </CloaseApproachContainer>
  );
};
