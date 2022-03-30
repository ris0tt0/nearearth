import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Logger from 'js-logger';

const GridHeader = ({ date, onNext, onPrev, isLoading }) => {
  const [dateLabel, setDateLabel] = useState('');

  useEffect(() => {
    if (date?.toString) {
      const value = moment(date).format('dddd, MMMM Do YYYY');
      Logger.info('FeedHeader::values::', value);

      setDateLabel(value);
    }
  }, [date]);

  return (
    <div className="flex flex-col items-center justify-center p-2 m-2 border rounded border-amber-200">
      {isLoading ? (
        <div
          className="inline-block w-5 h-5 border-4 rounded-full spinner-border animate-spin"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div>{dateLabel}</div>
      )}
      <div className="flex">
        <button
          disabled={isLoading}
          className="flex justify-center w-1/2 p-1 m-2 border rounded border-slate-400 hover:border-slate-300 bg-slate-900 hover:bg-slate-800"
          onClick={onPrev}
        >
          prev
        </button>
        <button
          disabled={isLoading}
          className="flex justify-center w-1/2 p-1 m-2 border rounded border-slate-400 hover:border-slate-300 bg-slate-900 hover:bg-slate-800"
          onClick={onNext}
        >
          next
        </button>
      </div>
    </div>
  );
};

GridHeader.propTypes = {
  date: PropTypes.object,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default memo(GridHeader);
