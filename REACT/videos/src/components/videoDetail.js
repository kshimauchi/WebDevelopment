import React from 'react';
// eslint-disable-next-line no-unused-vars
import Spinner from './Spinner';

const VideoDetail = ({video})=>{
    if(!video) {
    return <div>Loading...</div>;
    }
    const videoSource = `https://www.youtube.com/embed/${video.id.videoId}`;
    return (
         <div> 
              <div className="ui embed">
                <iframe src={videoSource} title="Video Player" />
            </div>
              <div className="ui segment">
            <h4 className="ui header">{video.snippet.title}</h4>
            <p>{video.snippet.description}</p>
            </div>
        </div>
    );
};
export default VideoDetail;