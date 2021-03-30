import React from 'react';
import youtube from '../apis/youtube';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './videoDetail';

class App extends React.Component {
    state = { videos: [], selectedVideo: null };
    
    componentDidMount(){
        this.onTermSubmit('Google Cloud APIs');
    }
    
    onTermSubmit = async term => {
        //term is paased here from the onFormSubmit from seachbar component where we take the term 
        //as input and calling the import
        //axios instance from youtube
        const response = await youtube.get('/search', {
            params:{
                q:term
            }
        });
       this.setState({ 
            videos : response.data.items,
            selectedVideo: response.data.items[0]
        });
    };
    onVideoSelect = (video)=> {
        //We want to update the state with videoselected
        //console.log('From the App!', video );
        this.setState( { selectedVideo : video } );
    };
    render() {
        return (
        <div className="ui-container">
            <SearchBar onFormSubmit={this.onTermSubmit}/>
            <div className="ui grid" >
                <div className="ui row">
                    <div className="eleven wide column">
                        <VideoDetail video={ this.state.selectedVideo } />
                    </div>
                    <div className="five wide column">
                        <VideoList 
                        onVideoSelect={this.onVideoSelect} 
                        videos={this.state.videos}
                        />
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
export default App;