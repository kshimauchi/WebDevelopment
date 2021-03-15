import axios from 'axios'

// Customized copy of axios
// Authorization: Client-ID YOUR_ACCESS_KEY
export default axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers:{
        Authorization: `${ process.env.REACT_APP_AUTHORIZATION }`
    },
});
