import React,{useState ,useEffect} from 'react';
import youtube from '../apis/youtube';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './videoDetail';
//review the refactor
const App = ()=> {
    const [videos, setdVideos ] = useState([])
    const [selectedVideo, setSelectedVideo]= useState(null);

    //didMount equivalent
    useEffect(()=>{
        onTermSubmit('Google Cloud APIs');
    },[]);

    const onTermSubmit = async term => {
        const response = await youtube.get('/search', {
            params:{
                q:term
            }
        });
       
        setdVideos(response.data.items);
        setSelectedVideo(response.data.items[0]);
    };
    // since we are only calling this once, using inline function call below
    // (video)=> setSelectedVideo(video) is equivalent to   onVideoSelect={ setSelectedVideo }
    // in the video list
    // const onVideoSelect = (video)=> {
    //     setSelectedVideo(video);
    // };
    return (
        <div className="ui-container">
            <SearchBar onFormSubmit={onTermSubmit}/>
            <div className="ui grid" >
                <div className="ui row">
                    <div className="eleven wide column">
                        <VideoDetail video={ selectedVideo } />
                    </div>
                    <div className="five wide column">
                        <VideoList 
                        onVideoSelect={ setSelectedVideo } 
                        videos={videos}
                        />
                    </div>
                </div>
            </div>
        </div>
        );
};
export default App;

