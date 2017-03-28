import { createAction, handleActions } from 'redux-actions';
import { LoadingStates } from '../../utils/common';
import { SubmissionError } from 'redux-form';
import _ from 'lodash';

// region Action constants
const REQUEST = 'microservice-catalog/microservices/REQUEST';
const RECEIVE = 'microservice-catalog/microservices/RECEIVE';
const INITIALIZE_EDIT_FORM = 'microservice-catalog/microservices/INITIALIZE_EDIT_FORM';
export const CREATE_MICROSERVICE_SUCCESS = '@@redux-form/SET_SUBMIT_SUCCEEDED';
// end region

// region Action creators
export const request = createAction(REQUEST);
/**
 * Callback to receive the results of a REQUEST call and update the store.
 */
export const receive = createAction(RECEIVE, () => fetch('/catalog').then(response => response.json()));
export const initializeEditForm = createAction(INITIALIZE_EDIT_FORM, (id, catalogData) => catalogData[id].catalog);
// end region

/**
 * Convenience function to dispatch REQUEST and RECEIVE actions in sequence.
 *
 * @param {function(action: Object)} dispatch  - The dispatch function from the Redux store.
 */
export const fetchMicroservices = (dispatch) => {
  dispatch(request());
  dispatch(receive());
};

export const parseFormErrors = (errors) => _.zipObject(errors.map(e => e.property), errors.map(e => e.message));

export const submitForm = (url, method) => (values) => {
    return new Promise((resolve, reject) => {
      fetch(url, {
            headers: {
              'Content-Type': 'application/json'
            },
            method,
            body: JSON.stringify(values)
          })
        .then(response => response.json()
          .then(json => {
            if (response.ok) {
              resolve(json);
            } else if (response.status === 400) {
              reject(new SubmissionError(parseFormErrors(json.errors)));
            } else {
              throw new Error('A system error has occurred. Please try again later.');
            }
          }))
        .catch(error => reject(new SubmissionError({ _error: [ error.message ] })));
    });
};

/**
* Attempts to POST a new MicroService and handles any errors by formatting them to Redux form to display
*
* @param {string} url - The location where the form should be patched
*
* @return {function(resetForm: function)}  - A function which accepts the reset function from Redux forms and returns a function which accepts parameters in the shape of Redux forms' handleSubmit that POSTs a MicroService and handles any errors.
*/
export const postMicroservice = (url='/catalog') => submitForm(url, 'POST');

/**
* Attempts to PATCH the changes to MicroService and handles any errors by formatting them to Redux form to display
*
* @param {string} url - The location where the form should be patched
*
* @return {function(resetForm: function)}  - A function which accepts the reset function from Redux forms and returns a function which accepts parameters in the shape of Redux forms' handleSubmit that POSTs a MicroService and handles any errors.
*/
export const patchMicroservice = (url) => submitForm('/catalog'+url, 'PATCH');


//region Action Handlers
const receiveHandler = (state, action) => {
  return {
    ...state,
    createUrl: !action.error && action.payload._links.create && action.payload._links.create.href,
    loading: LoadingStates.LOADED,
    catalogData:action.payload._embedded.catalog.map(function(obj, id){
      return {
        id: id,
        catalog: obj
      }
    })
  };
};

const requestHandler = (state, action) => (
  {
  ...state,
  loading: LoadingStates.LOADING
});

const initializeFormHandler = (state, action) => {
  ;
  return {
    formData: action.payload
  }
}
// end region

// Default State
const defaultState = {
  catalogData: [],
  createUrl: undefined,
  loading: LoadingStates.CLEAN
};

// Reducer
export default handleActions({
  [REQUEST]: requestHandler,
  [RECEIVE]: receiveHandler,
  [INITIALIZE_EDIT_FORM]: initializeFormHandler
},defaultState);
