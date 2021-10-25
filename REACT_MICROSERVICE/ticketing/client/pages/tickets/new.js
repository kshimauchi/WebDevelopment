import {useState} from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const NewTicket = ()=>{
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    //the doRequest method has four arguments and we are going to use this function
    //error is empty until a request fails
    const { doRequest, errors } = useRequest({
        //options to customize the request
        url: '/api/tickets',
        method: 'post',
        body: {title,price},
        //programatic redirect
        onSuccess: ()=> Router.push('/')
    });
    //onSubmit helper
    const onSubmit =(event)=> {
        
        event.preventDefault();
        
        doRequest();
    }
    //deselecting price we want to round the price 
    const onBlur = () =>{
        const value = parseFloat(price);
        //string
        if(isNaN(value)){
            return;
        }
        setPrice(value.toFixed(2));
    };


    return (<div>
        <h1>Create a Ticket</h1>
        
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input 
                    value={title} 
                    onChange={(e)=> setTitle(e.target.value)} 
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Price</label>
                <input 
                    value={price}
                    onBlur={onBlur} 
                    onChange={(e)=> setPrice(e.target.value)}
                    className="form-control"
                />
            </div>

            {errors}
            <button className="btn btn-primary">Submit</button>
            
        </form>
    </div>
    );
};
export default NewTicket;