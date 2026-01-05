import { styled } from '@mui/material';
import React, { FC } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { NeoBrowseParams } from '..';

const BrowseRouteMain = styled('main')(
  ({ theme }) => `
  h2 {
    color: ${theme.palette.secondary.light};
  }
`,
);

export const BrowseRoute: FC = () => {
  const { pageId } = useParams<NeoBrowseParams>();

  return (
    <BrowseRouteMain>
      {pageId ? (
        <>
          <h2>NEO Browse</h2>
          <p>
            This page allows users to explore NASA's complete catalog of Near
            Earth Objects using paginated results. The list begins at page one
            and displays a manageable set of asteroids per page, with pagination
            controls enabling users to move forward and backward through the
            dataset. Each entry provides summary information and links directly
            to the detailed SPK-ID view, making it easy to navigate from
            high-level discovery to in-depth asteroid data.
          </p>
        </>
      ) : null}
      <Outlet />
    </BrowseRouteMain>
  );
};
