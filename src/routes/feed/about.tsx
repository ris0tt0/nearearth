import React, { FC } from 'react';
import { NavLinkStyled } from '../../components/styled';
import { AboutMain } from '../../styled';
import { getCurrentFormattedDate } from '../../utils';

export const FeedAboutRoute: FC = () => {
  const today = getCurrentFormattedDate();

  return (
    <AboutMain>
      <h2>Near Earth Object (NEO) Feed Viewer</h2>
      <p>
        A ReactJS application that uses NASA's Near Earth Object Web Service
        (NeoWs) Feed endpoint to allow users to select a date and view asteroids
        detected on that date. Users can click on any NEO in the results list to
        view detailed information via the SPK-ID route. Start now with{' '}
        <NavLinkStyled to={`/feed/${today}`}>today</NavLinkStyled>.
      </p>
      <h3>About</h3>
      <p>
        This project provides an interactive interface for exploring NASA's NEO
        feed data.
      </p>
      <p>The application features:</p>
      <ul>
        <li>A date picker to choose a specific day of interest.</li>
        <li>
          A Select button to trigger the fetch of asteroid data for the chosen
          date.
        </li>
        <li>
          A list of NEO links returned from NASA's feed, each clickable to view
          detailed data for that asteroid.
        </li>
        <li>Routing to the SPK-ID details page using React Router.</li>
      </ul>
      <h3>How It Works</h3>
      <ol>
        <li>User selects a date using the date picker.</li>
        <li>
          Clicking the Select button triggers a request to NASA's NEO feed
          endpoint:
          <br />
          <code>
            https://api.nasa.gov/neo/rest/v1/feed?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD&api_key=YOUR_API_KEY
          </code>
        </li>
        <li>The API returns a list of NEOs detected for that date.</li>
        <li>The results are displayed as clickable links.</li>{' '}
        <li>
          Clicking a NEO link navigates to the <code>/neo/:id</code> route,
          where a detailed view is rendered using the NEO lookup endpoint.
        </li>
      </ol>
    </AboutMain>
  );
};
