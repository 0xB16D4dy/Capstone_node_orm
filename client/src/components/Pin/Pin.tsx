import React from 'react';
import { Container, Wrapper } from './styles';

type Props = {
  src?: string;
};

export default function Pin({ src }: Props) {
  console.log(src);
  return (
    <Wrapper>
      <Container>
        <img src={src} alt='test' />
      </Container>
    </Wrapper>
  );
}
