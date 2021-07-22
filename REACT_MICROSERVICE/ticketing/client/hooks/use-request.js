import axios from 'axios';
import { useState } from 'react';


export default function doRequest({ url, method, body }) {
    const [errors, setErrors] = useState(null);
    
    const doRequest = async() => {
        try {
            //clear previous error if any
            setErrors(null);
            const response = await axios[method](url, body);
            
            return response.data;
        }catch (err){
            
            setErrors(
            <div className="alert alert-danger">
                <h4>Error in ProgressEvent...</h4>
                <ul className="my-0" >
                    {
                        err.response.data.errors.map(
                            err => (
                            <li key= { err.message }>
                                {err.message}    
                            </li>
                        ))}
                </ul>
            </div>
            );
        }
    };
    return { doRequest, errors };
};