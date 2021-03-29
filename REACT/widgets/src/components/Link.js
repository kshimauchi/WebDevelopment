import React from 'react';

const Link = ({className,href, children}) => {
    const onClick =(event)=>{
        //step 1 no full page reload
        event.preventDefault();
        //step 2 only update the route on link update
        window.history.pushState({},'', href);
        //step 3 communicate with routes component that the url has changed
        const navigationEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navigationEvent);
    };
    return <a onClick={onClick} className={className} href={href}>
        {children}
    </a>;
};
export default Link;

