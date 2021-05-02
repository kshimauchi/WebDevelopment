import React from 'react';
import { Field, reduxForm } from 'redux-form';
import '../../css/streams/streamStyles.css';

class StreamCreate extends React.Component{
   
    renderInput({input,label, meta}){
        //console.log(meta);
        return(     
            <div className="field">
                <label>{label}</label>
                <input {...input} />
                <div className="error">{meta.error}</div>
            </div>
        );
    }
    onSubmit (formValues){
        //console.log(formValues);
    }
    render() {
        //console.log(this.props);
        return(
            <form 
                onSubmit={this.props.handleSubmit(this.onSubmit)} 
                className="ui form">

                <Field 
                    name="title" 
                    component={this.renderInput} 
                    label="Enter Title" 
                    />
                <Field 
                    name="description" 
                    component={this.renderInput} 
                    label="Enter Description" 
                     />
                <button className="ui button primary">Submit</button>
            </form>
        ); 
    }
}
//formsValues has all the values inside
const validate = (formValues) =>{
    //Map errors
    const errors = { };
    
    if(!formValues.title) {
        errors.title = 'You must enter a title';    
    }
    if(!formValues.description) {
        errors.description = 'you must enter a description';
    }
    return errors;
};

export default reduxForm({
    form: 'streamCreate',
    validate: validate
})(StreamCreate);