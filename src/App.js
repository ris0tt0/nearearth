import Logger from 'js-logger';
import React from 'react';
import { NeoFeed } from './containers/feed/NeoFeed';
import { useCommands } from './hooks';
// import { NeoFeed } from './components/feed/NeoFeed';

const App = () => {
  const commands = useCommands();

  Logger.info('App::commands', commands);
  return (
    <div className="w-full min-h-screen text-sm text-gray-400 bg-slate-800">
      <NeoFeed />
      {/* <NeoLookup />
        <NeoBrowse /> */}
    </div>
  );
};

export default App;
