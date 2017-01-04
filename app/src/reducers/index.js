import { combineReducers } from 'redux';
import codeTreeReducer from './reducer_codeTree';


const rootReducer = combineReducers({
  codeTree : codeTreeReducer
});

export default rootReducer;
