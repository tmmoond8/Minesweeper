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
}

const initalState: GameBoardState = {
  squares: new Array(8)
    .fill(null)
    .map((_, y) =>
      new Array(8)
        .fill(null)
        .map((_, x) => ({ isOpen: false, isFlag: false, x, y })),
    ),
};

function GameBoard(
  state: GameBoardState = initalState,
  action: GameBoardAction,
): GameBoardState {
  switch (action.type) {
    case OPEN_SQAURE:
      return { squares: gameManager.openSquare(state.squares, action.payload) };

    case RESET:
      return initalState;
    default:
      return state;
  }
}

export default GameBoard;
