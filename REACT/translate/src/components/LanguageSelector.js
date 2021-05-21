import React from 'react';
import LanguageContext from '../contexts/LanguageContext';

//single context
class LanguageSeletor extends React.Component {
    //selector to context
    static contextType = LanguageContext;

    render() {
        console.log(this.context);
        return (
            <div>
                Select a language :
                <i className="flag us"
                    onClick={() => this.context.onLanguageChange('english')}
                />
                <i className="flag jp"
                    onClick={() => this.context.onLanguageChange('japanese')}
                />
            </div>
        );
    }
}
export default LanguageSeletor;