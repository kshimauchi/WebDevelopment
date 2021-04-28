import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
/*This is actually holding alot of data entire array of user
but we are only rendering 10 at a time, think pagination
*/
class UserHeader extends React.Component {
//(4) create a didMount to fetch users with the same name
// as we are using in the PostLists    
    componentDidMount(){
        this.props.fetchUser(this.props.userId);
    }
//(5) then we are going to search for a particular user
// to map the blog post to a user as an author per say    
    render(){
        //searching for a user on the state/props find the exact user
        const user = this.props.users.find((user)=>user.id === this.props.userId);
        //if there is no user for the blog we ignore it
        if(!user){
            return null;
        }

        return (
            <div className="header">{user.name}</div>
        );
    };
}
//(2)Map the state to the props so we can pass it around
const mapStateToProps= (state)=>{
    return {users:state.users};
};
//(3)add the map to state to the connect first arguments
export default connect(mapStateToProps,{fetchUser})(UserHeader);
