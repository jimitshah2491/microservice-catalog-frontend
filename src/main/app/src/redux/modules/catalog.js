import { createAction, handleActions } from 'redux-actions';
import { LoadingStates } from '../../utils/common';
import { SubmissionError } from 'redux-form';
import _ from 'lodash';
import fetch from 'isomorphic-fetch';

// import BACKEND_URL from '../../env-config.js';

// region Action constants
export const REQUEST = 'microservice-catalog/microservices/REQUEST';
export const RECEIVE_SUCCESS = 'microservice-catalog/microservices/RECEIVE_SUCCESS';
export const RECEIVE_ERROR = 'microservice-catalog/microservices/RECEIVE_ERROR';
export const INITIALIZE_EDIT_FORM = 'microservice-catalog/microservices/INITIALIZE_EDIT_FORM';
export const CREATE_MICROSERVICE_SUCCESS = '@@redux-form/SET_SUBMIT_SUCCEEDED';
export const FILTER_DATA = 'micorservices-catalog/microservices/FILTER_DATA';
// end region

// region Action creators
export const request = createAction(REQUEST);
/**
 * Callback to receive the results of a REQUEST call and update the store.
 */
export const receiveSuccess = createAction(RECEIVE_SUCCESS, (catalogData) => catalogData);
export const receiveError = createAction(RECEIVE_ERROR, () => {});
export const initializeEditForm = createAction(INITIALIZE_EDIT_FORM, (id) => fetch('/catalog/'+id).then(response => response.json()));
export const filterText = createAction(FILTER_DATA, (text)=>text);
// end region

/**
 * Convenience function to dispatch REQUEST and RECEIVE actions in sequence.
 *
 * @param {function(action: Object)} dispatch  - The dispatch function from the Redux store.
 */
export const fetchMicroservices = (dispatch) => {
    dispatch(request());
    return fetch('/catalog')
      .then(response => response.json())
      .then(json => dispatch(receiveSuccess(json)))
      .catch(ex => dispatch(receiveError(ex)))
}

export const parseFormErrors = (errors) => _.zipObject(errors.map(e => e.property), errors.map(e => e.message));

/**
 * [submitForm description]
 * @param  {[type]} url    [description]
 * @param  {[type]} method [description]
 * @return {[type]}        [description]
 */
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
        .catch(error => reject(new SubmissionError({ error: [ error.message ] })));
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
export const receiveHandler = (state, action) => {
  return {
    ...state,
    loading: LoadingStates.LOADED,
    errorfetching: false,
    catalogData:action.payload._embedded.catalog.map(function(obj){
      return {
        id: obj._links.self.href.substring(obj._links.self.href.lastIndexOf("/")+1, obj._links.self.href.length),
        catalog: obj
      }
    })
  };
};

export const receiveErrorHandler = (state, action) => (
  {
    ...state,
    loading: LoadingStates.LOADED,
    errorfetching: true
  }
);

export const requestHandler = (state, action) => (
  {
    ...state,
    loading: LoadingStates.LOADING
  }
);

export const initializeFormHandler = (state, action) => ({
    formData: action.payload
})

export const filterDataHandler = (state, action)=>({
    ...state,
    filterText: action.payload
})

// end region

// Default State
export const defaultState = {
  catalogData: [],
  loading: LoadingStates.CLEAN,
  filterText: '',
  errorfetching: false
};

// Reducer
export default handleActions({
  [REQUEST]: requestHandler,
  [RECEIVE_SUCCESS]: receiveHandler,
  [RECEIVE_ERROR]: receiveErrorHandler,
  [INITIALIZE_EDIT_FORM]: initializeFormHandler,
  [FILTER_DATA]:filterDataHandler
},defaultState);
