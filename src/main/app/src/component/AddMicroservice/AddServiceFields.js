import React from 'react';
import { Field } from 'redux-form';
import './AddService.css';

const renderField = ({ input, placeholder, type, meta: { touched, error } }) => {
      return <div className="FieldControl"><input placeholder={placeholder} className="form-control" type={type}/></div>
      //{touched && error && <span>{error}</span>}

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

export let fieldHeading = formFieldsData[0].serviceData.map((data)=>{
  return <div className='FieldHeading'> {data.placeholder} </div>
})



export let formFields = formFieldsData.map((service)=>{
  return  service.serviceData.map((field)=>{
    return <Field name={field.name} type="text" component={renderField} placeholder={field.placeholder} />
  })
})
