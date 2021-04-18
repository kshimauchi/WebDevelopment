import React from 'react';
import Input from './components/Input';
import TodoItem from './components/TodoItem';
import './App.css';

const todoList =[{
  item:'todo',
  done:false,
  id: 111111111
},
{
  item: 'todo1',
  done: true,
  id: 222222222
}
]

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <div className="app__todoContainer">
        {
          todoList.map(item =>(
            <TodoItem />
          ))
        }
        </div>
        <Input/> 
      </div>
       
    </div>
  );
}

export default App;
