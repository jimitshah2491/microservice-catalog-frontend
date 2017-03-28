import React from 'react';
import {connect} from 'react-redux';
import { reduxForm } from 'redux-form';

import { validate } from './AddServiceFields';
import { initializeEditForm } from '../../redux/modules/catalog';
import AddForm from './AddForm';
import EditForm from './EditForm';

let AddMicroServiceForm = (props) =>{
    const { initialValues, dispatch, location, catalogData }=props
    debugger;
    if(location.query.action === "edit" && initialValues === undefined && catalogData.length>0) {
      // dispatch action to populate form data
      dispatch(initializeEditForm(location.query.id, catalogData));
    }
    return(
      <div>
        {
          location.query.action !== undefined && location.query.action === "edit" &&
          <EditForm props={props} />
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
  debugger;
  return{
    catalogData: state.catalog.catalogData,
    initialValues: state.catalog.formData
  }
}

AddMicroServiceForm = connect(mapStateToProps)(AddMicroServiceForm);

export default AddMicroServiceForm;
