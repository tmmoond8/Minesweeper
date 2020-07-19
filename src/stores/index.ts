import { combineReducers } from 'redux';
import mineCounter from './mineCounter';
import gameBoard from './gameBoard';

const rootReducer = combineReducers({
  mineCounter,
  gameBoard,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
