const LandingPage = ({ currentUser }) => {
  return (
    currentUser ? <h1>You are signed in</h1> 
      : <h1>You are not signed in</h1>
  );
};
//build client then make request, buildClient in api, adding client and currentUser without doing
//a follow up with the previous version of this code
LandingPage.getInitialProps = async (context, client, currentUser) => {
  //refactoring due to double fetch on landing page / app
  return {};
};

export default LandingPage;
/* 
const client = buildClient(context);
const { data } = await client.get('/api/users/currentuser');
return data;
*/