import React, { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NeoCommandsImpl } from '../commands/neo';
import { AboutRoute } from './about';
import { BrowseRoute } from './browse';
import { BrowseAboutRoute } from './browse/about';
import { BrowseDetailsRoute } from './browse/detail';
import { FeedRoute } from './feed';
import { FeedAboutRoute } from './feed/about';
import { FeedDetailsRoute } from './feed/detail';
import { NeoRoute } from './neo';
import { NeoAboutRoute } from './neo/about';
import { NeoDetailRoute } from './neo/detail';
import { RootRoute } from './root';
import { LoadingFull } from '../components/loading';

const neoLoader = async (args: any) => {
  const commands = NeoCommandsImpl.getInstance();
  const neo = await commands.requestNeo(args.params.neoId);

  return neo;
};

const neoBrowseLoader = async (args: any) => {
  const commands = NeoCommandsImpl.getInstance();
  const browse = await commands.requestNeoBrowse(args.params.pageId, 40);

  return browse;
};

const neoFeedLoader = async (args: any) => {
  const commands = NeoCommandsImpl.getInstance();
  const date = await commands.requestNeoDate(args.params.neoDate);

  return date;
};

export type NeoParams = {
  neoId: string | undefined;
};

export type NeoDateParams = {
  neoDate: string | undefined;
};

export type NeoBrowseParams = {
  pageId: string | undefined;
};

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootRoute,
    children: [
      { index: true, Component: AboutRoute },
      {
        path: 'about',
        Component: AboutRoute,
      },
      {
        path: 'browse',
        Component: BrowseRoute,
        children: [
          {
            index: true,
            Component: BrowseAboutRoute,
          },
          {
            path: ':pageId',
            Component: BrowseDetailsRoute,
          },
        ],
      },
      {
        path: 'neo',
        Component: NeoRoute,
        children: [
          { index: true, Component: NeoAboutRoute },
          {
            path: ':neoId',
            Component: NeoDetailRoute,
          },
        ],
      },
      {
        path: 'feed',
        Component: FeedRoute,
        children: [
          { index: true, Component: FeedAboutRoute },
          {
            path: ':neoDate',
            Component: FeedDetailsRoute,
          },
        ],
      },
      { path: 'about', Component: AboutRoute },
    ],
  },
]);

const Routes: FC = () => <RouterProvider router={router} />;

export { Routes };
