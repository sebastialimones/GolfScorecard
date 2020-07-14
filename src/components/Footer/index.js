import React from 'react';
import styled from 'styled-components';
import media from '../../styles/media'

export const height = '3em';

const Container = styled.footer`
  display: flex;
  justify-content: center;
  margin-top: 2em;
  border-top: 1px solid #eee;
  height: ${height};
  color: gray;
`;

const Text = styled.p`
  margin-right: 1rem;
  text-align: center;
  ${media.smallScreen`font-size: 10px;`}
`;

export const Footer = () => (
  <Container>
    <Text>© Desastres de Golf</Text>
    <Text>|</Text>
    <Text>Todos los derechos reservados</Text>
    <Text>|</Text>
    <Text>@sebasLimones</Text>
  </Container>
)