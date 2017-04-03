import React from 'react';
import {connect} from 'react-redux';
import { reduxForm } from 'redux-form';
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
        {
          location.query.id !== undefined &&
          <EditForm props={{props, id:location.query.id}} />
        }
        {
          location.query.id === undefined &&
          <AddForm props={props} />
        }
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

AddMicroServiceForm = reduxForm({
  form:'addMicroservice',
  enableReinitialize : true,
  validate
})(AddMicroServiceForm)

const mapStateToProps = (state) => {
  return{
    initialValues: state.catalog.formData,
    onSubmitEdit: state.catalog.formData===undefined?patchMicroservice:patchMicroservice(state.catalog.formData._links.self.href.substring(state.catalog.formData._links.self.href.lastIndexOf("/"), state.catalog.formData._links.self.href.length)),
    onSubmitAdd: postMicroservice('/catalog')
  }
}

AddMicroServiceForm = connect(mapStateToProps)(AddMicroServiceForm);

export default AddMicroServiceForm;
