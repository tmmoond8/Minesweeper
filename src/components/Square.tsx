/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Position } from '../types';
import { useMemo, useCallback } from 'react';
import useMineCounter from '../hooks/useMineCounter';

interface SquareProps extends Position {}

export default function Square(props: SquareProps): JSX.Element {
  const { x, y } = props;
  const mineCounter = useMineCounter();
  const isOpen = false;
  const isFlag = useMemo(() => {
    return mineCounter.flags.find((flag) => flag.x === x && flag.y === y);
  }, [mineCounter, x, y]);
  const handleRightClick = useCallback(() => {
    if (!isFlag) {
      mineCounter.onAddFlag({ x, y });
    } else {
      mineCounter.onRemoveFlag({ x, y });
    }
  }, [isFlag, mineCounter, x, y]);

  return (
    <StyledSquare onClick={handleRightClick}>{isFlag && '🏳️‍🌈'}</StyledSquare>
  );
}

const StyledSquare = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  margin: 0;

  list-style: none;
  font-size: 32px;
  background-color: #eee;
  border-bottom: 1px solid #888;
  border-right: 1px solid #888;
  cursor: pointer;
`;
