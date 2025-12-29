import { styled } from '@mui/material';
import React, { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NeoBrowseParams } from '..';
import { NavLinkStyled } from '../../components/styled';
import { NearEarthObject } from '../../db';
import { useCommands } from '../../hooks/useCommands';
import { GridFourColumnLoader } from '../../loaders';
import { BrowseControls } from './components/pagination';

const FeedBrowseContainer = styled('section')(
  ({ theme }) => `
  display: grid;
  background: ${theme.palette.background.paper};
  width: 100%;
  padding-bottom: 1rem;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: auto;
`,
);

const FeedBrowseHeader = styled('h3')(
  ({ theme }) => `
  display: flex;
  color: ${theme.palette.secondary.light};
  justify-content: center;
`,
);

const FeedBrowseItem = styled('div')`
  display: flex;
  justify-content: center;
`;

export const BrowseGrid: FC<{ loading: boolean; neos?: NearEarthObject[] }> = ({
  loading,
  neos,
}) => {
  const items = useMemo(() => {
    const items =
      neos?.map((neo) => {
        return (
          <Fragment key={neo.id}>
            <FeedBrowseItem>
              <NavLinkStyled to={`/neo/${neo.id}`}>
                {neo.neo_reference_id}
              </NavLinkStyled>
            </FeedBrowseItem>
            <FeedBrowseItem>{neo.name}</FeedBrowseItem>
            <FeedBrowseItem>
              {neo.orbital_data?.first_observation_date}
            </FeedBrowseItem>
            <FeedBrowseItem>
              {neo.orbital_data?.last_observation_date}
            </FeedBrowseItem>
          </Fragment>
        );
      }) ?? [];

    return items;
  }, [neos]);

  if (loading) return <GridFourColumnLoader />;

  return (
    <FeedBrowseContainer>
      <FeedBrowseHeader>SPK-ID</FeedBrowseHeader>
      <FeedBrowseHeader>Name</FeedBrowseHeader>
      <FeedBrowseHeader>First Observation</FeedBrowseHeader>
      <FeedBrowseHeader>Last Observation</FeedBrowseHeader>
      {items}
    </FeedBrowseContainer>
  );
};

export const BrowseDetailsRoute: FC = () => {
  const commands = useCommands();
  const [isLoading, setIsLoading] = useState(true);
  const [neos, setNeos] = useState<NearEarthObject[]>([]);
  const [page, setPage] = useState<number>(NaN);
  const [totalPages, setTotalPages] = useState<number>(NaN);

  const { pageId } = useParams<NeoBrowseParams>();

  useEffect(() => {
    if (pageId) {
      setIsLoading(true);
      const page = parseInt(pageId, 10);
      commands
        .requestNeoBrowse(page, 40)
        .then((data) => {
          setNeos(data.near_earth_objects);
          setPage(data.page.number);
          setTotalPages(data.page.total_pages);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [pageId]);

  return (
    <>
      <BrowseControls loading={isLoading} page={page} total={totalPages} />
      <BrowseGrid loading={isLoading} neos={neos} />
    </>
  );
};
