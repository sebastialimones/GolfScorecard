/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import styled from 'styled-components';
import media from '../../styles/media';

const FeaturesContainer = styled.div`
  background-color: white;
  width: 85%;
  margin: 0 auto;
  letter-spacing: 1px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${media.mediumScreen`
    width: 95%;
  `}
  ${media.smallScreen`
    flex-direction: column;
    justify-content: flex-start;
    width: 90%;
  `}
`;

const FeatureBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 10em;
  padding-bottom: 0.7em;
  ${media.mediumScreen`
    max-width: 8em;
  `}
  ${media.smallScreen`
    flex-direction: column;
    align-items: flex-start;
    max-width: none;
  `}
`;

const FeatureLogoAndTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.smallScreen`
    display: flex;
    flex-direction: row;
  `}
`;

const FeatureTitle = styled.h3`
  background: linear-gradient(to Left, #f857a6, #ff5858);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;   
  line-height: 1.4em;
  font-weight: 700;
  font-size: 1rem;
  margin-top: 1.2em;
  margin-bottom: 0.5em;
  text-align: center;
  ${media.smallScreen`
    margin-top: 0.2em;
    margin-bottom: 0.3em;
    font-size: 1.2rem;
    text-align: start;
  `}
`;

const FeatureExplanation = styled.p`
  line-height: 1.4em;
  text-align: center;
  ${media.smallScreen`
    font-size: 1rem;
    font-size: 1.1em;
    margin-bottom: 0.7em;
    text-align: left;
  `}
`;

export const Features = () => {
  return (
    <>
      <FeaturesContainer>
        <FeatureBlock>
          <FeatureLogoAndTitleContainer>
            <FeatureTitle>
              Prepara tus campos de golf
            </FeatureTitle>
          </FeatureLogoAndTitleContainer>
          <FeatureExplanation>
           Añade el handicap de cada hoyo así como los golpes de tu handicap personal. Tantos campos como quieras.
          </FeatureExplanation>
        </FeatureBlock>
        <FeatureBlock>
          <FeatureLogoAndTitleContainer>
            <FeatureTitle>
             Al final de cada partida traspasa los resultados de tu tarjeta a la web
            </FeatureTitle>
          </FeatureLogoAndTitleContainer>
          <FeatureExplanation>
            Menos de 1 minuto.
          </FeatureExplanation>
        </FeatureBlock>
        <FeatureBlock>
          <FeatureLogoAndTitleContainer>
            <FeatureTitle>
             Consulta tus estadísticas
            </FeatureTitle>
          </FeatureLogoAndTitleContainer>
          <FeatureExplanation>
           Ahora sabrás de verdad cuales son tus mejores y peores hoyos, media de golpes, mejor resultado histórico, etc...
          </FeatureExplanation>
        </FeatureBlock>
        <FeatureBlock>
          <FeatureLogoAndTitleContainer>
            <FeatureTitle>
             Añade 5 o 6 partidas y verás
            </FeatureTitle>
          </FeatureLogoAndTitleContainer>
          <FeatureExplanation>
           No mejorará tu juego, pero hace gracia.
          </FeatureExplanation>
        </FeatureBlock>
        <FeatureBlock>
          <FeatureLogoAndTitleContainer>
            <FeatureTitle>
            No te engañes!
            </FeatureTitle>
          </FeatureLogoAndTitleContainer>
          <FeatureExplanation>
           Añade TODAS las partidas, en las que hagas desastres también!
          </FeatureExplanation>
        </FeatureBlock>
      </FeaturesContainer>
    </>
  );
};
