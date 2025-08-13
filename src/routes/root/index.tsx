import { Container, Paper, styled } from '@mui/material';
import React, { FC } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const LinkStyled = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  padding: 0.5rem;

  &.active {
    font-weight: bold;
  }

  &:hover {
    text-decoration: underline;
  }
`;
const OutletContainer = styled(Container)``;

export const RootRoute: FC = () => {
  return (
    <>
      <OutletContainer>
        <Paper>
          <LinkStyled to="/browse">browse</LinkStyled>
          <LinkStyled to="/feed">feed</LinkStyled>
          <LinkStyled to="/neo">near earth object</LinkStyled>
          <LinkStyled to="/about">about</LinkStyled>
        </Paper>
      </OutletContainer>
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </>
  );
};
