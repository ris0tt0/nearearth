import {
  createTheme,
  CssBaseline,
  LinearProgress,
  styled,
  ThemeProvider,
} from '@mui/material';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { APIImpl } from './api/APIImpl';
import { Commands } from './commands';
import { DataBaseIDB } from './db/DatabaseIDB';
import { CommandsImpl } from './commands/CommandsImpl';
import { Main } from './main';
import { usePhotosStore } from './store';
import { CommandsContext } from './commands/context';

const StyledLoader = styled('div')`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Loading: FC = () => {
  return (
    <StyledLoader>
      <LinearProgress sx={{ width: '300px' }} variant="indeterminate" />
    </StyledLoader>
  );
};

const MuiProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

const CommandsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [commands, setCommands] = useState<Commands | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const setRover = usePhotosStore((state) => state.setRover);
  const setRoverData = usePhotosStore((state) => state.setRoverData);

  useEffect(() => {
    const api = new APIImpl();
    const database = new DataBaseIDB();

    const commands = new CommandsImpl({
      database,
      api,
      setRover,
      setRoverData,
    });

    commands
      .init()
      .then(() => setCommands(commands))
      .catch((e) => setError(e));
  }, []);

  if (commands === null) {
    return <Loading />;
  }

  if (error) {
    return <div>error: {error.toString()}</div>;
  }

  return (
    <CommandsContext.Provider value={commands}>
      {children}
    </CommandsContext.Provider>
  );
};

export const App: FC = () => {
  return (
    <MuiProvider>
      <CommandsProvider>
        <Main />
      </CommandsProvider>
    </MuiProvider>
  );
};
