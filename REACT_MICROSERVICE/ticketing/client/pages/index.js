import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return (
    currentUser ? <h1>You are signed in, <em>{currentUser.email}</em></h1> 
      : <h1>You are not signed in</h1>
  );
};
//build client then make request, buildClient in api
LandingPage.getInitialProps = async context => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  return data;
};

export default LandingPage;
