import Logger from 'js-logger';
import React, { FC } from 'react';
import { useLoaderData } from 'react-router-dom';
import {
  NavLinkStyled,
  UnorderedListItemStyled,
  UnorderedListStyled,
} from '../../components/styled';
import { NearEarthObject } from '../../db';

export type PageDetailsPage = {
  number: number;
  size: number;
  total_elements: number;
  total_pages: number;
};

export const PageDetails: FC<{ page: PageDetailsPage }> = ({ page }) => {
  return (
    <div>
      <div>Page: {page.number}</div>
      <div>Total Pages: {page.total_pages}</div>
    </div>
  );
};

export const BrowseDetailsPageList: FC<{ neos: NearEarthObject[] }> = ({
  neos,
}) => {
  const items = neos.map((neo) => {
    return (
      <UnorderedListItemStyled key={neo.id}>
        <NavLinkStyled to={`/neo/${neo.id}`}>{neo.name}</NavLinkStyled>
      </UnorderedListItemStyled>
    );
  });

  return <UnorderedListStyled>{items}</UnorderedListStyled>;
};

export const BrowseDetailsRoute: FC = () => {
  const browse = useLoaderData<any>();

  Logger.info('browse details', browse);
  const items = browse.near_earth_objects;

  return (
    <div>
      <p>NEO objects: {items.length}</p>
      <PageDetails page={browse.page} />
      <BrowseDetailsPageList neos={browse.near_earth_objects} />
    </div>
  );
};
