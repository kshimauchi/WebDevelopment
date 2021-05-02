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
    renderInput(formProps){
        //needs to be a controlled element
        /*
                onChange={formProps.input.onChange}
                value={formProps.input.value}
        */
        //console.log(formProps);
        return(
            //adds them to input element as props using jsx
            <input {...formProps.input} />
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