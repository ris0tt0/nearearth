import React, { FC } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import { LoadingFull } from '../../components/loading';

export const NeoRoute: FC = () => {
  const navigation = useNavigation();
  const isNavigating = navigation.location && navigation.state === 'loading';

  if (isNavigating) {
    return <LoadingFull />;
  }

  return <Outlet />;
};
