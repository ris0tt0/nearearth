import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const BrowseRoute: FC = () => {
  return (
    <div>
      <div>Browse route</div>
      <Outlet />
    </div>
  );
};
