/* eslint-disable import/no-anonymous-default-export */
import React, {useState} from 'react';

import Accordion from './components/Accordion';
import Search from './components/Search';
import Dropdown from './components/Dropdown';
import Translate from './components/Translate';
import Route from './routes/Routes';

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
//Manual Route Mapping for navigation
const showAccordion = () =>{
  if(window.location.pathname === '/'){
    return <Accordion items={items} />;
  }
};
const showList = () =>{
  if(window.location.pathname === '/list'){
    return <Search />;
  }
};
const showDropdown = ()=>{
  if(window.location.pathname === '/dropdown'){
  return <Dropdown/>;
  }  
};
const showTranslate = ()=>{
  if(window.location.pathname === '/translate'){
    return <Translate/>;
  }
};
//The inner components are a child property in Route
export default ()=> {
  const [selected, setSelected] = useState(options[0]);
  return (
    <div> 
      <Route path="/">
        <Accordion items={items} />
      </Route>
      <Route path="/list">
        <Search/>
      </Route>
      <Route path="/dropdown">
        <Dropdown
        label="Select a Color"
        options={options}
        selected={selected}
        onSelectedChange={setSelected}
        
        />
      </Route>
      <Route path="/translate">
        <Translate/>
      </Route>

    </div>
  );
};
/*
const showComponents = (route, component)=>{
  return window.location.pathname === route
  ? component
  : null;
};



*/
