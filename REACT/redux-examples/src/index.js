import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import App from './App';


//REDUX: LIFE-CYCLE

//(1) STORE: INFO, GLOBALIZED STATE

//(2) ACTION: ACTION CREATOR: A function that returns an object
    const increment = ()=>{
        return {
            type: 'INCREMENT'
        }
    }
    const decrement = ()=>{
        return {
            type: 'DECREMENT'
        }
    }
//(4) REDUCER:  How does your action transform you state to another state
    const counter = (state = 0, action) => {
        switch(action.type){

            case "INCREMENT":

                return state + 1;
            
            case "DECREMENT":

                return state - 1;
            
            default:

                return state;    
        }
    };
    let store = createStore(counter);
//display in console
    store.subscribe(()=> console.log(store.getState()));

//(5) Dispatch: We update the globalized state depending on what action is taken
    store.dispatch(increment());
    //store.subscribe(()=> console.log(store.getState()));
    store.dispatch(decrement());
    store.dispatch(decrement());



ReactDom.render(<App/>,document.querySelector('#root'));
