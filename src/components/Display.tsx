/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import useMineCounter from '../hooks/useMineCounter';
import useGameBoard from '../hooks/useGameBoard';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function Display(): JSX.Element {
  const mineCounter = useMineCounter();
  const gameBoard = useGameBoard();
  const handleReset = useCallback(() => {
    gameBoard.onReset();
  }, [gameBoard]);

  const [modalIsOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (gameBoard.gameState === 'OVER') {
      setIsOpen(true);
    }
  }, [gameBoard.gameState]);

  useEffect(() => {
    Modal.setAppElement('#root');
  }, [gameBoard]);

  return (
    <Panel>
      <Counter>💣 {String(mineCounter.count).padStart(3, '0')}</Counter>
      <ResetButton onClick={handleReset}>😀</ResetButton>
      <Timer>⌛{String(gameBoard.elapsedTime).padStart(3, '0')}</Timer>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ModalHead>
          <h2>Game Over !!!</h2>
        </ModalHead>
        <ModalBody>
          <h3>try again ?</h3>
          <form>
            <button onClick={closeModal}>close</button>
            <button onClick={handleReset}>re-try</button>
          </form>
        </ModalBody>
      </Modal>
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

const ModalHead = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  & > button {
    border: none;
    background: none;
    outline: none;
  }
`;

const ModalBody = styled.div`
  h3 {
    margin-top: 0;
  }
  form {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    button + button {
      margin-left: 16px;
    }
  }
`;
