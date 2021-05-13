import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {createStream} from '../../actions';


//import '../../css/streams/streamStyles.css';

class StreamCreate extends React.Component{
   
    // <div className="error">{meta.error}</div>
    // semantic ui disables errors by default, which we can add error on the className for the
    // form to enable
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
   renderInput = ( {input, label, meta })=> {
        //console.log(meta);
        //context issue using this, undefined have to change to ()=>
        const className = `field ${meta.error && meta.touched ? 'error': ''}`;

        return(     
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    }
    onSubmit = (formValues)=>{
        this.props.createStream(formValues);
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

    const errors = { };
    
    if(!formValues.title) {
        errors.title = 'You must enter a title';    
    }
    if(!formValues.description) {
        errors.description = 'you must enter a description';
    }
    return errors;
};
//how can we combine reduxForm and reduxConnect
const formWrapped = reduxForm({
    form: 'streamCreate',
    validate

})(StreamCreate);
export default connect(null, {createStream})(formWrapped);