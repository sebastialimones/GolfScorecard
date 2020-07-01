import styled from 'styled-components';

export const Button = styled.button`
  border-radius: 25px;
  background-color: #FC587E;
  min-width: 180px;
  color: white;
  border: none;
  font-size: 1rem;
  padding: 1em;
  margin: 0.5em;
  cursor: pointer;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px 0px #FC587E;
  }
`;