import { Position, Square, GameState } from '../types';
import cloneDeep from 'lodash.clonedeep';
import * as ENUM from '../types/enum';

const GAME_SIZE = 8;

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
  ].filter(({ x, y }) => x >= 0 && x < GAME_SIZE && y >= 0 && y < GAME_SIZE);
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
      return a.x - b.x;
    };
    return (
      JSON.stringify([...flags].sort(sortFunction)) ===
      JSON.stringify([...mines].sort(sortFunction))
    );
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
  const nextSquares = cloneDeep(squares);
  const target = nextSquares[y][x];
  let gameState: GameState = ENUM.GameState.PLAYING;

  if (target.isOpen) {
    return { squares, gameState };
  }
  target.isOpen = true;

  const found = mines.find((mine) => mine.x === x && mine.y === y);
  if (found) {
    mines.forEach(({ x, y }) => {
      nextSquares[y][x] = {
        ...nextSquares[y][x],
        displayValue: '💣',
        isOpen: true,
      };
    });
    target.displayValue = '💣';
    gameState = ENUM.GameState.OVER;
  } else {
    target.displayValue = String(detectMine(mines, position));
  }

  const isClear = checkGameClear(nextSquares, mines);
  if (isClear) {
    gameState = ENUM.GameState.CLEAR;
  }
  return {
    squares: nextSquares,
    gameState,
  };
};

export const initSquares = new Array(GAME_SIZE)
  .fill(null)
  .map((_, y) =>
    new Array(GAME_SIZE)
      .fill(null)
      .map((_, x) => ({ isOpen: false, isFlag: false, x, y })),
  );

export const initMines = () =>
  new Array(GAME_SIZE * GAME_SIZE)
    .fill(null)
    .map((_, index) => index)
    .sort(() => Math.random() - 0.5)
    .filter((_, index) => index < GAME_SIZE)
    .map((num) => ({ x: num % GAME_SIZE, y: Math.floor(num / GAME_SIZE) }));

export const isGameEnd = (gameState: GameState) =>
  [ENUM.GameState.CLEAR, ENUM.GameState.OVER].includes(gameState);
