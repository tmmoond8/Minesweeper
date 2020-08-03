import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openSquare, plantMine } from '../stores/gameBoard';
import * as gameManager from '../modules/gameManager';
import { RootState } from '../stores';
import { Position } from '../types';
import { GameState } from '../constants';

export default function useSquare(position: Position) {
  const squares = useSelector((state: RootState) => state.gameBoard.squares);
  const gameState = useSelector(
    (state: RootState) => state.gameBoard.gameState,
  );
  const dispatch = useDispatch();

  const square = useMemo(() => {
    return squares[position.y][position.x];
  }, [squares, position]);

  const onOpenSquare = useCallback(() => {
    if (gameState === GameState.READY) {
      dispatch(plantMine(gameManager.initMines()));
    }
    dispatch(openSquare(position));
  }, [dispatch, position, gameState]);

  return {
    square,
    onOpenSquare,
  };
}
