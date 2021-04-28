import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

//The problem with this, is its making to many request calls
//for each individual user so can be seen in network xhr
// (1) lodash js, can help memoize (fast), we can have the same behavior but have it memoized returns whatever it was previously
//  memoized function will run a single time, unique arugments
class UserHeader extends React.Component {
    
    componentDidMount(){
        this.props.fetchUser(this.props.userId);
    }
    render(){
        const { user } = this.props;

        if(!user){
            return null;
        }
        return (
            <div className="header">{user.name}</div>
        );
    };
}
const mapStateToProps= (state, ownProps )=>{
    return { user : state.users.find(user => user.id === ownProps.userId) };
};

export default connect(mapStateToProps,{fetchUser})(UserHeader);
