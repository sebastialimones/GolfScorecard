import React from 'react';
import styled from 'styled-components';
import media from '../../styles/media';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const QuestionContainer = styled.div`
  ${media.smallScreen`
    width: 100%;
  `}
  width: calc(50% - 2rem);
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin: 1rem;
  background: linear-gradient(to Left, #f857a6, #ff5858);
  text-align: center;
  color: white;
  border-radius: 0.5rem;
`;

const QuestionTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.4rem;
  line-height: 1.4;
  color: white;
  ${media.smallScreen`
    margin-bottom: 1rem;
  `}
`;

const QuestionTextContainer = styled.div``;


const questions = [
    { id: 1, title: '¿Funciona para stableford, medal, matchplay, etc...?' , answer: 'Al final, siempre añades golpes nunca puntos. Da los mismo como juegues.' },
    { id: 2, title: '¿Y si no termino un hoyo?', answer: 'Añade 🦟 en lugar de un resultado.'  },
    { id: 3, title: '¿Cuál es el total que aparece a la derecha cuando añado un resultado?' , answer: 'Son tus puntos calculados con tu handicap.'  },
    { id: 4, title: '¿Por qué en las estadísticas aparecen hoyos en verde y hoyos en rojo?' , answer: 'Es un algoritmo que calcula tus mejores y peores hoyos.'  },
    { id: 5, title: '¿Cómo empiezo?' , answer: 'Registra tu usuario en login, arriba a la derecha. Sólo un email y una contraseña.'  },
    { id: 6, title: '¿Cómo sigo?' , answer: '1º-En el menú (arriba a la derecha), crea un nuevo campo. 2º-Escrible el nombre del campo. 3º-Añade el handicap del campo y el tuyo propio. Ahora ya puedes incluir tu primer resultado'  },
];

export const FAQ = () => (
  <Wrapper>
    {
      questions.map((question) => (
        <QuestionContainer key={ question.id }>
          <QuestionTitle>{ question.title }</QuestionTitle>
          <QuestionTextContainer>{ question.answer }</QuestionTextContainer>
        </QuestionContainer>
      ))
    }
  </Wrapper>
);
