import { useState } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/use-request';

export default function authSignup() {
    
    const [email, setEmail] = useState('');
    const [password, setPasword] = useState('');
    
    const { doRequest, errors } = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
            email, password
        },
        onSuccess: () => Router.push('/')
    });
    
    const onSubmit = async (event) => {
        event.preventDefault();
  
        await doRequest();
    };
    
    return (
        <form onSubmit={ onSubmit} >
            <h1>Sign In</h1 >
            
            <div className="form-group">
                <label>Email Address</label>    
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Enter email"
            />
                
            </div>
            
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPasword(e.target.value)}
                    className="form-control"
                    placeholder="Enter password"
                />
            </div>
            {errors}       
            
            <button className="btn btn-primary">Sign In</button>
        </form>
    );
};

