import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openSquare, reset } from '../stores/gameBoard';
import { RootState } from '../stores';
import { Position } from '../types';

export default function useGameBoard() {
  const squares = useSelector((state: RootState) => state.gameBoard.squares);
  const dispatch = useDispatch();

  const onOpenSquare = useCallback(
    (position: Position) => dispatch(openSquare(position)),
    [dispatch],
  );

  const onReset = useCallback(() => dispatch(reset()), [dispatch]);

  return {
    squares,
    onOpenSquare,
    onReset,
  };
}
