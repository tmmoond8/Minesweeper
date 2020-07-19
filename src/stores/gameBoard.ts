import { Position, Square } from '../types';
import * as gameManager from '../modules/gameManager';

const OPEN_SQAURE = 'gameBoard/OPEN_SQAURE' as const;
const RESET = 'gameBoard/RESET' as const;

export const openSquare = (position: Position) => ({
  type: OPEN_SQAURE,
  payload: position,
});

export const reset = () => ({ type: RESET });

type GameBoardAction = ReturnType<typeof openSquare> | ReturnType<typeof reset>;

interface GameBoardState {
  squares: Square[][];
  mines: Position[];
}

const initalState: GameBoardState = {
  squares: new Array(8)
    .fill(null)
    .map((_, y) =>
      new Array(8)
        .fill(null)
        .map((_, x) => ({ isOpen: false, isFlag: false, x, y })),
    ),
  mines: [
    { x: 4, y: 1 },
    { x: 1, y: 8 },
    { x: 3, y: 9 },
    { x: 4, y: 4 },
    { x: 5, y: 2 },
    { x: 6, y: 3 },
    { x: 2, y: 3 },
    { x: 1, y: 4 },
    { x: 9, y: 3 },
    { x: 2, y: 1 },
  ],
  // new Array(8 * 8)
  //   .fill(null)
  //   .map((_, index) => index)
  //   .sort(() => Math.random() - 0.5)
  //   .filter((_, index) => index < 10)
  //   .map((num) => ({ x: num % 10, y: Math.floor(num / 10) })),
};

function GameBoard(
  state: GameBoardState = initalState,
  action: GameBoardAction,
): GameBoardState {
  switch (action.type) {
    case OPEN_SQAURE:
      return {
        squares: gameManager.openSquare(
          state.squares,
          state.mines,
          action.payload,
        ),
        mines: state.mines,
      };
    case RESET:
      return initalState;
    default:
      return state;
  }
}

export default GameBoard;
