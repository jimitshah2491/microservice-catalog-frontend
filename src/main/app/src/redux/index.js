import {combineReducers} from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import catalog, { CREATE_MICROSERVICE_SUCCESS } from './modules/catalog';

/**
 * A helper function to join multiple reducers into a single reducing funtion that can be passed to store
 */
const appReducer = combineReducers({
  catalog,
  form: reduxFormReducer.plugin({
    addMicroservice: (state, action) => { // <------ 'addMicroservice' is name of form given to reduxForm()
      switch(action.type) {
        case CREATE_MICROSERVICE_SUCCESS:
          return {
            submitSucceeded: true
          };       // <--- blow away form data
        default:
          return state;
      }
    }
  })
})

export default appReducer;
