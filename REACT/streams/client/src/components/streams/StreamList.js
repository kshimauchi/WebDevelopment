import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

//(1) imported connect from 'react-redux
//(2) imported the fetchStreams from action
//(3) changed StreamList react creator
//(4) We are mounting all the streams in the componentDidMount Method
//
class StreamList extends React.Component {
    
    componentDidMount(){
        this.props.fetchStreams();
    }
    render(){
        return <div>StreamList</div>;
    }
};
export default connect(null, 
    {fetchStreams})
    (StreamList);