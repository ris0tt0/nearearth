import { Container, styled } from '@mui/material';
import { padding } from '@mui/system';
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

const OutletHeaderContainer = styled('nav')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: '0 0',
  },
  [theme.breakpoints.up('sm')]: {
    padding: '0 1rem',
  },
}));

const OutletContainer = styled(Container)(({ theme }) => ({
  header: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    position: 'sticky',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: '1rem',
    },

    width: '100%',
    top: 0,
    zIndex: 10,
    padding: '0 0.5rem',
  },
  footer: {
    display: 'flex',
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    flexDirection: 'column',
    gap: '1rem',
    padding: '1rem 0.5rem',
  },
}));

export const RootRoute: FC = () => {
  return (
    <OutletContainer maxWidth="lg">
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
