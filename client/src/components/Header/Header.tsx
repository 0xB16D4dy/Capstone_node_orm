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
import { Dropdown, Input, MenuProps } from 'antd';
import Login from '../Login/Login';

const { Search } = Input;

type Props = {};

export default function Header({}: Props) {
  const onSearch = (value: string) => console.log(value);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  useEffect(() => {
    const onScroll = (e: any) => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollTop]);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <div>Add account</div>,
    },
    {
      key: '2',
      label: <div>Log Out</div>,
    },
  ];

  const handleSetLogin = () => {
    setOpenLogin(true);
  };

  const renderAuthentication = () => {
    return (
      <>
        <IconButton id='btn_login' onClick={handleSetLogin}>
          Log in
        </IconButton>
        <IconButton id='btn_signup'>Sign up</IconButton>
        <Login handleOpenLogin={setOpenLogin} onOpenLogin={openLogin} />
      </>
    );
  };

  const renderDropDown = () => {
    return (
      <>
        <IconButton>
          <BellOutlined />
        </IconButton>
        <IconButton>
          <MessageOutlined />
        </IconButton>
        <IconButton>
          <SmileOutlined />
        </IconButton>
        <Dropdown
          menu={{ items }}
          trigger={['click']}
          placement={'bottomRight'}
          overlayStyle={{ position: 'fixed' }}
        >
          <IconButton>
            <DownOutlined />
          </IconButton>
        </Dropdown>
      </>
    );
  };

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
          {isAuth ? renderDropDown() : renderAuthentication()}
        </IconsWrapper>
      </Wrapper>
    </header>
  );
}
