import { createContext } from 'react';
import { Commands } from '.';

export const CommandsContext = createContext<Commands>({} as Commands);
