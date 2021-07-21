import 'bootstrap/dist/css/bootstrap.css';  //not installed yet

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
};



// export default ({ Component, pageProps }) => {
//     //next will import this app Component prop, index and 
//     //pageProps will pass pageProps
//     //if we want to import bootstrap, css here
//     //otherwise this will not be installed
//     return <Component {...pageProps} />
// };
