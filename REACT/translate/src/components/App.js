import React from 'react';
import UserCreate from './UserCreate';

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
                     <i className="flag us" onClick={ ()=> this.onLanguageChange('english')}/>
                     <i className="flag jp" onClick={ ()=> this.onLanguageChange('japanese')}/>
                </div>
               <UserCreate/>
                 
            </div>
        );
    }
}
export default App;
/*
How do we get information in, and out of the context object
We have sources of data, default value, or in the parent component we use a provider

this.context, in nested child component or
we create a consumer component
*/