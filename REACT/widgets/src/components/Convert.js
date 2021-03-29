import axios from 'axios';
import React, {useState, useEffect} from 'react';


const Convert =( {language, text} ) => {
    
    const [translated, setTranslate] = useState('');

    
    useEffect( () => {
        //cannot directly use async inside useEffect directly
        //Here we are calling a helper function and destructring out the {data}
        //Post Request
        const doTranslation = async () =>{
           const {data} = await axios.post(`${process.env.REACT_APP_API_TRANSLATE_API_URL}`,
        {},
            {
                params : {
                q:text,
                target: language.value,
                key: `${process.env.REACT_APP_API_TRANSLATE_KEY}`
            },
            }
        );
        //axios, resp data
        setTranslate(data.data.translations[0].translatedText);
    }; 
        doTranslation();
        
    },[language, text]);
    return (
        <div>
            <h1 className="ui header">{translated}</h1>
        </div>
    );
};
export default Convert;
