import axios from 'axios';
// https://jsonplaceholder.typicode.com/

export default axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});