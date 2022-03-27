import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Feed from '../../components/feed/Feed';
import FeedGridItem from '../../components/feed/GridItem';
import FeedGridItemId from '../../components/feed/GridItemId';
import FeedGridItemUrl from '../../components/feed/GridItemUrl';
import FeedHeader from '../../components/feed/Header';
import { useCommands } from '../../hooks';
import { neoFeedLinks } from '../../selectors';
import { ID, URL } from './const';
import { useNeoFeed } from './hooks';

const NeoFeed = () => {
  const [isFeedLoading, setIsFeedLoading] = useState(false);
  const links = useSelector(neoFeedLinks);
  const neoFeedList = useNeoFeed();
  const commands = useCommands();

  const feedItems = useMemo(() => {
    return neoFeedList[0]?.list?.map(({ data, type }, index) => {
      if (type === URL)
        return (
          <FeedGridItemUrl
            key={index}
            onUrl={() => commands.feedNasaUrl(data)}
          />
        );
      if (type === ID)
        return (
          <FeedGridItemId key={index} onId={() => commands.feedItemId(data)} />
        );
      return <FeedGridItem key={index} label={data} />;
    });
  }, [neoFeedList, commands]);

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
