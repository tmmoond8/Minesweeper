import GameStateEnum from '../constants';

export interface Position {
  x: number;
  y: number;
}

export interface Square extends Position {
  isOpen: boolean;
  isFlag: boolean;
  displayValue?: string;
}

export type GameState = typeof GameStateEnum[keyof typeof GameStateEnum];

export interface Rank {
  nickname: string;
  score: number;
}
