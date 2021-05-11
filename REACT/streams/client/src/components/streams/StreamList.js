import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';


//(1) MappedStateToProps on this we are simply using state to map through
//(2) Connected mapStateToProps to react-redux connect function
//(3) Created a RenderListMethod, to run through the list of streams,
//(4) Created the Return with fairly lengthy JSX
class StreamList extends React.Component {
    
    componentDidMount(){
        this.props.fetchStreams();
    }
    renderList(){
        
        return this.props.streams.map( stream=> {
            
            return (
                <div className="item" key={stream.id} >
                    <i className="large middle aligned icon camera"/>
                    {stream.title}
                    <div className="description">{stream.description}</div>
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
const mapStateToProps = (state)=>{
    return {streams: Object.values(state.streams)};
};
export default connect(
    mapStateToProps, 
    {fetchStreams})
    (StreamList);