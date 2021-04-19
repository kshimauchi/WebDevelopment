import React from 'react';
import SongList from './SongsList';

import { selectSong } from '../actions';

//we will be using a functional component since redux
const App = ()=> {
  return (
  <div className="ui container">
    <div className="ui row">
      <div className="column eight wide">
        <SongList/>
      </div>
    </div>
  </div>
  );
};

export default App;
