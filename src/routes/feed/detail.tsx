import { styled } from '@mui/material';
import { format } from 'date-fns';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NeoDateParams } from '..';
import { NavLinkStyled } from '../../components/styled';
import { FeedRequest } from '../../db';
import { useCommands } from '../../hooks/useCommands';
import { GridFourColumnLoader } from '../../loaders';

const FeedSection = styled('section')(
  ({ theme }) => `
    display: grid;
    background: ${theme.palette.background.paper};
    grid-template-columns: 25% 25% 25% 25%;
    grid-template-rows: auto;
    padding-bottom: 1rem;

    h3 {
      display: flex;
      color: ${theme.palette.secondary.light};
      justify-content: center;
    }

    .hazard {
      display: flex;
      justify-content: center;
      background: ${theme.palette.warning.dark};
      color: ${theme.palette.warning.contrastText};
    }

    .not-hazard {
      display: flex;
      justify-content: center;
    }
`,
);

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

  const items = Object.entries(neoData.near_earth_objects).map(
    ([title, neos]) => {
      const result = neos.map((neo) => {
        const epoc = neo.close_approach_data[0].epoch_date_close_approach;
        const dateformat = new Date(epoc);
        const result = format(dateformat, 'LLL do h:mm bbb');

        return (
          <Fragment key={neo.id}>
            <FeedItem>
              <NavLinkStyled to={`/neo/${neo.id}`}>{neo.id}</NavLinkStyled>
            </FeedItem>
            <FeedItem>{neo.name}</FeedItem>
            <FeedItemDate>{result}</FeedItemDate>
            {neo.is_potentially_hazardous_asteroid ? (
              <div className="hazard">yes</div>
            ) : (
              <div className="not-hazard">no</div>
            )}
          </Fragment>
        );
      });

      return result;
    },
  );

  return (
    <FeedSection>
      <h3>NEO ID</h3>
      <h3>Name</h3>
      <h3>Approach Date</h3>
      <h3>Potentially Hazardous</h3>
      {items}
    </FeedSection>
  );
};
