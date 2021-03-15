import React from 'react';

import SearchBar from './SearchBar';
import unsplash from '../api/unsplash';
import ImageList from './imageList';

class App extends React.Component {
    //default an array
    state = { images: [] };
     
     onSearchSubmit = async ( term )=> {
            const response = await unsplash.get('/search/photos', {
            params:{query: term}
   
    })
     this.setState({images: response.data.results});
    }    
    render() {
        return (
            <div className="ui-container" style={{ marginTop: '10px' }}>
            <SearchBar onSubmit={this.onSearchSubmit} />
            <ImageList images={this.state.images}/>
            </div>
        );
    }
   
}
export default App;
