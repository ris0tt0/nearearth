import { styled, useMediaQuery, useTheme } from '@mui/material';
import { format } from 'date-fns';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NeoDateParams } from '..';
import { NavLinkStyled } from '../../components/styled';
import { FeedRequest } from '../../db';
import { useCommands } from '../../hooks/useCommands';
import { GridFourColumnLoader } from '../../loaders';

const FeedSection = styled('section')(({ theme }) => ({
  display: 'grid',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '33% 33% 33%',
  },
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: '25% 25% 25% 25%',
  },
  gridTemplateRows: 'auto',
  paddingBottom: '1rem',

  h3: {
    display: 'flex',
    color: theme.palette.secondary.light,
    justifyContent: 'center',
  },
  '.hazard': {
    display: 'flex',
    justifyContent: 'center',
    background: theme.palette.warning.dark,
    color: theme.palette.warning.contrastText,
  },
  '.not-hazard': {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const FeedItem = styled('div')`
  display: flex;
  justify-content: center;
`;

const FeedItemDate = styled('div')`
  padding-left: 2rem;
`;

export const FeedDetailsRoute: FC = () => {
  const commands = useCommands();
  const { neoDate } = useParams<NeoDateParams>();
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down('sm'));
  const medium = useMediaQuery(theme.breakpoints.down('md'));
  const [isLoading, setIsLoading] = useState(true);
  const [neoData, setNeoData] = useState<FeedRequest | null>(null);

  useEffect(() => {
    if (neoDate) {
      setIsLoading(true);
      commands
        .requestNeoDate(neoDate)
        .then((dateDate) => {
          setNeoData(dateDate);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [neoDate]);

  if (!neoData || isLoading) return <GridFourColumnLoader />;

  const items = Object.entries(neoData.near_earth_objects).map(([_, neos]) => {
    const result = neos.map((neo) => {
      const epoc = neo.close_approach_data[0].epoch_date_close_approach;
      const dateformat = new Date(epoc);
      const itemDate = medium
        ? format(dateformat, 'M/d h:mm bbb')
        : format(dateformat, 'LLL do h:mm bbb');

      return (
        <Fragment key={neo.id}>
          <FeedItem>
            <NavLinkStyled to={`/neo/${neo.id}`}>{neo.id}</NavLinkStyled>
          </FeedItem>
          {small ? null : <FeedItem>{neo.name}</FeedItem>}
          <FeedItemDate>{itemDate}</FeedItemDate>
          {neo.is_potentially_hazardous_asteroid ? (
            <div className="hazard">yes</div>
          ) : (
            <div className="not-hazard">no</div>
          )}
        </Fragment>
      );
    });

    return result;
  });

  return (
    <FeedSection>
      <h3>SPK-ID</h3>
      {small ? null : <h3>Name</h3>}
      <h3>{medium ? '' : 'Approach '}Date</h3>
      <h3>{medium ? '' : 'Potentially '}Hazardous</h3>
      {items}
    </FeedSection>
  );
};
