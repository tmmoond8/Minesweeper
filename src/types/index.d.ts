export interface Position {
  x: number;
  y: number;
}

export interface Square extends Position {
  isOpen: boolean;
  isFlag: boolean;
  displayValue?: string;
}

export type GameState = 'READY' | 'PLAYING' | 'OVER' | 'CLEAR';
