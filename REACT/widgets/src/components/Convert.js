import axios from 'axios';
import React, {useState, useEffect} from 'react';


const Convert =( {language, text} ) => {
    //axios post, url, {} {}
    useEffect( () => {
        
        axios.post(`${process.env.REACT_APP_API_TRANSLATE_API_URL}`,
        {},
        {
            params : {
            q:text,
            target: language.value,
            key: `${process.env.REACT_APP_API_TRANSLATE_KEY}`
        },
    }
    );
            
    },[language, text]);
    return (
        <div>
            
        </div>
    );
};
export default Convert;
