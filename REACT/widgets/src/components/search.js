import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Search = () => {
    
    const [term, setTerm] = useState('programming');
    const [results, setResults] = useState([]);
   
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
    setTimeout(()=>{
        if(term) {  
            search();
        }
    },500);
    
    }, [term]);
    
    const renderedResults = results.map( result=> {
        return( 
        <div key={result.pageid} className="item">
            <div className="right floated content">
                <a 
                className="ui button"
                href={`https://en.wikipedia.org?curid=${result.pageid}`}
                >
                Go
                </a>
            </div>
            <div className="content">
                <div className="header">
                    {result.title}
                </div>
                <span dangerouslySetInnerHTML={{__html:result.snippet}}></span>
            </div>
            <hr color='silver' />
        </div>
        );
    });
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
        <div className="ui ceiled list">
            {renderedResults}
        </div>
        
        </div>
    );
};
export default Search;