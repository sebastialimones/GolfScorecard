import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const StyledLink = styled(Link)`
  border-radius: 6px;
  background-color: #FC587E;
  color: white;
  border: 1px solid white;
  font-size: 1rem;
  padding: 1em;
  margin: 1em;
  text-decoration: none;
  cursor: pointer;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px 0px #FC587E;
  }
`;
const Container = styled.header`
  align-items: center;
  display: flex;
  background: linear-gradient(to Left, #f857a6, #ff5858);
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
  const currentLocation = useLocation()
  return (
    <Container>
      <HeaderContainer>
        {
        currentLocation.pathname !== "/dashboard" 
        ? <HeaderText>Scorecard</HeaderText>
        : <HeaderText>Dashboard</HeaderText>
      }
      </HeaderContainer>
      {
        currentLocation.pathname !== "/dashboard" 
        ? <StyledLink to="/dashboard">Dashboard</StyledLink>
        : <StyledLink to="/">Scorecard</StyledLink>
      }
    </Container>
  )
};
