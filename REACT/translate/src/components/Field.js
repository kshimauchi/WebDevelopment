import React from 'react';
import LanguageContext from '../contexts/LanguageContext';

class Field extends React.Component {
    //context holds more properties
    static contextType = LanguageContext;
    
    render() {
        const text = this.context.language === 'english' ? 'Name' : 'Namae';
        return (
            <div className="ui field">
                    <label>{text}</label>
                    <input />
            </div>  
        );
    }
}
export default Field;