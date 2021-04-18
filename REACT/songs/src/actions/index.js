//Action Creator, type is required
export const selectSong = (song)=>{
    return {
        type: 'SONG_SELECTED',
        payload: song

    };
};
//named export
