import { Position, Square, GameState } from '../types';

const detectMine = (mines: Position[], position: Position) => {
  const { x, y } = position;
  const surroundings = [
    { x: x - 1, y: y - 1 },
    { x: x + 0, y: y - 1 },
    { x: x + 1, y: y - 1 },
    { x: x - 1, y: y + 0 },
    { x: x + 1, y: y + 0 },
    { x: x - 1, y: y + 1 },
    { x: x + 0, y: y + 1 },
    { x: x + 1, y: y + 1 },
  ].filter(({ x, y }) => x >= 0 && x < 8 && y >= 0 && y < 8);
  return surroundings.reduce((accum, surrounding) => {
    return (
      accum +
      (mines.find(({ x, y }) => surrounding.x === x && surrounding.y === y)
        ? 1
        : 0)
    );
  }, 0);
};

export const checkGameClear = (
  squares: Square[][],
  mines: Position[],
  flags?: Position[],
) => {
  if (flags) {
    const sortFunction = (a: Position, b: Position) => {
      if (a.y > b.y) {
        return a.x - b.x;
      }
      return -1;
    };
    flags.sort(sortFunction);
    mines.sort(sortFunction);
    const isSame = JSON.stringify(flags) === JSON.stringify(mines);
    if (isSame) {
      return true;
    }
  }

  return (
    squares.flat().filter((squares) => !squares.isOpen).length === mines.length
  );
};

export const openSquare = (
  squares: Square[][],
  mines: Position[],
  position: Position,
): { squares: Square[][]; gameState: GameState } => {
  const { x, y } = position;
  const target = { ...squares[y][x] };
  let gameState: GameState = 'PLAYING';

  if (target.isOpen) {
    return { squares, gameState };
  }
  target.isOpen = true;

  const found = mines.find((mine) => mine.x === x && mine.y === y);
  if (found) {
    target.displayValue = '💣';
    gameState = 'OVER';
  } else {
    target.displayValue = String(detectMine(mines, position));
  }

  const resultSquares = [
    ...squares.slice(0, y),
    [...squares[y].slice(0, x), target, ...squares[y].slice(x + 1)],
    ...squares.slice(y + 1),
  ];

  const isClear = checkGameClear(resultSquares, mines);
  if (isClear) {
    gameState = 'CLEAR';
  }
  return {
    squares: resultSquares,
    gameState,
  };
};

export const initSquares = new Array(8)
  .fill(null)
  .map((_, y) =>
    new Array(8)
      .fill(null)
      .map((_, x) => ({ isOpen: false, isFlag: false, x, y })),
  );

export const initMines = () =>
  new Array(8 * 8)
    .fill(null)
    .map((_, index) => index)
    .sort(() => Math.random() - 0.5)
    .filter((_, index) => index < 10)
    .map((num) => ({ x: num % 10, y: Math.floor(num / 10) }));

export const isGameEnd = (gameState: GameState) =>
  ['CLEAR', 'OVER'].includes(gameState);
