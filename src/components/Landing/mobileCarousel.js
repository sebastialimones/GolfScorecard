import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styled from 'styled-components';
import media from '../../styles/media';
import statistics from '../../assets/statistics.png';
import statisticsResults from '../../assets/statisticsResults.png';


const Container = styled.div`
  margin-bottom: 4em;
`;

const Screenshot = styled.div`
  display: flex;
  margin: 1em 0;
  justify-content: center;
  align-items: center;
  ${media.smallScreen`
    margin: 0;
  `}
`;

const ParagraphTitle = styled.h3`
  font-size: 1.5em;
  line-height: 1.4em;
  display: flex;
  justify-content: center;
  text-align: justify;
  margin: 1em;
`;

const ScreenshotImg = styled.img`
  height: 33em;
  ${media.smallScreen`
    height: 27em;
  `}
`;

const FeatureTitleContainer = styled.div`
  color: black;
  display: flex;
  justify-content: center;
`;

const StepContainer = styled.div``;

const carouselSettings = {
  accesibility: true,
  arrows: true,
  dots: true,
  infinite: false,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 500,
};

export const MobileCarousel = () => (
  <Container>
    <FeatureTitleContainer>
      <ParagraphTitle>
        Screenshots
      </ParagraphTitle>
    </FeatureTitleContainer>
      <Slider { ...carouselSettings }>
        <StepContainer>
          <Screenshot>
            <ScreenshotImg alt="statistics" src={ statistics } />
          </Screenshot>
        </StepContainer>
        <StepContainer>
          <Screenshot>
            <ScreenshotImg alt="statisticsResults" src={ statisticsResults } />
          </Screenshot>
        </StepContainer>
      </Slider>
  </Container>
);
