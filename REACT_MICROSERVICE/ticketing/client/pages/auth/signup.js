import { useState } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/use-request';

export default function authSignup() {
    
    const [email, setEmail] = useState('');
    const [password, setPasword] = useState('');
    
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email, password
        },
        onSuccess: () => Router.push('/')
    });
    
    const onSubmit = async (event) => {
        event.preventDefault();
        //(1) Option
        // From use-request: we could re-throw the error
        // so we have access here and use the await keyword to stop execution of the 
        // programmatic routing to landing page
        
        //(2) Option,
        // Add variable to the use-request as destructured argument
        // check if that argument is successful 
        // and in the authSignUp function above, proceed with routing 
        // if successful
        await doRequest();
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
                    placeholder="Enter email"
            />
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
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
            
            <button className="btn btn-primary">Sign up</button>
        </form>
    );
};

