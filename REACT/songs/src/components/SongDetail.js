import React from 'react';
import { connect } from 'react-redux';
//destructed out song, since we don't need the entire props
const SongDetail =({song})=>{
    if(!song){
        return <div>Select a Song</div>;
    }
    return(
        <div>
        <h3> Details for song: </h3>
        <span> Title: {song.title} </span>
        <br />
        <span> Duration: {song.duration} </span>
        </div>
    ); 
};
const mapsStateToProps = (state)=>{
   return { song: state.selectedSong }
};
export default connect(mapsStateToProps)(SongDetail);