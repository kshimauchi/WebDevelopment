import React from 'react';
import LanguageContext from '../contexts/LanguageContext';

class Button extends React.Component {
    //contextType is a special property on the Context
    //equivalently Button.contextype = LanguageContext
    static contextType = LanguageContext;

    render() {
        const text = this.context === 'english' ? 'Submit' : 'Sanka suru';
        return (
            <button className="ui button primary">
                {text}
            </button>  
        );
    }
}
export default Button;