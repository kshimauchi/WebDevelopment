import React from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions';

class PostList extends React.Component {
   
    componentDidMount(){
        this.props.fetchPosts();
    }
    render() {
        console.log(this.props.posts);
        return <div>PostList</div>;
    }
}
// (1) created mapstate to props
    const mapStateToProps = (state)=>{
        return { posts: state.posts };
    };
// (2) added mapstatetoprops, to the export
export default connect(mapStateToProps,{fetchPosts})(PostList);
