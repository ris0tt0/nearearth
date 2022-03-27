import React, { memo } from 'react';
import PropTypes from 'prop-types';

const FeedGridItem = ({ label }) => {
  return (
    <div className="flex items-center justify-center border rounded border-slate-700">
      {label}
    </div>
  );
};
FeedGridItem.propTypes = {
  label: PropTypes.string,
};

export default memo(FeedGridItem);
