/* 
(1) Installed React, React-Dom, Next
(2) script for "dev": "next"
(3) Recall index js is at the root or localhost
(4) next maps the filename to the route 
*/

const landingPage = () => {
    return <h1>Landing Page</h1>;
};
export default landingPage;
/*
next js has some issues with file change detection
within a docker container
*/