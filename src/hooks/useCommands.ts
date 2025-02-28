import { useContext } from 'react';
import { Commands } from '../commands';
import { CommandsContext } from '../commands/context';

export const useCommands = (): Commands => {
  const commands = useContext(CommandsContext);

  if (!commands) {
    throw new Error('useCommands must be used within a CommandsProvider');
  }

  return commands;
};
