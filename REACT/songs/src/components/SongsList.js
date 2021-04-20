import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectSong } from '../actions';

class SongList extends React.Component {
    // this.props === {songs: state.songs}
    renderList(){
        return this.props.songs.map((song)=>{
            return(
                <div className="item" key={song.title}>
                    <div className="right floated content">
                    <button 
                        className="ui button primary"
                        onClick={()=>this.props.selectSong(song)}
                        >
                        Select
                    </button>
                    </div>
                    <div className="content">{song.title}</div>
                </div>
            );
        });
    } 
    render() {
            
        return <div className="ui divided list">{this.renderList()}</div>;
    }
}

const mapStateToProps = (state) =>{
    // this is the entire state
    return {
        
        songs: state.songs
    };
}
export default connect(mapStateToProps,
    {selectSong})(SongList);
/*
Example  :  high order function
function connect(){
    return function(){
        return 'Hi There!';
    }
}
returns (function)(invokes the returned function)
connect()() 
*/