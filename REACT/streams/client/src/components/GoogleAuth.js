import React from 'react';
import  { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
   
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
                    //This is called anytime status changes,
                    this.auth.isSignedIn.listen(this.onAuthChange);
                });
            }
        );
    }
    //Helper Functions more for readability
    //
    onAuthChange= (isSignedIn)=> {
        //this.setState({isSignedIn : this.auth.isSignedIn.get() });
        if(isSignedIn) {
            this.props.signIn();
        }else{
            this.props.signOut();
        }
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
export default connect(null, {signIn, signOut}) (GoogleAuth);