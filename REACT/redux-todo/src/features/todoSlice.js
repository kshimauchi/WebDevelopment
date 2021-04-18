import { createSlice } from '@reduxjs/toolkit';


const initialState ={
    todoList: []
}
const todoSlice = createSlice(
    {
    name: "todos",
    initialState,
    reducer: {
        //setTodoList(action.payload)
        saveTodo: (state, action)=> {
            state.todoList.push(action.payload)
        }
    }
});

export const { saveTodo } = todoSlice.actions;
export default todoSlice.reducer;