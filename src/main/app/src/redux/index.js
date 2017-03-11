import {combineReducers} from 'redux';
import catalog from './modules/catalog'

const appReducer = combineReducers({
  catalog
})

export default appReducer;
