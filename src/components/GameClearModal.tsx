/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import Modal from 'react-modal';
import { useEffect, useCallback, useState, ChangeEvent } from 'react';
import useRank from '../hooks/useRank';

interface ModalProps {
  isOpen: boolean;
  elapsedTime: number;
  handleClose: () => void;
}

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

export default function GameOverModal(props: ModalProps): JSX.Element {
  const { isOpen, handleClose, elapsedTime } = props;
  const { addRank } = useRank();
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    Modal.setAppElement('#root');
  }, [isOpen]);

  const handleSend = useCallback(() => {
    addRank(nickname, elapsedTime);
    handleClose();
  }, [addRank, nickname, elapsedTime, handleClose]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <ModalHead>
        <h2>Clear !!!</h2>
        <button onClick={handleClose}>close</button>
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
  );
}

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
