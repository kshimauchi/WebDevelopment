import React, {useState} from 'react';
import DropDown from './Dropdown';

    
const options = [
    {
    label: 'Afrikaans',
    value: 'af',
    },
    {
    label: 'Hindi',
    value: 'hi'
    },
    {
    label: 'Arabic',
    value: 'ar'
    }
];
const Translate = () => {
    const [language, setLanguage]= useState(options[0]);
     
    return(
        <div>
            <DropDown 
            selected={language} 
            onSelectedChange={setLanguage}
            options={options} 
            />
        </div>
    );
};
export default Translate;