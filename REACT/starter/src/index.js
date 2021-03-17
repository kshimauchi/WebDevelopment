import ReactDom from 'react';
import React from 'react';
import App from './App';

ReactDom.render(<div><App/></div>,document.querySelector('#root'));
// Has two render twice: null, then after the state change