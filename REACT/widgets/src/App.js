/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import Accordion from './components/accordion';

const items = [
  {
    title: 'What is React?',
    content: 'React is a front end framework'
  },
  {
    title: 'Why use React',
    content: 'React is a favorite js among engineers'
  },
  {
    title: 'How do you use React',
    content: 'React is component based'
  },
];
export default ()=> {
  return (
    <div>
      
      <Accordion items={items} />
    </div>
  );
};
