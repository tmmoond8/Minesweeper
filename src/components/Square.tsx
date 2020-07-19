/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useState, useCallback } from 'react';
import useMineCounter from '../hooks/useMineCounter';

export default function Square(): JSX.Element {
  const mineCounter = useMineCounter();
  const isOpen = false;
  const [isFlag, setFlag] = useState(false);
  const handleRightClick = useCallback(() => {
    setFlag(!isFlag);
    if (isFlag) {
      mineCounter.onIncrease();
    } else {
      mineCounter.onDecrease();
    }
  }, [isFlag, mineCounter]);

  return (
    <StyledSquare onClick={handleRightClick}>{isFlag && '🏳️‍🌈'}</StyledSquare>
  );
}

const StyledSquare = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: #bbb;
  cursor: pointer;
`;
