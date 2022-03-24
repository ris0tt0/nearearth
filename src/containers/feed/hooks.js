import { isEqual } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { neoFeedNearEarthObjects } from '../../selectors';
import { DEFAULT, ID, URL } from './const';

export const useNeoFeed = () => {
  const neo = useSelector(neoFeedNearEarthObjects);
  const currentRef = useRef({});
  const [current, setCurrent] = useState({ day: null, list: [] });

  useEffect(() => {
    const retVal = Object.entries(neo).map(([dateString, values]) => {
      const day = new Date(dateString);
      const list = values.reduce((retVal, item) => {
        const obj = [
          { type: DEFAULT, data: item.absolute_magnitude_h?.toString() },
          {
            type: DEFAULT,
            data: item.is_potentially_hazardous_asteroids ? 'yes' : 'no',
          },
          { type: DEFAULT, data: item.is_sentry_object ? 'yes' : 'no' },
          { type: DEFAULT, data: item.name },
          { type: URL, data: item.nasa_jpl_url },
          { type: ID, data: item.neo_reference_id },
        ];
        return [...retVal, ...obj];
      }, []);

      return { day, list };
    });

    if (!isEqual(retVal, currentRef.current)) {
      currentRef.current = retVal;
      setCurrent(retVal);
    }
  }, [current, neo]);

  return current;
};
