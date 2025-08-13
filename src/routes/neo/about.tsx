import React, { FC } from 'react';

export const NeoAboutRoute: FC = () => {
  return (
    <div>
      <h1>Near Earth Object (NEO) Detail Viewer</h1>
      <p>
        A ReactJS application page that displays detailed information for a
        specific Near Earth Object (NEO) by querying NASA’s NeoWs Lookup
        Endpoint. The NEO is identified by its SPK-ID, a unique identifier
        assigned by NASA.
      </p>
      <h2>About</h2>
      <p>
        This page is part of a larger application for browsing and exploring
        Near Earth Objects. It allows users to:
      </p>
      <ul>
        <li>
          Retrieve detailed information about a specific NEO using its SPK-ID.
        </li>
        <li>View data such as:</li>
        <ul>
          <li>Name and designation</li>
          <li>Estimated diameter</li>
          <li>Close approach data</li>
          <li>Hazardous object flag</li>
          <li>Orbital data and reference links</li>
        </ul>
        <li>Navigate back to the NEO list or feed page.</li>
      </ul>
      <h2>How It Works</h2>
      <ol>
        <li>
          The page is accessed through a route such as:
          <code>/neo/:id</code>
          where :id is the SPK-ID of the asteroid.
        </li>
        <li>
          The app sends a request to NASA’s NEO lookup endpoint:
          <code>
            https://api.nasa.gov/neo/rest/v1/neo/&#123;SPK-ID&#125;?api_key=YOUR_API_KEY
          </code>
        </li>
        <li>
          Axios fetches the data, which is then stored in state (or Redux, if
          implemented).
        </li>
        <li>The page renders all relevant details, often grouped into:</li>
        <ul>
          <li>Basic Information (name, NASA JPL URL)</li>
          <li>Physical Characteristics (diameter range, magnitude)</li>
          <li>Close Approaches (dates, miss distance, velocity)</li>
          <li>Orbit Data (orbit determination date, first/last observation)</li>
        </ul>
        <li>Optional features include:</li>
        <ul>
          <li>Loading and error states</li>
          <li>Links to related NASA JPL pages</li>
        </ul>
      </ol>
    </div>
  );
};
