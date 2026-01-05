import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { CommandsContext } from '../contexts/commands';
import { NeoCommandsImpl } from '../commands/neo';
import { NeoCommands } from '../commands';

export const CommandsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [commands, setCommands] = useState<NeoCommands | null>(null);

  useEffect(() => {
    const commands = NeoCommandsImpl.getInstance();

    commands.init().then(() => {
      setCommands(commands);
    });
  }, []);

  if (!commands) {
    return null;
  }

  return (
    <CommandsContext.Provider value={commands}>
      {children}
    </CommandsContext.Provider>
  );
};
