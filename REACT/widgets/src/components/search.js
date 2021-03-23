import React, {useEffect, useState} from 'react';

//debouncing the search
const Search = () => {
    const [term, setTerm] = useState('');
    
    //useEffect run every time here
    console.log('I run with every render');
    
    useEffect(()=> {
        //when do we want this to be rendered the second argument
        //controls
        console.log('I run at initialization, and every render');
    });
    // ,[term], or [] runs at the initial, when re-rendered or if any
    // element has changed 3 cases
    //nothing, array, or whatever
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