import { styled } from '@mui/material';

export const AboutMain = styled('main')(
  ({ theme }) => `
  h2 {
    color: ${theme.palette.secondary.light};
  }

  h3 {
    color: ${theme.palette.secondary.light};
  }

  code {
    background: ${theme.palette.background.paper};
  }
}`,
);
