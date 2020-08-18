/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useState, Fragment, useEffect, useCallback } from 'react';
import useRank from '../hooks/useRank';
import Modal from 'react-modal';
import { Rank as RankType } from '../types';
import useGameBoard from '../hooks/useGameBoard';
import GameClearModal from './GameClearModal';
import * as CONST from '../constants';

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
  const { ranks } = useRank();
  const [modalIsOpen, setIsOpen] = useState(false);
  const { elapsedTime, gameState } = useGameBoard();

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

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
      <GameClearModal
        isOpen={modalIsOpen}
        elapsedTime={elapsedTime}
        handleClose={handleCloseModal}
      />
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
