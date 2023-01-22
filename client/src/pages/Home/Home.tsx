import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pin from '../../components/Pin/Pin';
import { AppDispatch, RootState } from '../../redux/configStore';
import { getAllPinApi, PinModel } from '../../redux/reducers/pinReducer';
import { Container, Wrapper } from './styles';

type Props = {};

export default function Home({}: Props) {
  const { arrPin } = useSelector((state: RootState) => state.pinReducer);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const actionThunk = getAllPinApi();
    dispatch(actionThunk);
  }, []);

  const renderPin = () => {
    return arrPin.map((item: PinModel, key: number) => {
      return <Pin key={key} src={item.url_path}></Pin>;
    });
  };

  return (
    <Wrapper>
      <Container className='mainboard__container'>{renderPin()}</Container>
    </Wrapper>
  );
}
