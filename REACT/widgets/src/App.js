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
  return (
    <div>
        <Dropdown 
        selected={selected}
        onSelectedChange={setSelected}
        options={options}
        />
    </div>
  );
};
//<Accordion items={items} />
