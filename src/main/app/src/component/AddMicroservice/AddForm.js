import React from 'react';
import { Alert, Button , PageHeader , Jumbotron , FormGroup } from 'react-bootstrap';

import { formFields } from './AddServiceFields';

/**
 * [AddForm description]
 * @param {[type]} props [description]
 */
const AddForm = (props) => {
  const { onSubmitAdd, submitSucceeded, error, handleSubmit, pristine, reset, submitting }=props;
  return(
    <div>
      <PageHeader>Add a New MicroService</PageHeader>
      { submitSucceeded &&
        <Alert bsStyle="success">
          <strong>Microservice Successfully Added!</strong>
        </Alert>
      }
      {
        error &&
        <Alert bsStyle="danger">
          <strong>Sorry! Some error has occurred...</strong>
        </Alert>
      }
      <Jumbotron>
          <form onSubmit={handleSubmit(onSubmitAdd)}>
            <FormGroup  bsSize="large">

              <div className="FieldContainer">
                {formFields}
              </div>
              <div className="buttonContainer">
                <Button className="col-md-1 text-center" type="submit" bsStyle="primary" disabled={submitting}>Submit</Button>
                <Button className="col-md-1 text-center" type="button" bsStyle="danger">Cancel</Button>
                <Button className="col-md-1 text-center" type="reset" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
              </div>
            </FormGroup>
          </form>
     </Jumbotron>
    </div>
  );
}

AddForm.displayName = 'AddForm';

export default AddForm;
