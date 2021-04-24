import React from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions';

class PostList extends React.Component {
   
    componentDidMount(){
        this.props.fetchPosts();
    }
// (3) creating a list for maping the response.data,
// which is currently be console logged before
    renderList(){
        return this.props.posts.map(post =>{
            return(
                <div className="item" key={post.id}>
                <i className="large middle align icon user"/>
                <div className="description"></div>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                </div>
            );
        });
    }
    render() {
        
        return <div className="ui relaxed divided list">{this.renderList()}</div>;
    }
}
// (1) created mapstate to props
    const mapStateToProps = (state)=>{
        return { posts: state.posts };
    };
// (2) added mapstatetoprops, to the export
export default connect(mapStateToProps,{fetchPosts})(PostList);
