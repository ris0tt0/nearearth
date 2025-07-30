import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { DateControls } from '../../components/date';

export const FeedRoute: FC = () => {
  return (
    <>
      <DateControls />
      <Outlet />
    </>
  );
};
