import React from 'react';
//Adding Language Store Component
const Context = React.createContext('english');

export class LanguageStore extends React.Component {
    state = { language: 'english' };
    
    onLanguageChange = (language) => {
        this.setState({ language });
    }
    //must be upper case on Context:
    render() {
        return (
            <Context.Provider value={{ ...this.state, onLanguageChange: this.onLanguageChange }}>
                {this.props.children}
            </Context.Provider>
        );
    }
}
export default Context;
/*
import {LanguageStore} from ...

*/

