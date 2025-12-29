# NASA Near Earth Object (NEO) Explorer

A ReactJS application built on NASA’s Near Earth Object Web Service (NeoWs)
 that allows users to explore asteroid data through multiple views, including the NEO Feed, NEO Browse, detailed SPK-ID pages, and a basic About section.
## Overview
This application provides several ways to explore NASA’s Near Earth Object data:
- NEO Feed – View asteroids detected on a specific date
- NEO Browse – Paginate through the full catalog of tracked NEOs starting from page 1
- NEO Detail (SPK-ID) – View detailed information for a specific asteroid
- About Page – Learn about the project, technologies used, and purpose

Each page is accessible through client-side routing and designed to work together as a cohesive data exploration tool.

## Application Pages
### NEO Feed Page

- Displays a date picker and Select button
- Fetches asteroid data from NASA’s feed endpoint based on the selected date
- Renders a list of NEOs detected on that date
- Each NEO is displayed as a clickable link
- Clicking a link routes the user to the SPK-ID Detail page

### NEO Browse Page

- Uses NASA’s neo/browse endpoint
- Starts browsing from page 1 of the dataset
- Supports pagination through the entire NEO catalog
- Displays summary data for each asteroid
- Each entry links to its corresponding SPK-ID Detail page
- Previously viewed pages may be cached for performance

### NEO Detail Page (SPK-ID)

- Accessed via a dynamic route:

``` bash
/neo/:id
```
- Fetches detailed asteroid data using the NEO lookup endpoint
- Displays:
  - Asteroid name and designation
  - Estimated diameter
  - Potentially hazardous flag
  - Close approach data
  - Orbital characteristics

 - Serves as the central drill-down view from both Feed and Browse pages

### About Page

- Provides a high-level explanation of the project
- Describes the purpose of using NASA’s NEO API
- Lists the technologies used
- Acts as an entry point for new users or developers

### Navigation Map

The application uses client-side routing to allow users to seamlessly navigate between NEO data views and detailed asteroid information.

#### Feed → Detail Flow

 1. User navigates to the NEO Feed page.
 1. User selects a date using the date picker.
 1. User clicks the Select button to load NEOs for that date.
 1. A list of Near Earth Objects is rendered.
 1. Clicking any NEO link navigates to the NEO Detail (SPK-ID) page:

``` bash
/feed
   ↓
Select Date
   ↓
NEO List
   ↓
/neo/:id
```
### Browse → Detail Flow

1. User navigates to the NEO Browse page.
1. The app loads NEOs starting from page 1 of the dataset.
1. User paginates through the catalog.
1. Each NEO entry is displayed as a clickable link.
1. Clicking a NEO navigates to the NEO Detail (SPK-ID) page:
``` bash
/browse
   ↓
Page 1 → Page N
   ↓
NEO List
   ↓
/neo/:id
```

### Central Detail Page

The NEO Detail (SPK-ID) page serves as the shared destination for both navigation paths.
It acts as the single source of truth for detailed asteroid data and can be accessed from:

 - NEO Feed results
 - NEO Browse results

This structure ensures a consistent user experience and a clear separation between data discovery (Feed & Browse) and data inspection (Detail).

### Technologies Used 

- ReactJS – Component-based UI
- React Router – Client-side routing between pages
- Axios – HTTP requests to NASA’s APIs
- IndexedDB – Local caching for improved performance and offline access
 - CSS / Material UI / Styled Components – UI styling

### NASA API Endpoints Used

 - #### NEO Feed

``` bash
/neo/rest/v1/feed
```

 - #### NEO Browse
``` bash
/neo/rest/v1/neo/browse
```

 - #### NEO Lookup (SPK-ID)

``` bash
/neo/rest/v1/neo/{id}
```
### Installation

 1. Clone the repository:
``` bash
git clone git@github.com:ris0tt0/nearearth.git
cd nearearth
```

 2. Install dependencies:

``` bash
yarn install
```

 3. Create a .env file with your NASA API key:

``` ini
REACT_APP_NASA_API_KEY=your_api_key_here
```

 4. Start the development server:

``` bash
yarn start
```

### License

MIT License.