import React from 'react';
import SongList from './SongsList';
import SongDetail from './SongDetail';

//we will be using a functional component since redux
const App = ()=> {
  return (
  <div className="ui container grid">
    <div className="ui row">
      <div className="column eight wide">
        <SongList/>
      </div>
      <div className="column eight wide">
        <SongDetail/>
      </div>
    </div>
  </div>
  );
};

export default App;
