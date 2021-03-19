import axios from 'axios';


// Authorization: Client-ID YOUR_ACCESS_KEY
export default axios.create({
    
    baseURL: `${process.env.REACT_APP_TEXT_TO_SPEECH_URL}`,
    headers:{
        Authorization: `${ process.env.REACT_APP__TEXT_TO_SPEECH_KEY }`
    },
});
