import {configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todoSlice';

export default configureStore({
  reducer: {
    todos:todoReducer
  },
});
