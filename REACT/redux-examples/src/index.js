import React from 'react';
import ReactDom from 'react-dom';
import App from './App';


//REDUX: LIFE-CYCLE
//(1) STORE: INFO, GLOBALIZED STATE
//(2) ACTION: ACTION CREATOR: A function that returns an object
//(4) REDUCER:  How does your action transform you state to another state
//(5) Dispatch: We update the globalized state depending on what action is taken




ReactDom.render(<App/>,document.querySelector('#root'));
