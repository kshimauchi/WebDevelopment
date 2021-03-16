import React from 'react';
import ReactDom from 'react-dom';
import SeasonDisplay from "./components/SeasonDisplay"
import Spinner from "./components/Spinner"

class App extends React.Component {
 
    state = { lat: null, errorMessage: '' };
    
    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
        
            position => {
                this.setState({ lat: position.coords.latitude });
            },  
            err =>{
                this.setState({ errorMessage: err.message });
            }            
        );
    }
    //render gets called before this method
    componentDidUpdate(){
        console.log('My component was just updated- it rerendered!');
    }
    // Helper method
    renderContent(){
        //Results: will clean up in a bit
        if(this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>;
        }
        if(!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat={this.state.lat}/>
        }
        return <Spinner message= "Please accept location request"/>;

    }
    // case we want to wrap something in a common element
    render(){
        return (
        <div className="border red">{this.renderContent()}</div>
        );    
    };
}
ReactDom.render(<App/>,document.querySelector('#root'));
// Has two render twice: null, then after the state change