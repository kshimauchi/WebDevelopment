import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

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
    // user button when user is logged in
    // we can use the isSignedIn property from
    // Redux store
    renderCreate(){
        if(this.props.isSignedIn){
            //need link here clean this up 
            return(
                <div style={{textAlign : 'right'}}>
                    <Link to="/streams/new" className="ui button primary">
                    Create Stream
                    </Link>
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
                {this.renderCreate()}
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
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};
export default connect(
    mapStateToProps, 
    {fetchStreams})
    (StreamList);