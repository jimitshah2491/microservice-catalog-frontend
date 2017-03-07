import {combineReducers} from 'redux';
import getDataOnLoad from './modules/getDataOnLoad';
import microServiceFormReducer from './modules/AddMicroServiceFormReducer';

const appReducer = combineReducers({
  getDataOnLoad,
  microServiceFormReducer
})

export default appReducer;
