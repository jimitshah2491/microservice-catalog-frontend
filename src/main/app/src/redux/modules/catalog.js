import { createAction, handleActions } from 'redux-actions';

// Action constants
const FETCH = "microservice-catalog/microservices/FETCH";
const ADD = "microservice-catalog/microservices/ADD";

// Action creators
const fetchMicroservices = createAction(FETCH, fetch('/catalog'));

// Action Handler for fetching Microservice data from server
const handleFetchMicroservices = (state,action) =>({
    ...state,
    catalogData:action.payload._embedded.catalog
});

// Default State
const defaultState = {
  catalogData: []
};

// Reducer
export default handleActions({
  [FETCH]: handleFetchMicroservices
},defaultState);
