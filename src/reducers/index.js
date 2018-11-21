import { combineReducers } from 'redux';
import data from './data';
import session from './session';

export default combineReducers({
  data,
  session,
});
