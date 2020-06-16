import React from 'react';
import styled from 'styled-components';

const Container = styled.header`
  align-items: center;
  display: flex;
  background: linear-gradient(to Left, #87c7df, #648896);
  width: 100%;
  margin-bottom: 1.5em;
`;

const HeaderContainer = styled.div`
  margin: 0 auto;
`;

const HeaderText = styled.p`
  color: white;
  font-size: 1.8em;
`;

export const Header = () => {
  return (
    <Container>
      <HeaderContainer>
        <HeaderText>
          Scorecard!
        </HeaderText>
      </HeaderContainer>
    </Container>
  )
};
