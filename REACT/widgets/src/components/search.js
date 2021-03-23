import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Search = () => {
    // using process env: configuration is not using environments like (prod, qa, stage...dev)
    // Note: we cannot use an async, await inside the useEffect hook 
    const [term, setTerm] = useState('programming');
    const [results, setResults] = useState([]);
    // render when 1st rendered and anytime term changes
    // Search wikipedia everytime a key is pressed, but we will debounce later
    // on [term] change re-render the code, can't use aync and await inside useEffect
    console.log(results);
    useEffect(()=> {
        //helper function
        const search = async()=>{
          const {data} = await axios.get(`${process.env.REACT_APP_API}`,{
            params: {
                action: 'query',
                list:'search',
                origin:'*',
                format: 'json',
                srsearch: term,
            },
        });
        setResults(data.query.search);
    };
    
        search();
               
    }, [term]);
    
    return(
        <div>
        <div className="ui form">
            <div className="field">
                <label>Enter Search Term</label>
                <input 
                className="input"
                value ={term}
                onChange={e=> setTerm(e.target.value)}

                />
            </div>
        </div>
        </div>
    );
};
export default Search;