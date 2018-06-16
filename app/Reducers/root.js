import { combineReducers } from 'redux';
import { drizzleReducers } from 'drizzle';
import mintReducer from './mint';

const reducer = combineReducers({
  mint: mintReducer,
  ...drizzleReducers
});

export default reducer;

