import React from 'react';
import flv from 'flv.js';
import { connect} from 'react-redux';
import { fetchStream } from '../../actions';
/*Work on backend, when time permist
serious limitation when any user can send any stream
to the end point
*/
class StreamShow extends React.Component {
    
    constructor(props) {
        super(props);

        this.videoRef = React.createRef();
    }
    componentDidMount() {
       //console.log(this.videoRef);
        this.props.fetchStream(this.props.match.params.id);
        this.buildPlayer();
    }
    
    //alway attempt to build the player
    componentDidUpdate() {
        this.buildPlayer();
    }
    //clean up for videoPlayer resource
    componentWillUnmount(){
        console.log('un-mounted');
        this.player.destroy();
    }
    //refactor, for not having access to the stream
    buildPlayer() {
        if (this.player || !this.props.stream) {
            return;
        }
        const { id } = this.props.match.params;
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }
    render() {
        //Video player is null at loading cause the stream
        // is not present
        if(!this.props.stream){
            return <div>Loading</div>;
        }
        //destructured from below
        const {title, description}= this.props.stream;
        
        return (
            <div>
                <video ref={this.videoRef} style={{ width: '100%' }} controls={true}/>
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        ); 
    }
};

const mapStateToProps = (state, ownProps)=>{
    return {stream: state.streams[ownProps.match.params.id]};
};
export default connect(mapStateToProps,{fetchStream})(StreamShow);