import React from 'react';
import { Field, reduxForm } from 'redux-form';
//import '../../css/streams/streamStyles.css';

class StreamCreate extends React.Component{
   
    // <div className="error">{meta.error}</div>
    // semantic ui disables errors by default, which we can add error on the className for the
    // form
    renderError ({error, touched}){
       if(touched && error){
        return(
            <div className="ui error message">
                <div className="header">
                    {error}
                </div>
            </div>
        );
       }
   }
    renderInput = ( {input,label, meta })=> {
        //console.log(meta);
        //context issue using this, undefined have to change to ()=>
        return(     
            <div className="field">
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
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
                className="ui form error">

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