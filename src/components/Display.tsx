/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import useMineCounter from '../hooks/useMineCounter';
import useGameBoard from '../hooks/useGameBoard';
import GameOverModal from './GameOverModal';

import * as ENUM from '../types/enum';

export default function Display(): JSX.Element {
  const mineCounter = useMineCounter();
  const gameBoard = useGameBoard();
  const handleReset = useCallback(() => {
    gameBoard.onReset();
  }, [gameBoard]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(() => {
    if (gameBoard.gameState === ENUM.GameState.OVER) {
      setIsOpen(true);
    }
  }, [gameBoard.gameState]);

  return (
    <Panel>
      <Counter>💣 {String(mineCounter.count).padStart(3, '0')}</Counter>
      <ResetButton onClick={handleReset}>😀</ResetButton>
      <Timer>⌛{String(gameBoard.elapsedTime).padStart(3, '0')}</Timer>
      <GameOverModal
        isOpen={modalIsOpen}
        handleClose={closeModal}
        handleReset={handleReset}
      />
    </Panel>
  );
}

const Panel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ResetButton = styled.button`
  width: 24px;
  height: 24px;
  padding: 0;
  margin: 0;
  border: 0;
  background: none;
  font-size: 20px;
  outline: none;
  &:active {
    transform: scale(1.4);
  }
  transition: all 0.5s;
`;

const Counter = styled.p`
  width: 80px;
  font-size: 24px;
`;

const Timer = styled.p`
  text-align: right;
  width: 80px;
  font-size: 24px;
`;
