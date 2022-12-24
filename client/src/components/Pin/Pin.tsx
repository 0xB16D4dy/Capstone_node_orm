import React from 'react';
import { Container, Wrapper } from './styles';

type Props = {};

export default function Pin({}: Props) {
  return (
    <Wrapper>
      <Container>
        <img src='./img/test.jpeg' alt='test' />
      </Container>
    </Wrapper>
  );
}
