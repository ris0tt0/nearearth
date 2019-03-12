import React, { Component } from 'react';
import './App.css';
import NeoFeed from './components/feed/';
import NeoBrowse from './components/browse/';
import NeoLookup from './components/lookup/';

class App extends Component {
  render() {
    return (
      <div className="App">
				<NeoFeed />
				<NeoLookup />
				<NeoBrowse />
      </div>
    );
  }
}

export default App;
