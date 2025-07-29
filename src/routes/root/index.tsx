import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const RootRoute: FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
