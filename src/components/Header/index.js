import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { HamburguerMenu } from '../Elements/hamburguerMenu';
import { useCurrentUser } from '../../hooks/userCurrentUser';
import { withRouter } from 'react-router-dom';

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

const HeaderNameMapper = {
  '/': 'Resultat',
  '/dashboard': 'Estadístiques',
  '/login': 'Entrar a desastres de golf',
  '/signup': 'Nou usuari',
  '/newcourse': 'Crear camp',
};

const Header = ({ history }) => {
  const currentLocation = useLocation();
  const [user, isFetchingUser] = useCurrentUser();

  const routeCreateCourse = () => {
    history.push('/newcourse');
  };

  const routeResultsClick = () => {
    history.push('/');
  };

  const routeDashboardHomeClick = () => {
    history.push('/dashboard');
  };

  return (
    <Container>
      <HeaderContainer>
        <HeaderText>
        {
        HeaderNameMapper[currentLocation.pathname] 
        }
        </HeaderText>
      </HeaderContainer>
        { 
        !isFetchingUser && user 
        ? <HamburguerMenu routeCreateCourse={ routeCreateCourse } routeDashboardHomeClick={ routeDashboardHomeClick } currentLocation={ currentLocation } routeResultsClick={ routeResultsClick }></HamburguerMenu>
        : null
         }
    </Container>
  )
};

export default withRouter(Header);