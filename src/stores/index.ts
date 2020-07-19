import { combineReducers } from 'redux';
import gameBoard from './gameBoard';

const rootReducer = combineReducers({
  gameBoard,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
