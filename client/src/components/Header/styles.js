import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  padding: 12px 4px 4px 16px;
  background-color: white;
  color: black;
`;

const LogoWrapper = styled.div`
  border-radius: 50%;
  margin-right: 4px;
  padding: 10px;
  img {
    color: #e60023;
    height: 28px;
    cursor: pointer;
  }
  :hover {
    background-color: #e1e1e1;
  }
`;

const HomeButtons = styled.div`
  display: flex;
  height: 48px;
  min-width: 123px;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  cursor: pointer;
  margin: 0px 2px;
`;

const HomePageButton = styled(HomeButtons)`
  background-color: rgb(17, 17, 17);
  a {
    text-decoration: none;
    color: white;
    font-weight: 700;
  }
`;
const FollowingButton = styled(HomeButtons)`
  cursor: pointer;
  background-color: white;

  a {
    text-decoration: none;
    color: #000;
    font-weight: 700;
  }

  :hover {
    background-color: #e1e1e1;
  }
`;

const SearchWrapper = styled.div`
  flex: 1;
`;

const SearchBarWrapper = styled.div`
  background-color: #efefef;
  display: flex;
  height: 48px;
  width: 100%;
  border-radius: 50px;
  border: none;
  :hover {
    background-color: #ddd;
  }
  .input-search {
    height: 48px;
    .ant-input-group {
      height: 100%;
    }
    .ant-input-group-addon:first-child {
      font-size: 12px;
      border-bottom-left-radius: 50px;
      border-top-left-radius: 50px;
      background-color: transparent;
      padding: 0px 14px;
      font-weight: Bold;
      border: none;
    }
    .ant-input-group-addon:last-child {
      display: none;
    }
    input {
      height: 100%;
      background-color: transparent;
      border: none;
      box-shadow: none;
    }
    input:focus {
      outline: none;
    }
  }
`;

const IconsWrapper = styled.div`
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
`;

const IconButton = styled.div`
  height: 48px;
  width: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  :hover {
    background-color: #efefef;
  }
`;

export {
  Wrapper,
  LogoWrapper,
  HomePageButton,
  FollowingButton,
  SearchWrapper,
  SearchBarWrapper,
  IconsWrapper,
  IconButton,
};
