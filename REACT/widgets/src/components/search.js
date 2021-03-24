import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Search = () => {
    
    const [term, setTerm] = useState('programming');
    //important change to grasp!
    const [debouncedTerm, setdebouncedTerm] =useState(term);
    const [results, setResults] = useState([]);
    
    //update term, setup timer to debounceTerm, if update
    //we cancel the search
    useEffect(()=>{
        const timerId = setTimeout(()=>{
            if(term){
            setdebouncedTerm(term);
            }
        }, 1000);
        return ()=>{
            clearTimeout(timerId);
        }
    }, [term]);
    //Key: This will also render initially
    useEffect(()=>{
         //helper function
         const search = async()=> {
            const {data} = await axios.get(`${process.env.REACT_APP_API}`,{
              params: {
                  action: 'query',
                  list:'search',
                  origin:'*',
                  format: 'json',
                  srsearch: debouncedTerm,
              },
          });
          setResults(data.query.search);
      }
      //search
      search();

    },[debouncedTerm]);
    
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