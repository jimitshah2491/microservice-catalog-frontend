import React from 'react';
import { Field } from 'redux-form';
import FontAwesome from "react-fontawesome";

import './AddService.css';

/**
 * A helper function to validate the various form fields
 * @param  {Object} values - A object that comprises of the values of the details entered in the add new Microservice form.
 * @return {Object} - A Object that specifies all the different errors that are discovered while performing validations.
 */
export const validate = values=>{
  const errors = {}
  if (!values.title) {
    errors.title = 'Required'
  } else if (values.title !== undefined && values.title.length > 50) {
    errors.title = 'Enter 50 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.description) {
    errors.description = 'Required'
  } else if (values.description !== undefined && values.description.length > 250) {
    errors.description = 'Must be 250 characters or less'
  }
  if (!values.url) {
    errors.url = 'Required'
  }
  return errors
}

/**
 * React component for rendering Field
 * @param  {[type]} props [description]
 * @return {[type]}       [description]
 */
const renderField = (props) => {
    let control = <input {...props.input} className="fieldText" placeholder={props.placeholder} type={props.type} />;
      let type=props.input.name.toUpperCase();
      if(type === "URL" || type === "DESCRIPTION")
      {
        control = <textarea {...props.input} className="fieldText" placeholder={props.placeholder} type={props.type} ></textarea>;
      }
      return <div className="FieldControl"> {control}{props.meta.touched && props.meta.error && <span className="Error">*{props.meta.error}</span>}</div>;
}

/**
 * A array that comprises of all the different fields of a Microservice that can be added while creating a new Microservice
 * @type {Array}
 */
export let formFieldsData = [
    {
      serviceData:[
      {
        name:'title',
        placeholder: 'Title',
        tooltip: 'Enter 1-50 characters'
      },
      {
        name:'url',
        placeholder: 'URL',
        tooltip: 'Comma separated URL(s)'
      },
      {
        name:'email',
        placeholder: 'Email',
        tooltip: 'Valid Email Address'
      },
      {
        name:'description',
        placeholder: 'Description',
        tooltip: 'Enter 1-250 characters'
      }
    ]}
  ]

export let fieldHeading = formFieldsData[0].serviceData.map((data, i)=>{
  return <div key={i} className='FieldHeading'> {data.placeholder} </div>
})

export let formFields = formFieldsData.map((service,i)=>{
  return  service.serviceData.map((field)=>{
    return <div className="fieldContainer"><div key={i} className='FieldHeading'> {field.placeholder} <sup> <FontAwesome title={field.tooltip} name="question" /> </sup> </div>
    <Field name={field.name} type="text" component={renderField} placeholder={field.placeholder} /></div>
  })
})
