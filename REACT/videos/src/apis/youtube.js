import axios from 'axios';


export default axios.create({
    
    baseURL: `${process.env.REACT_APP_URI}`,
    params: {
        part: 'snippet',
        type: 'video',
        maxResults: 5,
        key: `${process.env.REACT_APP_YOUTUBEv3_API_KEY}`,
        q: ''
    
    },
});