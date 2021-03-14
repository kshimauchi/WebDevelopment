import React from 'react';

class SearchBar extends React.Component {
    //store in term not in dom, need to wire in a event handler
    state = { term: ''}
    //this.state without 'term' is an object
    onInputChange = event => {
        this.setState({term: event.target.value})
       
    };
    onFormSubmit = event =>{
        event.preventDefault();
        this.props.onFormSubmit(this.state.term);
    };
    //child needs to call the parent using a callback func() as we know props works
    //by only passing from parent -> sibling
    render() {
        return (
            <div className="search-bar ui segment">
                <form onSubmit={this.onFormSubmit} className="ui form">
                    <div className="field">
                        <label>Video Search</label>
                        <input 
                        type="text" 
                        value={this.state.term}
                        onChange= {e => this.setState({term: e.target.value}) }
                        
                        />
                    </div>
                </form>
            </div>
        );
    }
}
export default SearchBar;