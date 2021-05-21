import React from 'react';
import UserCreate from './UserCreate';
import LanguageContext from '../contexts/LanguageContext';
import ColorContext from '../contexts/ColorContext';
import LanguageSeletor from './LanguageSelector';


class App extends React.Component {
    state = { language: 'english' };
    
    onLanguageChange = language => {
        this.setState({ language });
    }
    render() {
        return (
            <div className="ui container">
                <LanguageSeletor onLanguageChange={this.onLanguageChange} />
                <LanguageContext.Provider value={this.state.language}>
                    <ColorContext.Provider value="red">
                        <UserCreate />
                    </ColorContext.Provider>
                </LanguageContext.Provider>
            </div>
        );
    }
}
export default App;
