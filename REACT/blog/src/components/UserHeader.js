import React from 'react';
import {connect, connnect} from 'react-redux';
import {fetchUser} from '../actions';

class UserHeader extends React.Component {

    componentDidMount(){
        this.props.fetchUser(this.props.userId);
    }
    render(){
        return (
            <div>User Header</div>
        );
    };
}
//added connect
export default connect(null,{fetchUser})(UserHeader);
