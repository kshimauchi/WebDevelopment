import React, {useState} from 'react';

//debouncing the search
const Search = () => {
    const [term, setTerm] = useState('');
    //request
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