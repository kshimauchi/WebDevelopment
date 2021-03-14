import React from 'react';
import VideoItem from './VideoItem';
//destructured props using videos
const VideoList = ({videos, onVideoSelect})=> {
    const renderedList = videos.map((video) =>{
        return (
              <VideoItem
                key={video.id.videoId} 
                onVideoSelect={onVideoSelect}
                video={video}
            />
        );
    });
    //props records 
    return <div className="ui relaxed divided list">{renderedList}</div>

};
export default VideoList;
