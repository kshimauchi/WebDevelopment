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

AppComponent.getInitialProps = async (appContext) => {
  
  const client = buildClient(appContext.ctx);
  
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
 
  return {
    pageProps,
    ...data
  } 
};

export default AppComponent;