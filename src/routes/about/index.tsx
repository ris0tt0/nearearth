import { Box } from '@mui/system';
import React, { FC } from 'react';

export const AboutRoute: FC = () => {
  return (
    <div>
      <h2>About This Project</h2>
      <p>
        This project is a ReactJS web application that integrates with NASA's
        Open API for Near Earth Objects (NEO). The goal of the application is to
        provide users with insightful and up-to-date information about asteroids
        and other near-Earth objects tracked by NASA.
      </p>

      <h3>Key Technologies Used</h3>
      <ul>
        <li>
          ReactJS – The core UI library used to build a dynamic and
          component-based interface.
        </li>
        <li>
          Axios – Handles HTTP requests to the NASA NEO API for fetching
          real-time asteroid data.
        </li>
        <li>
          IndexedDB – Enables client-side long-term storage of fetched data,
          allowing for offline access and improved performance on repeat visits.
        </li>
      </ul>
      <h3>Features</h3>
      <ul>
        <li>Daily and historical data about near-Earth asteroids</li>
        <li>Local caching of asteroid data for offline browsing</li>
        <li>IndexedDB-powered state management for a predictable data flow</li>
        <li>
          Responsive design and efficient data handling through asynchronous API
          calls
        </li>
      </ul>
      <h3>Purpose</h3>
      <p>
        This project was created to explore and demonstrate how real-world data
        from open APIs like NASA’s can be visualized and persisted in a modern
        web application. By combining Redux and IndexedDB, the app achieves both
        scalability and durability for a smooth user experience.
      </p>
    </div>
  );
};
