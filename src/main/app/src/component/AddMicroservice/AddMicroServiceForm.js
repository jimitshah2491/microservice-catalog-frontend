import React from 'react';
import { reduxForm } from 'redux-form';
import { Button , PageHeader , Jumbotron , FormGroup } from 'react-bootstrap';
// import {connect} from 'react-redux';
import { formFields, fieldHeading, validate } from './AddServiceFields'
import { postMicroservice } from '../../redux/modules/catalog'


let AddMicroServiceForm = (props) =>{
    const { error, handleSubmit, pristine, reset, submitting }=props
    return(
      <div>
        <PageHeader>Add a New MicroService</PageHeader>
        <Jumbotron>
          <form onSubmit={handleSubmit(postMicroservice)}>
              {
                error && <span className="Error">{error}</span>
              }
              <FormGroup  bsSize="large">
                {fieldHeading}
                <div className="FieldContainer">
                  {formFields}
                </div>
                <div className="buttonContainer">
                  <Button className="col-md-1 text-center" type="submit" bsStyle="primary" disabled={submitting}>Submit</Button>
                  <Button className="col-md-1 text-center" type="button" bsStyle="danger">Cancel</Button>
                  <Button className="col-md-1 text-center" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
                </div>
              </FormGroup>
            </form>
        </Jumbotron>
      </div>
    );
}

export default reduxForm({
  form:'addMicroservice',
  validate
})(AddMicroServiceForm)
