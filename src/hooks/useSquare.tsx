import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openSquare } from '../stores/gameBoard';
import { RootState } from '../stores';
import { Position } from '../types';

export default function useSquare(position: Position) {
  const squares = useSelector((state: RootState) => state.gameBoard.squares);
  const dispatch = useDispatch();

  const square = useMemo(() => {
    return squares[position.y][position.x];
  }, [squares, position]);

  const onOpenSquare = useCallback(() => {
    dispatch(openSquare(position));
  }, [dispatch, position]);

  return {
    square,
    onOpenSquare,
  };
}
