import React from 'react';
import LanguageContext from '../contexts/LanguageContext';
import ColorContext from '../contexts/ColorContext';

class Button extends React.Component {
  //we use consumer approach when we have multiple contexts to get data from
  //Example: access multiple different context objects, need consumer approach
    renderSubmit(value) {
        return value === 'english' ? 'Submit' : 'Sanka suru';
    }
    renderButton(color) {
           return (
            <ColorContext.Consumer>
                {(color) =>
                    <button
                        className={`ui button ${color}`}>
                        <LanguageContext.Consumer>
                            {(value)=> this.renderSubmit(value)}
                        </LanguageContext.Consumer>
                    </button> 
                }
            </ColorContext.Consumer>
     
        );
    }
    render() {
               
        return (
            <ColorContext.Consumer>
                {color => this.renderButton(color)}
            </ColorContext.Consumer>
     
        );
    }
}
export default Button;