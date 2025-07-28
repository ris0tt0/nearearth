import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { BrowseParams } from '..';

export const BrowseDetailsRoute: FC = () => {
  const { browseId } = useParams<BrowseParams>();
  return <div>feed details {browseId}</div>;
};
