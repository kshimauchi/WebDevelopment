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
Before

export default () => <div />;

After

const Named = () => <div />;

export default Named;

This is a linter warning as of React v17 letting us know that it might be wise to use named exports instead.

You can suppress the warning by refactoring from this:

export default () => {
  return <h1>Landing Page</h1>;
};
to this:

const Landing = () => {
  return <h1>Landing Page</h1>;
};
 
export default Landing;
The warning will come up a few more times in this project (and throughout the course) when creating components and can be handled similarly.
*/