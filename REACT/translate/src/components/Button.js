import React from 'react';
import LanguageContext from '../contexts/LanguageContext';

class Button extends React.Component {
    //using consumer
    //consumer needs a child funciton
    //is automatically called by the consume with 
    //whatever value is inside the pipe so to speak,
    //this will be invoked, this.context uses the other approach
    renderSubmit(value) {
        return value === 'english' ? 'Submit' : 'Sanka suru';
    }
    render() {
               
        return (
            <button
                className="ui button primary">
                <LanguageContext.Consumer>
                    {(value)=> this.renderSubmit(value)}
                </LanguageContext.Consumer>
            </button>  
        );
    }
}
export default Button;