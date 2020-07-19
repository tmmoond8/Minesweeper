import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFlag, removeFlag, reset } from '../stores/mineCounter';
import { Position } from '../types';
import { RootState } from '../stores';

export default function useMineCounter() {
  const count = useSelector((state: RootState) => state.mineCounter.count);
  const flags = useSelector((state: RootState) => state.mineCounter.flags);
  const dispatch = useDispatch();

  const onAddFlag = useCallback(
    (position: Position) => dispatch(addFlag(position)),
    [dispatch],
  );
  const onRemoveFlag = useCallback(
    (position: Position) => dispatch(removeFlag(position)),
    [dispatch],
  );
  const onReset = useCallback(() => dispatch(reset()), [dispatch]);

  return {
    count,
    flags,
    onAddFlag,
    onRemoveFlag,
    onReset,
  };
}
