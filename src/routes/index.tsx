import Logger from 'js-logger';
import React, { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NeoCommandsImpl } from '../commands/neo';
import { LoadingFull } from '../components/loading';
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

/*
LoaderFunction<Context>: ((args: LoaderFunctionArgs<Context>, handlerCtx?: unknown) => unknown) & {
    hydrate?: boolean;
}
*/

const neoLoader = async (args: any) => {
  Logger.info('neoloader', args);
  const commands = NeoCommandsImpl.getInstance();
  const neo = await commands.requestNeo(args.params.neoId);

  return neo;
};

export type NeoParams = {
  neoId: string | undefined;
};

export type NeoDateParams = {
  neoDate: string | undefined;
};

export type BrowseParams = {
  browseId: string | undefined;
};

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootRoute,
    children: [
      { index: true, Component: AboutRoute },
      {
        path: 'browse',
        Component: BrowseRoute,
        children: [
          { index: true, Component: BrowseAboutRoute },
          { path: ':browseId', Component: BrowseDetailsRoute },
        ],
      },
      {
        path: 'neo',
        Component: NeoRoute,
        children: [
          { index: true, Component: NeoAboutRoute },
          {
            path: ':neoId',
            HydrateFallback: LoadingFull,
            loader: neoLoader,
            Component: NeoDetailRoute,
          },
        ],
      },
      {
        path: 'feed',
        Component: FeedRoute,
        children: [
          { index: true, Component: FeedAboutRoute },
          { path: ':neoDate', Component: FeedDetailsRoute },
        ],
      },
      { path: 'about', Component: AboutRoute },
    ],
  },
]);

const Routes: FC = () => {
  return <RouterProvider router={router} />;
};

export { Routes };
