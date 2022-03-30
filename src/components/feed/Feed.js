import React, { memo } from 'react';
import PropTypes from 'prop-types';

const headerClass = 'p-4 border border-red-400 rounded text-xs';

const GridFeed = ({ children }) => {
  return (
    <div className="grid grid-cols-6 gap-3 p-5 border rounded justify-items-stretch border-cyan-200">
      <div className="p-4 text-xs border border-red-400 rounded">
        magnitude h
      </div>
      <div className={headerClass}>hazardous</div>
      <div className={headerClass}>sentry</div>
      <div className={headerClass}>name</div>
      <div className={headerClass}>nasa url</div>
      <div className={headerClass}>NEO id</div>
      {children}
    </div>
  );
};

GridFeed.propTypes = {
  children: PropTypes.array,
};

export default memo(GridFeed);
