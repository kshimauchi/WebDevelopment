import { useState } from 'react';
import axios from 'axios';

export default function authSignup(){
    const [email, setEmail] = useState('');
    const [password, setPasword] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        
        const response = await axios.post('/api/users/signup', {
            email, password
        });
        console.log(response.data);
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
                <input type="password"
                    value={password}
                    onChange={e=> setPasword(e.target.value)}
                    className="form-control"
                />
            </div>
            <button className="btn btn-primary">Sign up</button>
        </form>
        
    );
};

//auth/signup