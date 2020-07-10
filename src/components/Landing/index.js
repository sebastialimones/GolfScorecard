import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import alligator from '../../assets/alligator.jpg';
import { Features } from './features';
import { FAQ } from './faq';
import { gsap, Power2 } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin'
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Login as LoginComponent } from '../Login';
import { useCurrentUser } from '../../hooks/userCurrentUser';
import { createUser } from '../../services/createUser';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { Footer } from '../Footer';

const Container = styled.div`
  font-family: 'nunito';
`; 

const FadeContainer = styled.div`
  display: 'flex';
  align-Items: 'center';
`; 

const Nav = styled.div `
  display: grid;
  grid-template-columns: 10% 1fr 1fr 10%;
  height: 10vh; 
  color: black;
  align-items: center;
`
const useStyles = makeStyles((theme) => ({
  root: {
    height: 300,
    flexGrow: 1,
    minWidth: 300,
    transform: 'translateZ(0)',
    '@media all and (-ms-high-contrast: none)': {
      display: 'none',
    },
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: 'gray',
  },
}));

const Logo = styled.h3 `
  background: linear-gradient(to Left, #f857a6, #ff5858);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  grid-column: 2/3;
  font-size: 1.7em;
`

const Login = styled.h3`
  display: block;
  justify-self: end;
  background: linear-gradient(to Left, #f857a6, #ff5858);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.7em;
`

const PhotoContainer = styled.div `
  display: flex;
  height: 80vh;
  justify-content: center;
  align-items: center;
`

const AlligatorContainer = styled.div`
  height: 80%;
  width: 100%;
  position: relative;
  ::after {
  content: "";
  background: black;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.2;
  }
`;

const Alligator = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Slogan = styled.h2 `
  position: absolute;
  margin: 0 auto;
  top: 40%;
  left: 5%;
  font-size: 50px;
  color:white;
  transform: translate(-20%, -70%);
  z-index: 3;
`

const ExplanationContainer = styled.h3`
  font-size: 1.5em;
  line-height: 1.4em;
  display: flex;
  justify-content: center;
  text-align: justify;
  margin: 1em;
`;

const DisclaimerContainer = styled.h1`
  background: linear-gradient(to Left, #f857a6, #ff5858);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; 
  font-size: 1.2em;
  line-height: 1.4em;
  text-align: justify;
  margin: 1em;
`;

export const LandingPage = ({ history }) => {
  useScrollToTop();
  const classes = useStyles();
  const AlligatorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [user, isFetchingUser] = useCurrentUser();
  const userId = user && user.id;
  gsap.registerPlugin(CSSPlugin)

  useEffect(() => {
    if (!isFetchingUser && userId) {
      history.push('/');
      createUser(user)
    }
  }, [userId, user, isFetchingUser, history]);

  useEffect( () => {
    gsap.timeline().fromTo(AlligatorRef.current, 1.5, { x: "-100%", opacity: 0}, { x: "0%", ease: Power2.easeInOut, opacity: 1} )    
  });

  const handleClick = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return(
    <Container>
      <Nav>
        <Logo> Desastres de golf</Logo> 
        <Login onClick={ handleClick }>Login</Login>
      </Nav>
      <PhotoContainer >
        <AlligatorContainer >
          <Alligator src={ alligator } alt="alligator"/>
          <Slogan  ref={ AlligatorRef } >Estadísticas de golf para todos</Slogan>
        </AlligatorContainer>
      </PhotoContainer>
      <ExplanationContainer>
        Guarda tus partidas de golf de manera sencilla.
      </ExplanationContainer>
      <Features />
      <ExplanationContainer>
        FAQ
      </ExplanationContainer>
      <FAQ/>
      <DisclaimerContainer>
        Disclaimer: No hay ni sand saves, ni greens en regulación, ni putts por hoyo, ni calles cogidas. Sólo golpes. Empezemos por aquí y ya veremos si vale la pena añadir el resto. La idea es que sea fácil y no de pereza hacerlo. Que nos conocemos.
      </DisclaimerContainer>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={ classes.modal }
        open={ open }
        onClose={ handleClose }
        closeAfterTransition
        BackdropComponent={ Backdrop }
        BackdropProps={ {
          timeout: 500,
        }}
      >
        <Fade in={ open }>
          <FadeContainer className={ classes.paper }>
            <LoginComponent/>
          </FadeContainer>
        </Fade>
      </Modal>
      <Footer />
    </Container>   
  )
}