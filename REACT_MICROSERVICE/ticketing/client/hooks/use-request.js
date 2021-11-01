import axios from 'axios';
import { useState } from 'react';


export default ({ url, method, body, onSuccess })=>{
    const [errors, setErrors] = useState(null);
    
    //props empty obj for additional arguments when need be
    const doRequest = async(props = {}) => {
        try {
            //clear previous error if any
            setErrors(null);
            
            const response = await axios[method](url,{...body, ...props});
            //const response = await axios[method](url, body);
            
            // for routing purposes to landing page on success
            if (onSuccess) {
                onSuccess(response.data);
            }
            
            return response.data;

        }catch (err){
            
            setErrors(
            <div className="alert alert-danger">
                <h4>Ooops...</h4>
                <ul className="my-0" >
                    { err.response.data.errors.map(
                        (err) => (
                            <li key= { err.message }>{err.message}</li>
                        )
                    )
                    }
                </ul>
            </div>
            );
            //could throw err here if you wanted to
            //await the doRequest
        }
    };
    return { doRequest, errors };
};