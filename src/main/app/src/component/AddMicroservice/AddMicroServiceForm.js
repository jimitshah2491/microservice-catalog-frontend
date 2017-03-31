import React from 'react';
import {connect} from 'react-redux';
import { reduxForm } from 'redux-form';

import { validate } from './AddServiceFields';
import { initializeEditForm, patchMicroservice, postMicroservice } from '../../redux/modules/catalog';
import AddForm from './AddForm';
import EditForm from './EditForm';

let AddMicroServiceForm = (props) =>{
    const { initialValues, dispatch, location }=props
    if(location.query.id !== undefined && initialValues === undefined) {
      // dispatch action to populate form data
      dispatch(initializeEditForm(location.query.id));
    }
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
