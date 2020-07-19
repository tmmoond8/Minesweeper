/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import useGameBoard from '../hooks/useGameBoard';
import Square from './Square';
import { Square as SquareType } from '../types';

export default function GameBoard(): JSX.Element {
  const { squares } = useGameBoard();
  return (
    <Board>
      {squares.map((rows: SquareType[]) => (
        <Row key={rows[0].y} rows={rows} />
      ))}
    </Board>
  );
}

function Row(props: { rows: SquareType[] }): JSX.Element {
  return (
    <StyledRow>
      {props.rows.map((square) => (
        <Square key={`${square.x}-${square.y}`} x={square.x} y={square.y} />
      ))}
    </StyledRow>
  );
}

const Board = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  & > ul:first-of-type > li {
    border-top: 1px solid #888;
  }
`;

const StyledRow = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  & > li:first-of-type {
    border-left: 1px solid #888;
  }
`;
