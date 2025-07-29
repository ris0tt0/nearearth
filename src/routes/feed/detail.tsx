import Logger from 'js-logger';
import React, { FC } from 'react';
import { useLoaderData } from 'react-router-dom';
import { FeedRequest, NearEarthObject } from '../../db';
import { BrowseDetailsPageList } from '../browse/detail';

export const FeedNeo: FC<{ neos: Record<string, NearEarthObject[]> }> = ({
  neos,
}) => {
  const items = Object.entries(neos).map(([title, neoList]) => {
    return (
      <div key={title}>
        <div>{title}</div>
        <BrowseDetailsPageList neos={neoList} />
      </div>
    );
  });

  return <div>{items}</div>;
};

export const FeedDetailsRoute: FC = () => {
  const data = useLoaderData<FeedRequest>();

  Logger.info('FeedDetailsRoute', data);

  return (
    <div>
      <FeedNeo neos={data.near_earth_objects} />
    </div>
  );
};
