import React from 'react';
import UserCreate from './UserCreate';
import { LanguageStore} from '../contexts/LanguageContext';
import ColorContext from '../contexts/ColorContext';
import LanguageSeletor from './LanguageSelector';

//we want to seperate business logic with view logic
//easier done with redux, but this is a context system

class App extends React.Component {

    render() {
        return (
            <div className="ui container">
               <LanguageStore>
                <LanguageSeletor />
                    <ColorContext.Provider value="red">
                        <UserCreate />
                    </ColorContext.Provider>
                </LanguageStore>
            </div>
        );
    }
}
export default App;
