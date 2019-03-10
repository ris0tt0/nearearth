import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NeoFeed from './components/feed/';
import NeoBrowse from './components/browse/';

class App extends Component {
  render() {
    return (
      <div className="App">
				<NeoFeed />
				<NeoBrowse />
      </div>
    );
  }
}

export default App;
