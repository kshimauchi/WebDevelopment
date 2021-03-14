import React from 'react';

//not connected
const Spinner = (props) =>{
    return(
        <div className="ui active inverted dimmer">
            <div className="ui active inverted dimmer">
                <div className="ui mini text loader">Loading</div>
                {props.message}
            </div>
        </div>
         
    )
};
export default Spinner;

