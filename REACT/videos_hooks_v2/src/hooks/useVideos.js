import React from 'react';
import {useEffect, useState} from 'react';
import youtube from '../apis/youtube';

const useVideos = (defaultSearchTerm) =>{
    const [videos, setdVideos ] = useState([]);

    useEffect( ()=> {
        search(defaultSearchTerm);
    },[defaultSearchTerm]);
    
    const search = async term => {
        const response = await youtube.get('/search', {
            params:{
                q:term,
            },
        });
        setdVideos(response.data.items);
    };
    //react way of doing this, javascript {}
    return [videos, search];  
};
export default useVideos;
