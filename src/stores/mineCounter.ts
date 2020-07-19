import { Position } from '../types';
import * as Flags from '../modules/Flags';

const ADD_FLAG = 'mineCounter/ADD_FLAG' as const;
const REMOVE_FLAG = 'mineCounter/REMOVE_FLAG' as const;
const RESET = 'mineCounter/RESET' as const;

export const addFlag = (position: Position) => ({
  type: ADD_FLAG,
  payload: position,
});
export const removeFlag = (position: Position) => ({
  type: REMOVE_FLAG,
  payload: position,
});

export const reset = () => ({ type: RESET });

type MineCounterAction =
  | ReturnType<typeof addFlag>
  | ReturnType<typeof removeFlag>
  | ReturnType<typeof reset>;

interface MineCounterState {
  count: number;
  flags: Position[];
}

const initalState: MineCounterState = {
  count: 10,
  flags: [],
};

function mineCounter(
  state: MineCounterState = initalState,
  action: MineCounterAction,
): MineCounterState {
  switch (action.type) {
    case ADD_FLAG: {
      const nextFlags = Flags.addFlag(state.flags, action.payload);
      return { count: initalState.count - nextFlags.length, flags: nextFlags };
    }
    case REMOVE_FLAG: {
      const nextFlags = Flags.removeFlag(state.flags, action.payload);
      return { count: initalState.count - nextFlags.length, flags: nextFlags };
    }
    case RESET:
      return initalState;
    default:
      return state;
  }
}

export default mineCounter;
