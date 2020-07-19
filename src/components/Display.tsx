/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useCallback } from 'react';
import useMineCounter from '../hooks/useMineCounter';

export default function Display(): JSX.Element {
  const mineCounter = useMineCounter();
  const elapsedTime = 14;

  return (
    <Panel>
      <Counter>{mineCounter.count}</Counter>
      <ResetButton>😀</ResetButton>
      <Timer>{elapsedTime}</Timer>
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
  font-size: 24px;
`;

const Timer = styled.p`
  font-size: 24px;
`;
