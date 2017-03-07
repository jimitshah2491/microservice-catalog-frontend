import React from 'react';
import { reduxForm, Field } from 'redux-form';
import './AddMicroServiceForm.css';


let AddMicroServiceForm = () =>
<div>
  <h3>Add a New MicroService</h3>
  <form>
    <div>
      <div className="labels">
        <label>Title</label>
      </div>
      <div>
        <Field name="title" component="input" />
      </div>
      <div className="labels">
        <label>Description</label>
      </div>
      <div>
        <Field name="description" component="input" />
      </div>
      <div className="labels">
        <label>Url</label>
      </div>
      <div>
        <Field name="url" component="input" />
      </div>

      <div className="labels">
        <label>Email</label>
      </div>
      <div>
        <Field name="email" component="input" />
      </div>
      <button type="button" className="btn btn-outline-primary">Submit</button>
      <button type="button" className="btn btn-outline-danger">Cancel</button>
    </div>
  </form>
</div>

AddMicroServiceForm = reduxForm({
  form:'testForm'
})(AddMicroServiceForm)
export default AddMicroServiceForm
