import { Container, styled } from '@mui/material';
import React, { FC } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const MenuLinkStyled = styled(NavLink)`
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

export const LinkStyled = styled(Link)`
  color: inherit;
`;

const OutletHeaderContainer = styled('menu')`
  padding: 0 1rem;
`;

const OutletContainer = styled(Container)(
  ({ theme }) => `
    header {
      background: ${theme.palette.primary.main};
      color: ${theme.palette.primary.contrastText};
      position: sticky;
      display: flex;
      align-items: center;
      width: 100%;
      top: 0;
      z-index: 10;
      gap: 1rem;
      padding: 0 .5rem;
    }

    footer {
      display: flex;
      background: ${theme.palette.primary.main};
      color: ${theme.palette.primary.contrastText};
      flex-direction: column;
      gap: 1rem;
      padding: 1rem 0.5rem;
  }
`,
);

export const RootRoute: FC = () => {
  return (
    <OutletContainer maxWidth="md">
      <header>
        <h1>Near Earth Objects</h1>
        <OutletHeaderContainer>
          <MenuLinkStyled to="/browse">browse</MenuLinkStyled>
          <MenuLinkStyled to="/feed">feed</MenuLinkStyled>
          <MenuLinkStyled to="/neo">near earth object</MenuLinkStyled>
          <MenuLinkStyled to="/about">about</MenuLinkStyled>
        </OutletHeaderContainer>
      </header>
      <Outlet />
      <footer>
        <p>
          <LinkStyled to="mailto:j@jonathangee.com">
            &copy; Jonathan Gee
          </LinkStyled>
        </p>
      </footer>
    </OutletContainer>
  );
};
