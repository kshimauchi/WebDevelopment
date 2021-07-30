import { useEffect } from "react";
import Router from 'next/router';

import useRequest from '../../hooks/use-request';
//request to signout must come from inside a component
//not from inside getInitialProps, because that is on the server
//server is not aware of the cookie, therefore its within the component
const SignOut = () => {
    
    const { doRequest } = useRequest({
        
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: () => Router.push('/')
    
    });
    useEffect(() => {
        doRequest();
    }, []);
    
    return (
        <div>
            Signing out in progress...
        </div>
    );
};
export default SignOut;
