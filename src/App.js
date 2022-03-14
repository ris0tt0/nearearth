import React from 'react';
import { NeoFeed } from './components/feed/NeoFeed';

const App = () => {
  return (
    <div className="flex w-full min-h-screen text-sm text-gray-400 bg-slate-800">
      <NeoFeed />
      {/* <NeoLookup />
        <NeoBrowse /> */}
    </div>
  );
};

export default App;
