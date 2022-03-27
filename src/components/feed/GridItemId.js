import { IdentificationIcon } from '@heroicons/react/solid';
import React, { memo } from 'react';
import PropTypes from 'prop-types';

const FeedGridItemId = ({ onId }) => {
  return (
    <div className="flex items-center justify-center border rounded border-slate-700">
      <button
        onClick={onId}
        className="flex justify-center w-1/2 p-1 m-2 border rounded border-slate-400 hover:border-slate-300 bg-slate-900 hover:bg-slate-800"
      >
        <IdentificationIcon className="w-5 h-5 mr-2" />
        id
      </button>
    </div>
  );
};
FeedGridItemId.propTypes = {
  onId: PropTypes.func,
};

export default memo(FeedGridItemId);
