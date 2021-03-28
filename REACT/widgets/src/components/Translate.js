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
    const [text, setText] = useState('');

    return(
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Text</label>
                    <input value ={text} onChange={(e)=>setText(e.target.value)}/>
                </div>
            </div>
        
            <DropDown
            label= "Select Language" 
            selected={language} 
            onSelectedChange={setLanguage}
            options={options} 
            />
        </div>
    );
};
export default Translate;