import React from 'react';
import SearchLogo from '../images/SearchLogo.PNG'
import Typify from '../effects/Typify'

class SearchBar extends React.Component {
    state = { term: ''};
    //Prevents the form from submitting when we type
    //note that when using the event handler you can put the 
    //arrow function to get rid of the this--referencing undefined
    //you can solve by putting arrow function on the onFormSubmit
    //or inside the form itself, since, its easier to see what 
    onFormSubmit = (event) =>{
        event.preventDefault(); 
        //from app since props mouve down from the parent class
        this.props.onSubmit( this.state.term );
    }
    render(){
        return (
        <div className="ui raised very padded text container segment">
            <img src={SearchLogo} alt="keep looking" style={{justifyContent: "center"}}/>
            <div className= "ui-segment" style={{ marginLeft: "15px" }} > 
                <form onSubmit = { this.onFormSubmit } className="ui form"  >
                    <div className="field">
                    <h2 className="ui header"><Typify/></h2>
                    
                    <input 
                        type="text" 
                        value={ this.state.term } 
                        onChange={ e => this.setState( { term: e.target.value } )}
                        style={{width: "370px"}}
                    />
                    </div>
                </form>
            </div>
        </div>
        );
    }
}

export default SearchBar;
/* Note: The onChange() method is a callback and we want to execute this sometime in the future
   This is why we leave out the function
   LEAVE OUT THE () when using a callback inside the eventhandler
naming convention:
on:
Input:
Property: onChange, onClick, onHandle... 

Switched this to a controlled component using state
*/