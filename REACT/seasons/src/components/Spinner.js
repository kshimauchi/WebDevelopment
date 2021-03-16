import React from 'react';

const Spinner = (props) =>{
    return(
        <div className="ui active dimmer">
            <div className="ui big text loader">
                {props.message}
            </div>
        </div>
        );
};
//if no prop message is passed in it will default with the Loading...
Spinner.defaultProps = {
    message: 'Loading...'
};

export default Spinner;