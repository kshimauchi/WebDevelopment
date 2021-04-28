import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

// We should use less on this we want to show one user
// (1) we could use renderList or
// (2) move the find, to the mapStateToProps method
//  removed the findById inside the render method and extracted it to 
//  mapStateToProps, refactored the render method, for a single user
//  on the props, 
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
// we are going to alter this to make it reusable,
// sometimes mapStateToProps and connect are seperate files
// extracting the computation off the state
// added ownProps argument, which has a reference to props,
// redux state still on the first argument

const mapStateToProps= (state, ownProps )=>{
    return { user : state.users.find(user => user.id === ownProps.userId) };
};

export default connect(mapStateToProps,{fetchUser})(UserHeader);
