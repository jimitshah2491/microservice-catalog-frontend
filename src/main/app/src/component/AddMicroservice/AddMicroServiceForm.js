import React from 'react';
import { reduxForm } from 'redux-form';
import { Alert, Button , PageHeader , Jumbotron , FormGroup } from 'react-bootstrap';

import { formFields, fieldHeading, validate } from './AddServiceFields'
import { postMicroservice } from '../../redux/modules/catalog'


let AddMicroServiceForm = (props) =>{
    const { submitSucceeded, error, handleSubmit, pristine, reset, submitting }=props
    debugger;
    return(
      <div>
        <PageHeader>Add a New MicroService</PageHeader>
        { submitSucceeded &&
          <Alert bsStyle="success">
            <strong>Successfully Submitted!</strong>
          </Alert>
        }
        {
          error &&
          <Alert bsStyle="danger">
            <strong>Sorry!</strong> Some error has occurred...
          </Alert>
        }
        <Jumbotron>
          <form onSubmit={handleSubmit(postMicroservice)}>
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
