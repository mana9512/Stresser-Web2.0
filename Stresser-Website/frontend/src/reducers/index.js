import { combineReducers } from 'redux';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import alert from './alert';
import das from './das'
import appointment from './appointment'
import personality from './personality'

export default combineReducers({
  errors,
  messages,
  auth,
  alert,
  das,
  appointment,
  personality
});