import React from 'react';
import { Field } from 'redux-form';

import './AddService.css';

/**
 * Function to validate form fields
 * @param  {[type]} values [description]
 * @return {[type]}        [description]
 */
export const validate = values => {
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
  } else if (values.description !== undefined && values.description.length > 50) {
    errors.description = 'Must be 50 characters or less'
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
      return <div className="FieldControl">
              <input {...props.input} placeholder={props.placeholder} type={props.type} />
              {props.meta.touched && props.meta.error && <span className="Error">*{props.meta.error}</span>}
             </div>
}


export let formFieldsData = [
    {
      serviceData:[
      {
        name:'title',
        placeholder: 'Title'
      },
      {
        name:'url',
        placeholder: 'URL'
      },
      {
        name:'email',
        placeholder: 'Email'
      },
      {
        name:'description',
        placeholder: 'Description'
      }
    ]},
  ]

export let fieldHeading = formFieldsData[0].serviceData.map((data, i)=>{
  return <div key={i} className='FieldHeading'> {data.placeholder} </div>
})



export let formFields = formFieldsData.map((service)=>{
  return  service.serviceData.map((field)=>{
    return <Field name={field.name} type="text" component={renderField} placeholder={field.placeholder} />
  })
})
