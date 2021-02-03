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
  '/': 'Resultado',
  '/dashboard': 'Estadísticas',
  '/newcourse': 'Crear campo',
  '/courses': 'Campos',
  '/ranking': 'Ranking',
  '/cookiespolicy': 'Política de cookies',
  '/profile': 'Perfil'
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

  const routeCoursesClick = () => {
    history.push('/courses');
  };

  const routeRankingClick = () => {
    history.push('/ranking')
  };

  const routeProfileClick = () => {
    history.push('/profile')
  };

  return (
    <React.Fragment>
    { currentLocation.pathname !== '/landing' 
    ?
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
        ? <HamburguerMenu 
          routeCreateCourse={ routeCreateCourse } 
          routeDashboardHomeClick={ routeDashboardHomeClick } 
          routeCoursesClick={ routeCoursesClick }
          routeResultsClick={ routeResultsClick }
          routeRankingClick={ routeRankingClick }
          routeProfileClick={ routeProfileClick }
          >
          </HamburguerMenu>
        : null
         }
    </Container>
    : undefined
    }
    </React.Fragment>
  )
};

export default withRouter(Header);