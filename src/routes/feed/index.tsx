import { styled } from '@mui/material';
import React, { FC } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { DateControls } from '../../components/date';
import { NeoDateParams } from '..';
import Logger from 'js-logger';

const FeedRouteMain = styled('main')(
  ({ theme }) => `
  h2 {
    color: ${theme.palette.secondary.light};
  }
`,
);

export const FeedRoute: FC = () => {
  const { neoDate } = useParams<NeoDateParams>();

  return (
    <FeedRouteMain>
      {neoDate ? (
        <>
          <h2>NEO Feed</h2>
          <p>
            This page allows users to explore Near Earth Objects detected on a
            specific date. Using the date selector, users can choose a day of
            interest and click the Select button to load asteroid data from
            NASA's NEO feed. The results are displayed as a list of clickable
            NEO entries, each linking to a detailed SPK-ID view for further
            exploration.
          </p>
        </>
      ) : null}
      <DateControls />
      <Outlet />
    </FeedRouteMain>
  );
};
