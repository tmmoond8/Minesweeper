/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import Modal from 'react-modal';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleReset: () => void;
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
  const { isOpen, handleClose, handleReset } = props;

  useEffect(() => {
    Modal.setAppElement('#root');
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={customStyles}
      contentLabel="GameOver Modal"
    >
      <ModalHead>
        <h2>Game Over !!!</h2>
      </ModalHead>
      <ModalBody>
        <h3>try again ?</h3>
        <form>
          <button onClick={handleClose}>close</button>
          <button onClick={handleReset}>re-try</button>
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
