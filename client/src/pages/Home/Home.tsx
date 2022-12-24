import React from 'react';
import Pin from '../../components/Pin/Pin';
import { Container, Wrapper } from './styles';

type Props = {};

export default function Home({}: Props) {
  return (
    <Wrapper>
      <Container className='maiboard__container'>
        <Pin />
        <Pin />
        <Pin />
        <Pin />
        <Pin />
        <Pin />
        <Pin />
        <Pin />
        <Pin />
        <Pin />
        <Pin />
      </Container>
    </Wrapper>
  );
}
