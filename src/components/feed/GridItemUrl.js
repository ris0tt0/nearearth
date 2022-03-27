import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { PhotographIcon } from '@heroicons/react/solid';

const FeedGridItemUrl = ({ onUrl }) => {
  return (
    <div className="flex items-center justify-center border rounded border-slate-700">
      <button
        className="flex justify-center w-1/2 p-1 m-2 border rounded border-slate-400 hover:border-slate-300 bg-slate-900 hover:bg-slate-800"
        onClick={onUrl}
      >
        <PhotographIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

FeedGridItemUrl.propTypes = {
  onUrl: PropTypes.func,
};

export default memo(FeedGridItemUrl);
