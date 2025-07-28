import React, { FC } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { NeoParams } from '..';

export const NeoRoute: FC = () => {
  return (
    <div>
      <div>neo</div>
      <Outlet />
    </div>
  );
};
