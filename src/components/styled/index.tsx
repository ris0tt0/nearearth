import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const NavLinkStyled = styled(Link)(
  ({ theme }) =>
    `
    color: inherit;
    &:hover {
      text-decoration: none;
      color: ${theme.palette.text.secondary};
    }
  `,
);

export const UnorderedListStyled = styled('ul')`
  background: ${({ theme }) => theme.palette.background.paper};
`;
export const UnorderedListItemStyled = styled('li')`
  list-style: none;
`;
