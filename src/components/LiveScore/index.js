import React from 'react';
import styled from 'styled-components';

const ResultContainer = styled.div``;

export const LiveScore = ({ liveScore }) => {
  return(
    <ResultContainer>
          {`Total: ${liveScore}`}
    </ResultContainer>
  )
}