import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FollowingButton,
  HomePageButton,
  IconButton,
  IconsWrapper,
  LogoWrapper,
  SearchBarWrapper,
  SearchWrapper,
  Wrapper,
} from './styles';
import {
  BellOutlined,
  DownOutlined,
  MessageOutlined,
  SearchOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { Input } from 'antd';

const { Search } = Input;

type Props = {};

export default function Header({}: Props) {
  const onSearch = (value: string) => console.log(value);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  useEffect(() => {
    const onScroll = (e: any) => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollTop]);
  return (
    <header className={scrolling ? 'scroll' : ''}>
      <Wrapper>
        <LogoWrapper>
          <img
            src='https://cdn-icons-png.flaticon.com/512/145/145808.png'
            alt=''
          />
        </LogoWrapper>
        <HomePageButton>
          <NavLink to='#'>Homepage</NavLink>
        </HomePageButton>
        <FollowingButton>
          <NavLink to='#'>Following</NavLink>
        </FollowingButton>

        <SearchWrapper>
          <SearchBarWrapper>
            <Search
              placeholder='input search text'
              onSearch={onSearch}
              addonBefore={
                <SearchOutlined style={{ fontSize: '16px', fontWeight: 700 }} />
              }
              className='input-search'
            />
          </SearchBarWrapper>
        </SearchWrapper>
        <IconsWrapper>
          <IconButton>
            <BellOutlined />
          </IconButton>
          <IconButton>
            <MessageOutlined />
          </IconButton>
          <IconButton>
            <SmileOutlined />
          </IconButton>
          <IconButton>
            <DownOutlined />
          </IconButton>
        </IconsWrapper>
      </Wrapper>
    </header>
  );
}
