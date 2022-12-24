import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  padding: 8px;
  width: calc(100% / 5);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 236px;
  img {
    display: flex;
    width: 100%;
    cursor: zoom-in;
    border-radius: 16px;
    object-fit: cover;
  }
`;

export { Wrapper, Container };
