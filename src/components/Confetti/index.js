import React from 'react';
import Confetti from 'react-confetti'
import { useWindowSize } from '../../hooks/getWindowSize';

export const ConfettiComponent = () => {
  const size = useWindowSize();
  return (
    <Confetti
    width={size.width}
    height={size.height}
    />
  )
};