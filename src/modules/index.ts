import { combineReducers } from 'redux';
import mineCounter from './mineCounter';

const rootReducer = combineReducers({
  mineCounter,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
