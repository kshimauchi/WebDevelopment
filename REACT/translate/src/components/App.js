import React from 'react';
import UserCreate from './UserCreate';
import LanguageContext from '../contexts/LanguageContext';

class App extends React.Component {
    state = { language: 'english' };
    
    onLanguageChange = language => {
        this.setState({ language });
    }
    render() {
        return (
            <div className="ui container">
                <div>
                    Select a language :
                     <i className="flag us"
                        onClick={() => this.onLanguageChange('english')}
                    />
                    <i className="flag jp"
                        onClick={() => this.onLanguageChange('japanese')}
                    />
                </div>
                
                <LanguageContext.Provider value={this.state.language}>
                    <UserCreate/>
                </LanguageContext.Provider>
            
                 
            </div>
        );
    }
}
export default App;
//we will use provide to update values in the context
//object