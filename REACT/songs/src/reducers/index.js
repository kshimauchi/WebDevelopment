import { combineReducers } from 'redux';

const songsReducer = () =>{
    //only static here
    return [
        {   title: 'No Scrubs', duration: '4:05' },
        {   title: 'The Verve', duration: '4:34'},
        {   title: 'Don\'t Speak', duration: '5:02'},
        {   title: 'Everybody wants to rule the World',duration: '3:58'}
    ];
};
const selectedSongReducer = (selectedSong = null, action) =>{
    if (action.type ==='SONG_SELECTED') {
        return action.payload;
    }
    return selectedSong;
};

export default combineReducers({
    songs: songsReducer,
    selectedSong: selectedSongReducer
});

