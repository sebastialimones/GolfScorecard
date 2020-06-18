import React from 'react';

import { Container } from '../../components/Container';
import { Header } from '../../components/Header';

export const Layout = ({ children }) => (
    <Container>
      <Header />
      { children }
    </Container>
  );
