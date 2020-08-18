import { Position, Square, GameState } from '../types';
import * as gameManager from '../modules/gameManager';
import * as ENUM from '../types/enum';

const OPEN_SQAURE = 'gameBoard/OPEN_SQAURE' as const;
const RESET = 'gameBoard/RESET' as const;
const ADD_FLAG = 'gameBoard/ADD_FLAG' as const;
const REMOVE_FLAG = 'gameBoard/REMOVE_FLAG' as const;
const PLANT_MINE = 'gameBoard/PLANT_MINE' as const;

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

export const plantMine = (mines: Position[]) => ({
  type: PLANT_MINE,
  payload: mines,
});

export const reset = () => ({ type: RESET });

type GameBoardAction =
  | ReturnType<typeof openSquare>
  | ReturnType<typeof addFlag>
  | ReturnType<typeof removeFlag>
  | ReturnType<typeof plantMine>
  | ReturnType<typeof reset>;

interface GameBoardState {
  squares: Square[][];
  flags: Position[];
  mines: Position[];
  gameState: GameState;
}

const initalState: GameBoardState = {
  squares: gameManager.initSquares,
  flags: [],
  mines: [],
  gameState: ENUM.GameState.READY,
};

function GameBoard(
  state: GameBoardState = initalState,
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
        flags: gameState === ENUM.GameState.CLEAR ? state.mines : state.flags,
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
        gameState: isClear ? ENUM.GameState.CLEAR : state.gameState,
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
    case PLANT_MINE: {
      return {
        ...state,
        mines: action.payload,
      };
    }
    case RESET:
      return initalState;
    default:
      return state;
  }
}

export default GameBoard;
