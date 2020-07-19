import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increase, decrease, reset } from '../modules/mineCounter';
import { RootState } from '../modules';

export default function useCounter() {
  const count = useSelector((state: RootState) => state.mineCounter.count);
  const dispatch = useDispatch();

  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
  const onReset = useCallback(() => dispatch(reset()), [dispatch]);

  return {
    count,
    onIncrease,
    onDecrease,
    onReset,
  };
}
