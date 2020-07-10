import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import media from '../../styles/media';
import { gsap, Power2 } from 'gsap';

const Wrapper = styled.div`
  font-size: 1em;
  position: fixed;
  bottom: 2em;
  padding: 1em;
  max-width: 20em;
  border: 1px solid black;
  border-radius: 0.1em;
  background-color: #ffffff;
  margin-left: 1.5em;
  z-index: 10;
  ${media.smallScreen`
    flex-direction: column;
    align-items: center;
    width: 80%;
    height: auto;
  `}
`;

const CookieText = styled.p`
  line-height: 1.5;
  font-size: 0.85rem;
  height: 100%;
  width: auto;
`;

const ButtonContainer = styled.div`
  ${media.smallScreen`
    margin-left: 0;
    width: auto;
  `}
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonElement = styled.button`
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 1em;
  padding: 8px;
  padding-left: 1em;
  padding-right: 1em;
:hover { background-color: lightgray };
`;

const Link = styled.a`
  text-decoration: underline;
`;

export const CookiesContent = ({ onAccept }) => {
  const WrapperRef = useRef(null);
  
  useEffect( () => {
    gsap.timeline().fromTo(WrapperRef.current, 1.5, { x: "-100%", opacity: 0}, { x: "0%", ease: Power2.easeInOut, opacity: 1} )    
  });

  return (
    <Wrapper ref={ WrapperRef }>
      <CookieText>
      Ok, para aceptar las cookies. Para saber más: <Link href="./cookiespolicy">Aquí</Link>
      </CookieText>
      <ButtonContainer>
        <ButtonElement onClick={ onAccept }>
          Ok!
        </ButtonElement>
      </ButtonContainer>
    </Wrapper>
  );
};
