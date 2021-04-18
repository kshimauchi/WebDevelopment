import { combineReducer } from 'redux';

const songsReducer = () =>{
    //only static here
    return [
        {   title: 'No Scrubs', duration: '4:05' },
        {   title: 'The Chronic of Depression', duration: '2:30'},
        {   title: 'Squilling people who need attention', duration: '3:54'},
        {   title: 'Looks like used Needles',duration: '3:58'}
    ];
};
const selectedSongReducer = (selectedSong = null, action) =>{
    if (action.type ==='SONG_SELECTED') {
        return action.payload;
    }
    return selectedSong;
};

combineReducer({
    songs: songsReducer,
    selectedSong: selectedSongReducer
});

