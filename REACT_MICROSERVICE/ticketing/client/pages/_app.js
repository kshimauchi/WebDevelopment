import 'bootstrap/dist/css/bootstrap.css';  //not installed yet

import buildClient from '../api/build-client';
import Header  from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser })=> {
  //replaced h1 with header component with prop
  return (
    <div>
      <Header currentUser={currentUser}/>
      <Component {...pageProps} />
    </div>
  );
};
// nextJS will have to be altered here to fetch data to wrap up pages
// but the arguments are different inside a page we use (context) === {req, res}
// In a Page Component, the req, is nested inside ctx
// This context here is different than context,  'AppTree', 'Component', 'router', 'ctx' 
// and we want to pass ctx to the buildClient
AppComponent.getInitialProps = async (appContext) => {
  
  const client = buildClient(appContext.ctx);
  
  const { data } = await client.get('/api/users/currentuser');
  
  //case of fail its assigned as null
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
 
  return {
    pageProps,
    ...data
  } 
};
// want to extract the currentuser here so we will be extracting, the getInitialProps here
// so we can pass the currentuser as a prop to the index, and signin
export default AppComponent;