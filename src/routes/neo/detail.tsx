import React, { FC } from 'react';
import { useLoaderData } from 'react-router-dom';
import { NearEarthObject } from '../../db';

export const NeoDetailRoute: FC = () => {
  const neo = useLoaderData<NearEarthObject>();

  return (
    <div>
      <h3>{neo.name}</h3>
    </div>
  );
};
