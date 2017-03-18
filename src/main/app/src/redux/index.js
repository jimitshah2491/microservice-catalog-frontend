import {combineReducers} from 'redux';
import catalog from './modules/catalog'
import { reducer as reduxFormReducer } from 'redux-form'

const appReducer = combineReducers({
  catalog,
  reduxFormReducer
})

export default appReducer;
