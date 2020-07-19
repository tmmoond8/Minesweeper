import { Position } from '../types';

export const addFlag = (flags: Position[], position: Position) => {
  return [...flags, position];
};

export const removeFlag = (flags: Position[], position: Position) => {
  return flags.filter(
    (flag: Position) => flag.x !== position.x || flag.y !== position.y,
  );
};
