import React from 'react';
import { reduxForm, Field } from 'redux-form';
import {Button , Label, PageHeader , Jumbotron , FormGroup} from 'react-bootstrap';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <Label bsStyle="default">{label}</Label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const doSubmit = values => fetch('api/addCatalog');

let AddMicroServiceForm = (props) =>{
  const { error, handleSubmit, pristine, reset, submitting } = props
  return(
    <div>
      <PageHeader>Add a New MicroService</PageHeader>
      <Jumbotron>
        <form onSubmit={handleSubmit(doSubmit)}>
            <FormGroup  bsSize="large">
              <Field name="title" type="text" component={renderField} label="Title"/>
                  {error && <strong>{error}</strong>}
              <Field name="description" type="text" component={renderField} label="Description"/>
                  {error && <strong>{error}</strong>}
              <Field name="url" type="text" component={renderField} label="URL"/>
                  {error && <strong>{error}</strong>}
              <Field name="email" type="Email" component={renderField} label="Email"/>
                  {error && <strong>{error}</strong>}
                <br/>
              <div>
                <Button type="button" bsStyle ="primary" disabled={submitting}>Submit</Button>
                <Button type="button" bsStyle ="danger">Cancel</Button>
                <Button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
              </div>
            </FormGroup>
          </form>
      </Jumbotron>
    </div>
  );
}


export default reduxForm({
  form:'addMicroservice'
})(AddMicroServiceForm)
