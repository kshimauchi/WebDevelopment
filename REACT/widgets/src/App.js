/* eslint-disable import/no-anonymous-default-export */
import React, {useState} from 'react';

import Accordion from './components/Accordion';
import Search from './components/Search';
import Dropdown from './components/Dropdown';

const options = [
  {
    label: 'The color Red',
    value: 'Red'
  },
  {
    label: 'The color blue',
    value: 'Blue'
  },
  {
    label: 'The color Silver',
    value: 'Silver'
  },
];

export default ()=> {
  
  const [selected, setSelected] = useState(options[0]);
  const [showDropdown, setShowDropdown]= useState(true);


  return (
    <div> <button onClick={ ()=> setShowDropdown(!showDropdown) }>Toggle Dropdown visibility</button>

    { showDropdown ? (
     
        <Dropdown 
        selected={selected}
        onSelectedChange={setSelected}
        options={options}
        />
     ) :null
    }
    </div>
  );
};
//<Accordion items={items} />
