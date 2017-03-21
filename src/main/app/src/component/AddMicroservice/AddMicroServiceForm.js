import React from 'react';
import { reduxForm } from 'redux-form';
import {Button , PageHeader , Jumbotron , FormGroup} from 'react-bootstrap';
import {formFields, fieldHeading} from './AddServiceFields.js'

let handleAddService = () =>{
  fetch('/api/catalog', {
        method: 'POST',
        data: {
          description:"test",
          title:'test',
          url:'test'
        }
      })
      .then(function(response) {
      }).then(function(body){
        console.log(body);
      });
  }


let AddMicroServiceForm = (props) =>{
  const { pristine, reset, submitting } = props
  return(
    <div>
      <PageHeader>Add a New MicroService</PageHeader>
      <Jumbotron>
        <form>
            <FormGroup  bsSize="large">
              {fieldHeading}
              <div className="FieldContainer">
                {formFields}
              </div>
              <div className="buttonContainer">
                <Button onClick={handleAddService} className="col-md-1 text-center" type="button" bsStyle="primary" disabled={submitting}>Submit</Button>
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
  form:'addMicroservice'
})(AddMicroServiceForm)
