import axios from 'axios';
// baseUrl, we will have multiple requests, and will be swapping the api endpoints 
// as a means to ingest different response datas'
export default axios.create({
    baseURL: `${process.env.REACT_APP_URI}`
});