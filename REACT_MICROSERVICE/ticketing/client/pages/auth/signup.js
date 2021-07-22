import { useState } from 'react';
import axios from 'axios';

import useRequest from '../../hooks/use-request';

export default function authSignup() {
    
    const [email, setEmail] = useState('');
    const [password, setPasword] = useState('');
    
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email, password
        }
    });
    
    const onSubmit = async (event) => {
        event.preventDefault();
        doRequest();
        
    // try {
    //     const response = await axios.post('/api/users/signup', {
    //             email, password
    //         });
    //         console.log(response.data);
    // } catch (err) {
        
    //         setErrors(err.response.data.errors);
    // }
    };
    
    return (
        <form onSubmit={ onSubmit} >
            <h1>Sign Up</h1 >
            <div className="form-group">
                <label>Email Address</label>    
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="form-control"
                />
            </div>
            
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPasword(e.target.value)}
                    className="form-control"
                />
            </div>
            {errors}       
            <button className="btn btn-primary">Sign up</button>
        </form>
        
    );
};

