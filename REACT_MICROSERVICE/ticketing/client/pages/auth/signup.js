import { useState } from 'react';
import axios from 'axios';

export default function authSignup(){
    const [email, setEmail] = useState('');
    const [password, setPasword] = useState('');
    const [errors, setErrors] = useState([]);
    
    
    const onSubmit = async (event) => {
        event.preventDefault();
        
    try {
        const response = await axios.post('/api/users/signup', {
                email, password
            });
            console.log(response.data);
    } catch (err) {
        //doh 
            setErrors(err.response.data.errors);
    }
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
           
            {errors.length > 0 &&
                (<div className="alert alert-danger">
                <h4>...An Error is in Progress!</h4>
                <ul className="my-0">
                    {errors.map(err =>
                        <li key={err.message}>
                            {err.message}
                        </li>)}
                </ul>
            </div>
           )}
            <button className="btn btn-primary">Sign up</button>
        </form>
        
    );
};
// TODO: need logic to show or not show the alert
// TODO: Extract the Errors logic for usability
//auth/signup