import { createAction, handleActions } from 'redux-actions';
import { LoadingStates } from '../../utils/common';

// region Action constants
const REQUEST = 'microservice-catalog/microservices/REQUEST';
const RECEIVE = 'microservice-catalog/microservices/RECEIVE';
// end region

// region Action creators
export const request = createAction(REQUEST);
/**
 * Callback to receive the results of a REQUEST call and update the store.
 */
export const receive = createAction(RECEIVE, () => fetch('api/catalog').then(response => response.json()));
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

//region Action Handlers
const receiveHandler = (state, action) => {
  return {
    ...state,
    loading: LoadingStates.LOADED,
    catalogData:action.payload
  };
};

const requestHandler = (state, action) => (
  {
  ...state,
  loading: LoadingStates.LOADING
});
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
  [RECEIVE]: receiveHandler
},defaultState);
