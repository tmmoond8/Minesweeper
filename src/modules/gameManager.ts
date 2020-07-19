import { Position, Square } from '../types';

export const openSquare = (
  squares: Square[][],
  mines: Position[],
  position: Position,
): Square[][] => {
  const { x, y } = position;
  const target = { ...squares[y][x] };
  if (target.isOpen) {
    return squares;
  }
  target.isOpen = true;
  console.log(mines);
  const found = mines.find((mine) => mine.x === x && mine.y === y);
  if (found) {
    target.displayValue = '💣';
  }
  console.log(target);
  var result = [
    ...squares.slice(0, y),
    [...squares[y].slice(0, x), target, ...squares[y].slice(x + 1)],
    ...squares.slice(y + 1),
  ];
  console.log(result);
  return result;
};
