import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import {
  dateNeoFeed,
  fetchLinkNeoFeed,
  fetchNEOFeed,
  fetchNEOLookup,
} from '../../actions';
import {
  neoFeedDate,
  neoFeedIsFetching,
  neoFeedLinks,
  neoFeedNearEarthObjects,
} from '../../selectors';
import Logger from 'js-logger';
// import 'react-datepicker/dist/react-datepicker.css';

function CreateNeoTable({ neos, onSelectId }) {
  const neotablerows = neos.map((item, index) => (
    <tr key={index} className="p-1 m-1 border border-yellow-300 rounded">
      <td>{item.absolute_magnitude_h}</td>
      <td>{item.is_potentially_hazardous_asteroid ? <b>true</b> : 'false'}</td>
      <td>{item.is_sentry_object ? <b>true</b> : 'false'}</td>
      <td>{item.name}</td>
      <td>
        <a href={item.nasa_jpl_url} target="_blank" rel="noopener noreferrer">
          {item.nasa_jpl_url}
        </a>
      </td>
      <td>
        <button
          className="p-1 m-1 border border-gray-400 rounded"
          onClick={() => onSelectId(item.neo_reference_id)}
        >
          {item.neo_reference_id}
        </button>
      </td>
    </tr>
  ));

  return (
    <table className="p-1 m-1 border rounded border-cyan-400">
      <caption>
        <b>NEAR EARCH OBJECTS</b>
      </caption>
      <thead>
        <tr>
          <th>Absolute magnitude h</th>
          <th>is potentially hazardous asteroid</th>
          <th>Is sentry object</th>
          <th>Name</th>
          <th>Nasa jpl url</th>
          <th>NEO reference id</th>
        </tr>
      </thead>
      <tbody>{neotablerows}</tbody>
    </table>
  );
}

CreateNeoTable.propTypes = {
  neos: PropTypes.array,
  onSelectId: PropTypes.func,
};

function NeoTable({ title, neos, onSelectId }) {
  return (
    <div key={title} className="p-1 m-1 border border-green-400 rounded">
      <h1>title:{title}</h1>
      <CreateNeoTable neos={neos} onSelectId={onSelectId} />
    </div>
  );
}

NeoTable.propTypes = {
  title: PropTypes.string,
  neos: PropTypes.array,
  onSelectId: PropTypes.func,
};

function NeoFeed() {
  const dispatch = useDispatch();

  const links = useSelector(neoFeedLinks);
  const neo = useSelector(neoFeedNearEarthObjects);
  const isFetching = useSelector(neoFeedIsFetching);
  const date = useSelector(neoFeedDate);

  const onLinkApi = useCallback(
    (url) => dispatch(fetchLinkNeoFeed(url)),
    [dispatch]
  );
  // api call to get more info in this specific astroid
  const onSelectId = useCallback(
    (id) => dispatch(fetchNEOLookup(id)),
    [dispatch]
  );
  // load new feed data for the date.
  const onDateChange = useCallback(
    (date) => {
      dispatch(dateNeoFeed(date));
      dispatch(fetchNEOFeed(date));
    },
    [dispatch]
  );

  if (isFetching)
    return (
      <div className="flex items-center justify-center flex-1 w-full h-full">
        loading
      </div>
    );

  Logger.info('NeoFeed::neo', neo);

  const neotables = Object.entries(neo).map((entry, index) => (
    <NeoTable
      key={index}
      title={entry[0]}
      neos={entry[1]}
      onSelectId={onSelectId}
    />
  ));
  return (
    <div className="flex flex-col w-full h-full">
      <h1>Near Earth Object Feed</h1>
      <DatePicker onChange={onDateChange} selected={date} />
      <div className="flex w-full border border-red-400 rounded justify-evenly">
        <button
          className="p-1 m-1 border border-gray-400 rounded"
          onClick={() => onLinkApi(links.prev)}
        >
          PREV
        </button>
        <button
          className="p-1 m-1 border border-gray-400 rounded"
          onClick={() => onLinkApi(links.next)}
        >
          NEXT
        </button>
      </div>
      <div className="p-1 m-1 border rounded border-slate-400">{neotables}</div>
    </div>
  );
}

export { NeoFeed };
