import { css } from 'styled-components';

const sizes = {
  mediumScreen: 1000,
  smallScreen: 700,
};

const initialMediaFunctions = {};
// Iterate through the sizes and create a media template
const mediaFunctions = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (rule) => css`
    @media (max-width: ${sizes[label] / 16}em) {
        ${css(rule)}
      }
  `;
  return acc;
}, initialMediaFunctions);

export default mediaFunctions;