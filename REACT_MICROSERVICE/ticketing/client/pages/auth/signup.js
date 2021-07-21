import { useState } from 'react';
export default function authSignup(){
    const [email, setEmail] = useState('');
    const [password, setPasword] = useState('');

    const onSubmit = (event)=> {
        event.preventDefault();
        console.log(email, password);
    }
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