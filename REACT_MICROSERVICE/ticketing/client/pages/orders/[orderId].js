import { React, useEffect, useState } from "react";
import StripeCheckout from 'react-stripe-checkout';
import buildPublicKey from '../../api/build-public-key';




const OrderShow = ({order, currentUser})=>{
    const [timeLeft, setTimeLeft] = useState(0);
    //runs once
    useEffect(()=>{
        const findTimeLeft = ()=>{
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft/1000));
        };

        //reference to findTimeLeft
        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);
        
        //when we navigate away from component
        //stop showing component 
        return ()=> {
            clearInterval(timerId);
        };
    },[order]);
    if(timeLeft < 0){
        return <div>Order Expired</div>
    }
   
    return (<div>
        Time left to pay: {timeLeft} seconds
        
        <StripeCheckout 
            token={(token)=> console.log(token)}
            stripeKey={process.env.NEXT_PUBLIC_STRIPE_KEY_PK}
            amount={order.ticket.price*100}
            email={currentUser.email}
        />
       
        </div>
    );
};
OrderShow.getInitialProps = async(context, client) =>{
    const { orderId } = context.query;
    const {data} = await client.get(`/api/orders/${orderId}`);
    return {order: data};
};
export default OrderShow;
/*
(1) added stripe checkout library
(2) Component for Stripe Checkout inside the 

*/