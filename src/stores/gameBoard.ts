import { Position, Square, GameState } from '../types';
import * as gameManager from '../modules/gameManager';
import * as CONST from '../constants';

const OPEN_SQAURE = 'gameBoard/OPEN_SQAURE' as const;
const RESET = 'gameBoard/RESET' as const;
const ADD_FLAG = 'gameBoard/ADD_FLAG' as const;
const REMOVE_FLAG = 'gameBoard/REMOVE_FLAG' as const;

export const openSquare = (position: Position) => ({
  type: OPEN_SQAURE,
  payload: position,
});

export const addFlag = (position: Position) => ({
  type: ADD_FLAG,
  payload: position,
});
export const removeFlag = (position: Position) => ({
  type: REMOVE_FLAG,
  payload: position,
});

export const reset = () => ({ type: RESET });

type GameBoardAction =
  | ReturnType<typeof openSquare>
  | ReturnType<typeof addFlag>
  | ReturnType<typeof removeFlag>
  | ReturnType<typeof reset>;

interface GameBoardState {
  squares: Square[][];
  flags: Position[];
  mines: Position[];
  gameState: GameState;
}

const initalState = (): GameBoardState => ({
  gameState: CONST.GameState.READY,
  flags: [],
  squares: gameManager.initSquares(),
  mines: gameManager.initMines(),
});

function GameBoard(
  state: GameBoardState = initalState(),
  action: GameBoardAction,
): GameBoardState {
  switch (action.type) {
    case OPEN_SQAURE:
      if (gameManager.isGameEnd(state.gameState)) {
        return state;
      }
      const { squares, gameState } = gameManager.openSquare(
        state.squares,
        state.mines,
        action.payload,
      );
      return {
        ...state,
        squares,
        gameState,
        flags: gameState === CONST.GameState.CLEAR ? state.mines : state.flags,
      };
    case ADD_FLAG: {
      if (
        gameManager.isGameEnd(state.gameState) ||
        state.mines.length <= state.flags.length
      ) {
        return state;
      }
      const nextFlags = [...state.flags, action.payload];
      const isClear = gameManager.checkGameClear(
        state.squares,
        state.mines,
        nextFlags,
      );
      return {
        ...state,
        flags: nextFlags,
        gameState: isClear ? CONST.GameState.CLEAR : state.gameState,
      };
    }
    case REMOVE_FLAG: {
      if (gameManager.isGameEnd(state.gameState)) {
        return state;
      }
      const { x, y } = action.payload;
      const nextFlags = state.flags.filter(
        (flag: Position) => flag.x !== x || flag.y !== y,
      );
      return { ...state, flags: nextFlags };
    }
    case RESET:
      return initalState();
    default:
      return state;
  }
}

export default GameBoard;
