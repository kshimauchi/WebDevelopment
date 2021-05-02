import React from 'react';

class GoogleAuth extends React.Component {
    //we will have to move this state 
    //and remove it to the redux store and
    //pass this back as a prop from
    //mapStateToProps which will spread the app
    //logic,
    state = {isSignedIn: null};  
    
    componentDidMount(){
       
        window.gapi.load(
            
            'client:auth2',
           
            ()=> {
                window.gapi.client.init({
                    clientId: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
                    scope: 'email'
                }).then(()=> {
                    
                    this.auth = window.gapi.auth2.getAuthInstance();
                
                    this.setState({isSignedIn: this.auth.isSignedIn.get()});
                  
                    this.auth.isSignedIn.listen(this.onAuthChange);
                });
            }
        );
    }
    //Helper Functions more for readability
    onAuthChange= ()=>{
        this.setState({isSignedIn : this.auth.isSignedIn.get() });
    };
    onSignInClick= ()=>{
        this.auth.signIn();
    }
    onSignOutClick=()=>{
        this.auth.signOut();
    }

    renderAuthButton(){
        if (this.state.isSignedIn === null) {

            return null;

        }else if(this.state.isSignedIn) {
            return(
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"/>
                     Sign Out from Google
                </button>
            ); 

        }else{
            return(
                <button onClick={this.onSignInClick} className="ui blue button">
                    <i className="google icon" />
                    Sign In with Google
                </button>
            ); 
        }
    }
    render(){
        return(
            <div>{this.renderAuthButton()}</div>  
        );
    }
}
export default GoogleAuth;