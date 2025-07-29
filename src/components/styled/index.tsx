import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const NavLinkStyled = styled(Link)(
  ({ theme }) =>
    `
    color: inherit;
    :hover {
      text-decoration: none;
      color: ${theme.palette.text.secondary};
    }
  `,
);

export const UnorderedListStyled = styled('ul')`
  border: 1px red solid;
`;
export const UnorderedListItemStyled = styled('li')`
  list-style: none;
`;
