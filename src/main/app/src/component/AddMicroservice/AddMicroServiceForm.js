import React from 'react';
import {connect} from 'react-redux';
import { reduxForm } from 'redux-form';
import { Alert, Button , PageHeader , Jumbotron , FormGroup } from 'react-bootstrap';

import { formFields, fieldHeading, validate } from './AddServiceFields'
import { postMicroservice } from '../../redux/modules/catalog'


let AddMicroServiceForm = (props) =>{
    const { location, catalogData, submitSucceeded, error, handleSubmit, pristine, reset, submitting }=props
    debugger;
    console.log(catalogData);
    if(location.query.action === "edit") {
      console.log("Edit action called");
      // dispatch action to populate form data
    }
    return(
      <div>
        {
          location.query.action !== undefined && location.query.action === "edit" &&
          <PageHeader>Edit MicroService</PageHeader>
        }
        {
          location.query.action === undefined &&
          <PageHeader>Add a New MicroService</PageHeader>
        }
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

AddMicroServiceForm = reduxForm({
  form:'addMicroservice',
  validate
})(AddMicroServiceForm)

const mapStateToProps = (state) => {
  debugger;
  return{
    catalogData: state.catalog.catalogData
  }
}

AddMicroServiceForm = connect(mapStateToProps)(AddMicroServiceForm);

export default AddMicroServiceForm;
