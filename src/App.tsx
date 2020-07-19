import React from 'react';
import styled from '@emotion/styled';
import Display from './components/Display';
import GameBoard from './components/GameBoard';

function App() {
  return (
    <Layout className="App">
      <Display />
      <GameBoard />
    </Layout>
  );
}

export default App;

const Layout = styled.div`
  width: 100%;
  max-width: 320px;
  margin: auto;
`;
