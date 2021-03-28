/* eslint-disable import/no-anonymous-default-export */
import React, {useState} from 'react';

import Accordion from './components/Accordion';
import Search from './components/Search';
import Dropdown from './components/Dropdown';
import Translate from './components/Translate';


const items = [
  {
    title: 'What is React',
    content: 'React is a front end technology'
  },
  {
    title: 'Why use react',
    content: 'because lots of people like using it'
  }

];
const options = [
  {
    label: 'The Color is Red',
    value: 'red',

  },
  {
    label: 'The Color is Green',
    value: 'Green',
  },
  {
    label: 'A Shade of Blue',
    value: 'blue'
  },
];

export default ()=> {
  return (
    <div> 
      <Translate />
    </div>
  );
};
//<Accordion items={items} />

