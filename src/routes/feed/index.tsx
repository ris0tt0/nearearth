import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const FeedRoute: FC = () => {
  return (
    <div>
      <div>feed route</div>
      <Outlet />
    </div>
  );
};
