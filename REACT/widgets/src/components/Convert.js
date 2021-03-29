import axios from 'axios';
import React, {useState, useEffect} from 'react';


const Convert =( {language, text} ) => {
    
    const [translated, setTranslate] = useState('');
    const [debouncedText, setDebouncedText] = useState(text);
    
    useEffect(()=> {
        const timerId = setTimeout(()=>{
            setDebouncedText(text);
        }, 750);
        return() => {
            clearTimeout(timerId);
        };
    }, [text]);

    useEffect( () => {
     
        const doTranslation = async () => {
           const {data} = await axios.post(`${process.env.REACT_APP_API_TRANSLATE_API_URL}`,
        {},
            {
                params : {
                q: debouncedText,
                target: language.value,
                key: `${process.env.REACT_APP_API_TRANSLATE_KEY}`
            },
            }
        );
        //axios, resp data
        setTranslate(data.data.translations[0].translatedText);
    }; 
        doTranslation();
        
    },[language, debouncedText]);
    return (
        <div>
            <h1 className="ui header">{translated}</h1>
        </div>
    );
};
export default Convert;
/*
1) we will setup a timer when user types in text box
2) if they pause for 500ms, we will useEffect and make the call
3) if their is another update within 500ms we will cancel the timer

*/