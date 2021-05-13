import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
    
    componentDidMount(){
        this.props.fetchStreams();
    }
    renderAdmin(stream) {
        if(stream.userId === this.props.currentUserId){
            return (
                <div className="right floated content">
                    <button className="ui button primary">Edit</button>
                    <button className="ui button negative">DELETE</button>
                </div>
            ); 
        }
    }
    renderList(){
        return this.props.streams.map( stream=> {
             return (
                <div className="item" key={stream.id} >
                    <i className="large middle aligned icon camera"/>
                    {stream.title}
                    <div className="description">{stream.description}</div>
                
                {this.renderAdmin(stream)}
                </div>
            );
        });
    }
    render() {
        return(
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
            </div>
        ); 
    }
}
//We turn the object to array to make it more mappable,
//We do not need to keep using lodash
//Object.values just takes an object and turns into array
const mapStateToProps = (state)=>{
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId
    };
};
export default connect(
    mapStateToProps, 
    {fetchStreams})
    (StreamList);