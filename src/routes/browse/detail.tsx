import { styled, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NeoBrowseParams } from '..';
import { NavLinkStyled } from '../../components/styled';
import { NearEarthObject } from '../../db';
import { useCommands } from '../../hooks/useCommands';
import { GridFourColumnLoader } from '../../loaders';
import { BrowseControls } from './components/pagination';
import { format } from 'date-fns';

const FeedBrowseContainer = styled('section')(({ theme }) => ({
  display: 'grid',
  background: theme.palette.background.paper,
  width: '100%',
  paddingBottom: '1rem',

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '33% 33% 33%',
  },
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: '25% 25% 25% 25%',
  },
  gridTemplateRows: 'auto',
}));

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
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down('sm'));
  const medium = useMediaQuery(theme.breakpoints.down('md'));

  const items = useMemo(() => {
    const items =
      neos?.map((neo) => {
        const firstObservation = new Date(
          neo.orbital_data?.first_observation_date,
        );
        const lastObservation = new Date(
          neo.orbital_data?.last_observation_date,
        );

        const first = small
          ? format(firstObservation, 'M/d/y')
          : medium
            ? format(firstObservation, 'LLL do y')
            : format(firstObservation, 'LLL do y h:mm bbb');

        const last = small
          ? format(lastObservation, 'M/d/y')
          : medium
            ? format(lastObservation, 'LLL do y')
            : format(lastObservation, 'LLL do y h:mm bbb');

        return (
          <Fragment key={neo.id}>
            <FeedBrowseItem>
              <NavLinkStyled to={`/neo/${neo.id}`}>
                {neo.neo_reference_id}
              </NavLinkStyled>
            </FeedBrowseItem>
            {small ? null : <FeedBrowseItem>{neo.name}</FeedBrowseItem>}
            <FeedBrowseItem>{first}</FeedBrowseItem>
            <FeedBrowseItem>{last}</FeedBrowseItem>
          </Fragment>
        );
      }) ?? [];

    return items;
  }, [neos, small, medium]);

  if (loading) return <GridFourColumnLoader />;

  return (
    <FeedBrowseContainer>
      <FeedBrowseHeader>SPK-ID</FeedBrowseHeader>
      {small ? null : <FeedBrowseHeader>Name</FeedBrowseHeader>}
      <FeedBrowseHeader>First {medium ? '' : 'Observation'}</FeedBrowseHeader>
      <FeedBrowseHeader>Last {medium ? '' : 'Observation'}</FeedBrowseHeader>
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
