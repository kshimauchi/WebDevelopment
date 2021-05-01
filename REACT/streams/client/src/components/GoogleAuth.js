import React from 'react';

class GoogleAuth extends React.Component {

    state = {isSignedIn: null};  //need to know if the user is signed in
    
    componentDidMount(){
        // load client library, and we need the callback to initialize 
        // the client library after communication from google servers
        window.gapi.load(
            
            'client:auth2',
            //call back for initialization
            //returns a promise
            ()=> {
                window.gapi.client.init({
                    clientId: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
                    scope: 'email'
                }).then(()=> {
                    
                    this.auth = window.gapi.auth2.getAuthInstance();
                
                    this.setState({isSignedIn: this.auth.isSignedIn.get()});
                });
            }
        );
    }
    renderAuthButton(){
        if (this.state.isSignedIn === null){

            return <div>I don't know if we are signed in</div>;

        }else if(this.state.isSignedIn){

            return <div>I am signed in!</div>;

        }else{
            return <div>I am not signed in!</div>;
        }
    }
    render(){
        return(
            <div>{this.renderAuthButton()}</div>  
        );
    }
}
export default GoogleAuth;