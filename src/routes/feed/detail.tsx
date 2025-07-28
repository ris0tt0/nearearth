import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { NeoDateParams } from '..';

export const FeedDetailsRoute: FC = () => {
  const { neoDate } = useParams<NeoDateParams>();
  return <div>feed details {neoDate}</div>;
};
