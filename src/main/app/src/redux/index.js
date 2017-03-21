import {combineReducers} from 'redux';
import catalog, { CREATE_MICROSERVICE_SUCCESS } from './modules/catalog'
import { reducer as reduxFormReducer } from 'redux-form'

const appReducer = combineReducers({
  catalog,
  form: reduxFormReducer.plugin({
    addMicroservice: (state, action) => { // <------ 'addMicroservice' is name of form given to reduxForm()
      debugger;
      switch(action.type) {
        case CREATE_MICROSERVICE_SUCCESS:
          return undefined;       // <--- blow away form data
        default:
          return state;
      }
    }
  })
})

export default appReducer;
