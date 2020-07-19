import { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openSquare, reset } from '../stores/gameBoard';
import { RootState } from '../stores';
import { Position } from '../types';

export default function useGameBoard() {
  const squares = useSelector((state: RootState) => state.gameBoard.squares);
  const mines = useSelector((state: RootState) => state.gameBoard.mines);
  const gameState = useSelector(
    (state: RootState) => state.gameBoard.gameState,
  );
  const dispatch = useDispatch();

  const onOpenSquare = useCallback(
    (position: Position) => dispatch(openSquare(position)),
    [dispatch],
  );

  const [elapsedTime, setElapsedTime] = useState(0);
  useEffect(() => {
    if (gameState === 'READY') {
      setElapsedTime(0);
    }
    if (gameState === 'PLAYING') {
      const timerId: ReturnType<typeof setTimeout> = setInterval(() => {
        setElapsedTime(elapsedTime + 1);
      }, 1000);
      return () => {
        clearInterval(timerId);
      };
    }
  }, [gameState, elapsedTime, setElapsedTime]);

  const onReset = useCallback(() => dispatch(reset()), [dispatch]);

  return {
    squares,
    mines,
    gameState,
    elapsedTime,
    onOpenSquare,
    onReset,
  };
}
