import React from 'react';
import {connect} from 'react-redux';
import { reduxForm } from 'redux-form';

import { validate } from './AddServiceFields';
import { initializeEditForm, patchMicroservice, postMicroservice } from '../../redux/modules/catalog';
import AddForm from './AddForm';
import EditForm from './EditForm';

let AddMicroServiceForm = (props) =>{
    const { initialValues, dispatch, location, catalogData }=props
    if(location.query.action === "edit" && initialValues === undefined && catalogData.length>0) {
      // dispatch action to populate form data
      dispatch(initializeEditForm(location.query.id, catalogData));
    }
    return(
      <div>
        {
          location.query.action !== undefined && location.query.action === "edit" &&
          <EditForm props={{props, id:location.query.id}} />
        }
        {
          location.query.action === undefined &&
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
    catalogData: state.catalog.catalogData,
    initialValues: state.catalog.formData,
    onSubmitEdit: state.catalog.formData===undefined?patchMicroservice:patchMicroservice(state.catalog.formData._links.self.href.substring(state.catalog.formData._links.self.href.lastIndexOf("/"), state.catalog.formData._links.self.href.length)),
    onSubmitAdd: postMicroservice('/catalog')
  }
}

AddMicroServiceForm = connect(mapStateToProps)(AddMicroServiceForm);

export default AddMicroServiceForm;
