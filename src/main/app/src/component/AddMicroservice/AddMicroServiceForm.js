import React from 'react';
import { reduxForm } from 'redux-form';
import { Alert, Button , PageHeader , Jumbotron , FormGroup } from 'react-bootstrap';

import { formFields, fieldHeading, validate } from './AddServiceFields';
import { postMicroservice } from '../../redux/modules/catalog';

/**
 * This function uses a redux-form to allow users to add new MicroService
 * @param {[type]} submitSucceeded
 * @param {[type]} error
 * @param {[type]} handleSubmit
 * @param {[type]} pristine
 * @param {[type]} reset
 * @param {[type]} submitting
 */
const AddMicroServiceForm = (submitSucceeded, error, handleSubmit, pristine, reset, submitting) =>{
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

AddMicroServiceForm.displayName = 'AddMicroServiceForm';

// AddMicroServiceForm.propTypes = {
//   submitSucceeded: React.PropTypes.object.isRequired,
//   error: React.PropTypes.string,
//   handleSubmit: React.PropTypes.string,
//   pristine: React.PropTypes.string,
//   reset: React.PropTypes.bool,
//   submitting: React.PropTypes.string
// };

export default reduxForm({
  form:'addMicroservice',
  validate
})(AddMicroServiceForm)
