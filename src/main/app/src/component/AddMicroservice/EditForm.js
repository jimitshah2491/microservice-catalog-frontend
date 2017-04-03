import React from 'react';
import { Alert, Button , PageHeader , Jumbotron , FormGroup } from 'react-bootstrap';

import { formFields, fieldHeading } from './AddServiceFields';

let EditForm = (props) => {
  const { onSubmitEdit, submitSucceeded, error, handleSubmit, pristine, reset, submitting }=props.props.props;

  return(
    <div>
      <PageHeader>Edit MicroService</PageHeader>
      { submitSucceeded &&
        <Alert bsStyle="success">
          <strong>Microservice Successfully Edited!</strong>
        </Alert>
      }
      {
        error &&
        <Alert bsStyle="danger">
          <strong>Sorry!</strong> Some error has occurred...
        </Alert>
      }
      <Jumbotron>
          <form onSubmit={handleSubmit(onSubmitEdit)}>
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

EditForm.displayName = 'EditForm';

export default EditForm;
