import {useEffect, useState} from 'react';

const Route = ({path, children}) => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    //We want to re-render 
    useEffect(()=>{
        //route update
        const onLocationChange = ()=>{
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener('popstate',onLocationChange);
        
        //clean up helper to remove the listener
        return () => {
            window.removeEventListener('popstate', onLocationChange);
        }
    
    },[]);
    // This reflects, the current path name
    return currentPath === path ? children: null;
    // refactored it's the same window.location.pathname
};
export default Route;
/* we do not want to refresh all the index.js file when navigating
   We do not want to fully reload all the pages,
   We will design a link component, a link normal anchor element
   will have an onclick element on the anchor element
   this have a navigation object, event--> sent to the routes
   look at updated, url and decide whether to update the child 


*/