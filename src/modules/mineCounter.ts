const INCREASE = 'mineCounter/INCREASE' as const;
const DECREASE = 'mineCounter/DECREASE' as const;
const RESET = 'mineCounter/RESET' as const;

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const reset = () => ({ type: RESET });

type MineCounterAction =
  | ReturnType<typeof increase>
  | ReturnType<typeof decrease>
  | ReturnType<typeof reset>;

type MineCounterState = {
  count: number;
};

const initalState: MineCounterState = {
  count: 10,
};

function mineCounter(
  state: MineCounterState = initalState,
  action: MineCounterAction,
) {
  switch (action.type) {
    case INCREASE:
      return { count: state.count + 1 };
    case DECREASE:
      return { count: state.count - 1 };
    case RESET:
      return { count: initalState.count };
    default:
      return state;
  }
}

export default mineCounter;
