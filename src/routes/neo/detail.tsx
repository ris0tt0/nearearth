import React, { FC } from 'react';
import { NeoParams } from '..';
import { useParams } from 'react-router-dom';

export const NeoDetailRoute: FC = () => {
  const { neoId } = useParams<NeoParams>();
  return <div>neo detail {neoId}</div>;
};
