import React from 'react';

class LanguageSeletor extends React.Component {

    render() {
        return (
            <div>
                Select a language :
                <i className="flag us"
                    onClick={() => this.props.onLanguageChange('english')}
                />
                <i className="flag jp"
                    onClick={() => this.props.onLanguageChange('japanese')}
                />
            </div>
        );
    }
}
export default LanguageSeletor;