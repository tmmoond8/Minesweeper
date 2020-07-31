/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useState, Fragment, useEffect, ChangeEvent, useCallback } from 'react';
import useRank from '../hooks/useRank';
import Modal from 'react-modal';
import { Rank as RankType } from '../types';
import useGameBoard from '../hooks/useGameBoard';
import * as CONST from '../constants';

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

interface RankProps extends RankType {
  index: number;
}

const RankItem = (props: RankProps) => {
  const { nickname, score, index } = props;
  return (
    <Item>
      <span>{index + 1}</span>
      <span>{nickname}</span>
      <span>{score}</span>
    </Item>
  );
};

export default function Rank(): JSX.Element {
  const { ranks, addRank } = useRank();
  const [modalIsOpen, setIsOpen] = useState(false);
  const { elapsedTime, gameState } = useGameBoard();
  const [nickname, setNickname] = useState('');

  function closeModal() {
    setIsOpen(false);
  }

  const handleSend = useCallback(() => {
    addRank(nickname, elapsedTime);
    closeModal();
  }, [addRank, nickname, elapsedTime]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  useEffect(() => {
    if (gameState === CONST.GameState.CLEAR) {
      setIsOpen(true);
    }
  }, [gameState]);

  useEffect(() => {
    Modal.setAppElement('#root');
  }, [ranks]);

  return (
    <Fragment>
      <List>
        {ranks.map((rank, index) => (
          <RankItem {...rank} index={index} />
        ))}
      </List>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ModalHead>
          <h2>Clear !!!</h2>
          <button onClick={closeModal}>close</button>
        </ModalHead>
        <ModalBody>
          <h3>{elapsedTime}</h3>
          <p>input your nickname</p>
          <form>
            <input onChange={handleInputChange} />
            <button onClick={handleSend}>send</button>
          </form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 24px 0 0 0;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #bbb;
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

const ModalBody = styled.div``;
