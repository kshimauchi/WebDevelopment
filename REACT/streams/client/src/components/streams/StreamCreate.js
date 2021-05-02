import React from 'react';
import { Field, reduxForm} from 'redux-form';

//(1) converting to class component
//(2) Field, reduxForm
/*
Field, suppose to be react component
reduxForm, is a function similar to the connect function
*/
//(3) wiring 
class StreamCreate extends React.Component{
    renderInput({input}){

        //console.log(formProps);
        return(
          
            <input {...input} />
        );
    }
    render() {
        console.log(this.props);
        return(
            <form>
                <Field name="title" component={this.renderInput} />
                <Field name="description" component={this.renderInput} />

            </form>
        ); 
    }
}
//receives a single object
export default reduxForm({
    form: 'streamCreate'
})(StreamCreate);