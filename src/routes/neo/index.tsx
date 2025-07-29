import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const NeoRoute: FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
