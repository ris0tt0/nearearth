import { IdentificationIcon, PhotographIcon } from '@heroicons/react/solid';
import Logger from 'js-logger';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCommands } from '../../hooks';
import { neoFeedLinks } from '../../selectors';
import { ID, URL } from './const';
import { useNeoFeed } from './hooks';

const headerClass = 'p-4 border border-red-400 rounded text-xs';

const FeedGridItemUrl = ({ url }) => {
  const handlePhoto = useCallback(() => {
    Logger.info('click url', url);
  }, [url]);

  return (
    <div className="flex items-center justify-center border rounded border-slate-700">
      <button
        className="flex justify-center w-1/2 p-1 m-2 border rounded border-slate-400 hover:border-slate-300 bg-slate-900 hover:bg-slate-800"
        onClick={handlePhoto}
      >
        <PhotographIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

FeedGridItemUrl.propTypes = {
  url: PropTypes.string,
};

const FeedGridItemId = ({ id }) => {
  const handleId = useCallback(() => {
    Logger.info('handle id', id);
  }, [id]);

  return (
    <div className="flex items-center justify-center border rounded border-slate-700">
      <button
        onClick={handleId}
        className="flex justify-center w-1/2 p-1 m-2 border rounded border-slate-400 hover:border-slate-300 bg-slate-900 hover:bg-slate-800"
      >
        <IdentificationIcon className="w-5 h-5 mr-2" />
        id
      </button>
    </div>
  );
};
FeedGridItemId.propTypes = {
  id: PropTypes.string,
};

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

const FeedHeader = ({ date, onNext, onPrev, isLoading }) => {
  const [dateLabel, setDateLabel] = useState('');

  useEffect(() => {
    if (date?.toString) {
      const value = moment(date).format('dddd, MMMM Do YYYY');
      Logger.info('values::', value);

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

FeedHeader.propTypes = {
  date: PropTypes.object,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  isLoading: PropTypes.bool,
};

const Feed = ({ children }) => {
  return (
    <div className="grid grid-cols-6 gap-3 p-5 border rounded justify-items-stretch border-cyan-200">
      <div className="p-4 text-xs border border-red-400 rounded">
        magnitude h
      </div>
      <div className={headerClass}>hazardous</div>
      <div className={headerClass}>sentry</div>
      <div className={headerClass}>name</div>
      <div className={headerClass}>jpeg url</div>
      <div className={headerClass}>NEO id</div>
      {children}
    </div>
  );
};

Feed.propTypes = {
  children: PropTypes.array,
};

const NeoFeed = () => {
  const [isFeedLoading, setIsFeedLoading] = useState(false);
  const links = useSelector(neoFeedLinks);
  const neoFeedList = useNeoFeed();
  const commands = useCommands();

  const feedItems = useMemo(() => {
    return neoFeedList[0]?.list?.map(({ data, type }, index) => {
      if (type === URL) return <FeedGridItemUrl key={index} url={data} />;
      if (type === ID) return <FeedGridItemId key={index} id={data} />;
      return <FeedGridItem key={index} label={data} />;
    });
  }, [neoFeedList]);

  const feedDate = useMemo(() => {
    return neoFeedList[0]?.day;
  }, [neoFeedList]);

  const handleNext = useCallback(() => {
    setIsFeedLoading(true);
    commands.feedUrl(links.next).finally(() => setIsFeedLoading(false));
  }, [commands, links]);

  const handlePrev = useCallback(() => {
    setIsFeedLoading(true);
    commands.feedUrl(links.prev).finally(() => setIsFeedLoading(false));
  }, [commands, links]);

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full h-full border rounded border-slate-400 ">
      <div className="flex items-center">
        <FeedHeader
          date={feedDate}
          onNext={handleNext}
          onPrev={handlePrev}
          isLoading={isFeedLoading}
        />
      </div>
      <Feed>{feedItems}</Feed>
    </div>
  );
};

export { NeoFeed };
