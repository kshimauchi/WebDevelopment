import 'bootstrap/dist/css/bootstrap.css';  //not installed yet

import buildClient from '../api/build-client';
import Header  from '../components/header';
//currentUser needs to be passed down as a prop
const AppComponent = ({ Component, pageProps, currentUser })=> {
  //replaced h1 with header component with prop
  return (
    <div>
      <Header currentUser={currentUser}/>
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');
  //child components initial props function
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
  }
 
  return {
    pageProps,
    ...data
  } 
};

export default AppComponent;