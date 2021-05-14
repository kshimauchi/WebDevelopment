import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

class StreamList extends React.Component {
    
    componentDidMount(){
        this.props.fetchStreams();
    }
    //updating button to a Link,
    renderAdmin(stream) {
        if(stream.userId === this.props.currentUserId){
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                   
                    <button className="ui button negative">DELETE</button>
                </div>
            ); 
        }
    }
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