import React, { FC } from 'react';
import { NavLinkStyled } from '../../components/styled';
import { AboutMain } from '../../styled';

export const BrowseAboutRoute: FC = () => {
  return (
    <AboutMain>
      <h2>How It Works: Browsing NASA's NEO API</h2>
      <p>
        This application starts by querying NASA's Near Earth Object Web Service
        (NeoWs) beginning from <NavLinkStyled to="1">page 1</NavLinkStyled> of
        the dataset. The goal is to provide an efficient and user-friendly way
        to browse through potentially hazardous asteroid data tracked by NASA.
      </p>

      <h3>Data Fetching</h3>
      <ul>
        <li>
          The application uses Axios to make HTTP requests to the NEO API.
        </li>
        <li>
          It begins by requesting data from page 1 using the browse endpoint
          (e.g.,{' '}
          <code>
            https://api.nasa.gov/neo/rest/v1/neo/browse?page=1&api_key=DEMO_KEY
          </code>
          ).
        </li>
        <li>
          Pagination is handled by following the links.next field in the API
          response, enabling users to move forward through the full dataset of
          tracked NEOs.
        </li>
      </ul>
      <h3>State Management</h3>
      <ul>
        <li>
          Fetched data is stored in IndexedDB, providing centralized access to
          asteroid information across the app.
        </li>
        <li>
          Loading, error handling, and pagination state are also managed via
          IndexedDB, ensuring smooth transitions between pages.
        </li>
      </ul>
      <h3>Caching for Performance</h3>
      <ul>
        <li>
          Each page of asteroid data is saved to IndexedDB after it is fetched.
        </li>
        <li>
          On future visits or when navigating back to a previously viewed page,
          the app first checks IndexedDB before making another network
          request—reducing API usage and improving performance.
        </li>
      </ul>
      <h3>Why Start at Page 1?</h3>
      <p>
        Starting at <NavLinkStyled to="1">page 1</NavLinkStyled> ensures that
        users see the most recently updated asteroid data first, and gives them
        a consistent entry point into the dataset. As users navigate forward,
        they gain access to the full scope of historical data stored in NASA's
        NEO tracking system.
      </p>
    </AboutMain>
  );
};
