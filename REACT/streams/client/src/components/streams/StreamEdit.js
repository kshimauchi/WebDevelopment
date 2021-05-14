import React from 'react';
import {connect} from 'react-redux';
import {fetchStream} from '../../actions';

class StreamEdit extends React.Component{
    //Same properties, but we have redux state 
    //console.log(props)::: history, location and match
    //match is the params of the name we gave it in routing
    //we care about that the streams object: redux/state store
    //using props id we can find the one we want,
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

    render(){
        if(!this.props.stream){
            return <div>Loading...</div>
        }
        return <div>{this.props.stream.title}</div>;
    };
};
//Map state to props is now inter connected
const mapStateToProps = (state,ownProps)=> {
    console.log(ownProps);
    return {stream : state.streams[ownProps.match.params.id]};
};
export default connect(mapStateToProps, {fetchStream } )(StreamEdit);