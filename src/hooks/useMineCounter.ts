import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFlag, removeFlag, reset } from '../stores/gameBoard';
import { Position } from '../types';
import { RootState } from '../stores';

export default function useMineCounter() {
  const mines = useSelector((state: RootState) => state.gameBoard.mines);
  const flags = useSelector((state: RootState) => state.gameBoard.flags);
  const dispatch = useDispatch();

  const onAddFlag = useCallback(
    (position: Position) => dispatch(addFlag(position)),
    [dispatch],
  );
  const onRemoveFlag = useCallback(
    (position: Position) => dispatch(removeFlag(position)),
    [dispatch],
  );

  const count = useMemo(() => mines.length - flags.length, [mines, flags]);

  const onReset = useCallback(() => dispatch(reset()), [dispatch]);

  return {
    count,
    flags,
    onAddFlag,
    onRemoveFlag,
    onReset,
  };
}
