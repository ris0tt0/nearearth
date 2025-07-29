import React, { FC } from 'react';
import { NeoParams } from '..';
import { useLoaderData, useParams } from 'react-router-dom';
import { NearEarthObject } from '../../db';

export const NeoDetailRoute: FC = () => {
  const { neoId } = useParams<NeoParams>();
  const neo = useLoaderData<NearEarthObject>();

  return (
    <div>
      <div>neo detail {neoId}</div>
      <div>{neo.name}</div>
      <div>{neo.close_approach_data.length}</div>
    </div>
  );
};
