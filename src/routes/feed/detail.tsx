import { format } from 'date-fns';
import Logger from 'js-logger';
import React, { FC } from 'react';
import { useLoaderData } from 'react-router-dom';
import { FeedRequest, NearEarthObject } from '../../db';
import { BrowseDetailsPageList } from '../browse/detail';

export const FeedDeoTitle: FC<{ date: string }> = ({ date }) => {
  const append = `${date}T00:00:00`;

  const result2 = format(append, 'LLLL do yyyy');

  return result2 ?? null;
};

export const FeedNeo: FC<{ neos: Record<string, NearEarthObject[]> }> = ({
  neos,
}) => {
  const items = Object.entries(neos).map(([title, neoList]) => {
    return (
      <div key={title}>
        <FeedDeoTitle date={title} />
        <BrowseDetailsPageList neos={neoList} />
      </div>
    );
  });

  return <div>{items}</div>;
};

export const FeedDetailsRoute: FC = () => {
  const data = useLoaderData<FeedRequest>();

  Logger.info('FeedDetailsRoute', data);

  return <FeedNeo neos={data.near_earth_objects} />;
};
