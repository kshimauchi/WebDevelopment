import '../css/videoItem.css';
import React from 'react';

//now this prop
const VideoItem = ({video, onVideoSelect}) => {
    return( 
        <div className="video-item item" onClick={()=> onVideoSelect(video) } >
            <img 
              alt={video.snippet.title}
              className="ui-image"
              src={video.snippet.thumbnails.high.url}
            />
            <div className="content">
                <div className="header">
                    {video.snippet.title}
                </div>
            </div>
        </div>
    );
};
export default VideoItem;