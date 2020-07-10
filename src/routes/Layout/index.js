import React from 'react';
import { Container } from '../../components/Container';
import Header from '../../components/Header';
import { CookiesConsent } from '../../components/CookiesConsent';
 
export const Layout = ({ children }) => (
    <Container>
      <Header />
      <CookiesConsent />
      { children }
    </Container>
  );
