import React from 'react';
import "./TodoItem.css";

 const TodoItem = ({name, id, done}) => {
    return (
        <div className='todoItem'>
            <span className={done && 'todoItem--done'}>{name}</span>
        </div>
    );
}
export default TodoItem;
