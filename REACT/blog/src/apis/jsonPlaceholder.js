import axios from 'axios';
//`${process.env.REACT_APP_URI}`
export default axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});